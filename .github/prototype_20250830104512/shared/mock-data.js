(function(G){
  const VEs = [
    { name:'SovBase', type:'B', environment:'APE', servicesCount:63, health:'ok' },
    { name:'ModelBSov', type:'B', environment:'APE', servicesCount:56, health:'ok' },
    { name:'OwaMailB2-SOV', type:'B2', environment:'CPE', servicesCount:1, health:'ok' },
    { name:'GraphAnalyticsB2-SOV', type:'B2', environment:'CPE', servicesCount:1, health:'warn' },
    { name:'FlowControlB2-SOV', type:'B2', environment:'CPE', servicesCount:1, health:'ok' }
  ];
  const Services = {
    'OwaMailB2-SOV': [
      { name:'OwaMailB2', buildType:'RingPromotion', latestVersion:'2025.08.30.12', pipelines:[1418,33874], status:'ok' }
    ],
    'GraphAnalyticsB2-SOV': [
      { name:'GraphAnalytics', buildType:'RingPromotion', latestVersion:'2025.08.29.05', pipelines:[31234], status:'warn' }
    ],
    'FlowControlB2-SOV': [
      { name:'FlowControl', buildType:'RingPromotion', latestVersion:'2025.08.27.02', pipelines:[33876], status:'ok' }
    ],
    'SovBase': [
      { name:'FlowControl', buildType:'RingPromotion', latestVersion:'2025.08.27.02', pipelines:[33876], status:'ok' },
      { name:'GraphAnalytics', buildType:'RingPromotion', latestVersion:'2025.08.29.05', pipelines:[31234], status:'warn' }
    ],
    'ModelBSov': [
      { name:'OwaMailB2', buildType:'RingPromotion', latestVersion:'2025.08.30.12', pipelines:[1418], status:'ok' }
    ]
  };
  function makeDeployment(id, ve, services, status){
    const now = Date.now();
    return {
      id,
      ve,
      services,
      status,
      initiatedBy: G.state.currentUser.name,
      started: now - Math.floor(Math.random()*3600_000),
      completed: status==='Running'?null: now - Math.floor(Math.random()*1200_000),
      artifactRef: services.map(s=>`${s}-2025.08.x`).join(',')
    };
  }
  const DeploymentHistory = [
    makeDeployment('dpl-1009','OwaMailB2-SOV',['OwaMailB2'],'Succeeded'),
    makeDeployment('dpl-1010','GraphAnalyticsB2-SOV',['GraphAnalytics'],'Failed'),
    makeDeployment('dpl-1011','FlowControlB2-SOV',['FlowControl'],'Running'),
    makeDeployment('dpl-1012','SovBase',['FlowControl','GraphAnalytics'],'Succeeded')
  ];
  const BuildDetails = {
    'OwaMailB2': {
      ringPromotionRoot:'autopilot',
      buildPathPattern:'VSO://.../owamailb2_ms/<BuildVersion>?root=autopilot',
      availableVersions:[
        '2025.08.30.12','2025.08.30.11','2025.08.29.08','2025.08.28.05'
      ]
    },
    'GraphAnalytics': {
      ringPromotionRoot:'autopilot',
      buildPathPattern:'VSO://.../graphanalytics_ms/<BuildVersion>?root=autopilot',
      availableVersions:['2025.08.29.05','2025.08.29.04','2025.08.28.02']
    },
    'FlowControl': {
      ringPromotionRoot:'autopilot',
      buildPathPattern:'VSO://.../flowcontrol_ms/<BuildVersion>?root=autopilot',
      availableVersions:['2025.08.27.02','2025.08.26.09']
    }
  };
  G.data = { VEs, Services, DeploymentHistory, BuildDetails };

  // --- NEW: Async enrichment from canonical ReleaseMapping.json ---
  const RELEASE_MAPPING_PATH = '../instructions/ReleaseMapping.json'; // relative to /shared/
  fetch(RELEASE_MAPPING_PATH)
    .then(r=> r.ok ? r.json() : Promise.reject(r.status))
    .then(json=>{
      // Build VEs from ExpectedVEs groups
      const veNames = Object.values(json.ExpectedVEs || {}).flat();
      const veSet = new Set(veNames);
      // Preserve any additional VEs already present
      const enrichedVEs = Array.from(veSet).map(name=>{
        // Heuristic: type B2 if name ends with '-SOV' and appears in ModelB2 groups excluding base B; else B
        const isB2 = /B2-|B2-SOV|B2$/.test(name) || (json.ExpectedServices?.[name]||[]).some(s=>/B2/.test(s));
        return {
          name,
            type: isB2 ? 'B2':'B',
            environment: isB2 ? 'CPE':'APE',
            servicesCount: (json.ExpectedServices?.[name]||[]).length,
            health:'ok'
        };
      });

      // Build Services map
      const servicesMap = {};
      Object.entries(json.ExpectedServices || {}).forEach(([veName, svcList])=>{
        servicesMap[veName] = svcList.map(svcName=>{
          const svcMeta = json.Services?.[svcName] || {};
          return {
            name: svcName,
            buildType: svcMeta.BuildType || 'RingPromotion',
            latestVersion: 'N/A', // unknown until real API
            pipelines: [svcMeta.PipelineId, svcMeta.IncrementalBuildPipelineId, svcMeta.MainlineBuildPipelineId]
              .filter(Boolean),
            status:'ok'
          };
        });
      });

      // BuildDetails (limited from json.Services)
      const buildDetails = {};
      Object.entries(json.Services || {}).forEach(([svcName, meta])=>{
        buildDetails[svcName] = {
          ringPromotionRoot: meta.RingPromotionRootPath || '',
          buildPathPattern: meta.BuildPathPattern || '',
          availableVersions: [] // placeholder; would come from pipeline later
        };
      });

      // Replace in-memory data
      G.data.VEs = enrichedVEs;
      G.data.Services = { ...G.data.Services, ...servicesMap };
      G.data.BuildDetails = { ...G.data.BuildDetails, ...buildDetails };

      // Notify listeners
      G.pub('data:replace',{ source:'ReleaseMapping.json' });
    })
    .catch(err=>{
      console.warn('ReleaseMapping.json load failed (using stub data):', err);
    });
})(window.GMS);
