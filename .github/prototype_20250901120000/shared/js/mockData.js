// filepath: c:\src\gitXxtq\GriffinPfDeployment_AI\.github\prototype_20250901120000\shared\js\mockData.js
// Central prototype mock data (minimal subset)
(function(){
  var mockUsers = [
    { id:1, name:'Alice Admin', role:'Admin' },
    { id:2, name:'Oliver Ops', role:'Operator' },
    { id:3, name:'Vera Viewer', role:'Viewer' }
  ];
  var mockRoles = [
    { name:'Admin', permissions:['ve.read','ve.write','service.deploy'] },
    { name:'Operator', permissions:['ve.read','service.deploy'] },
    { name:'Viewer', permissions:['ve.read'] }
  ];
  var veServicesMap = {
    'SovBase':['OwaMailB2','GraphConnectors','FlowControl'],
    'ModelBSov':['OwaMailB2','ExchangeCore'],
    'OwaMailB2-SOV':['OwaMailB2']
  };
  var servicesInfo = {
    OwaMailB2:{ ServiceName:'OwaMailB2', BuildType:'RingPromotion', MainlineBuildPipelineId:1418, IncrementalBuildPipelineId:33874 },
    GraphConnectors:{ ServiceName:'GraphConnectors', BuildType:'RingPromotion', MainlineBuildPipelineId:2222 },
    FlowControl:{ ServiceName:'FlowControl', BuildType:'RingPromotion', MainlineBuildPipelineId:3333 },
    ExchangeCore:{ ServiceName:'ExchangeCore', BuildType:'RingPromotion', MainlineBuildPipelineId:4444 }
  };
  var allVEs = Object.keys(veServicesMap);
  var allServices = Array.from(new Set([].concat(...Object.values(veServicesMap))));
  var veDetails = allVEs.map(function(name,i){
    var svcs = veServicesMap[name]||[];
    return {
      name,
      type: name.indexOf('B2')>-1?'B2 Type VE':'B Type VE',
      baseType: name.indexOf('B2')>-1?'B2 Type':'B Type',
      group: ['DefaultScope'],
      deployments: svcs.length,
      griffinServices: svcs.length,
      status: i===0?'normal':(i===1?'attention':'deploying'),
      favorite: i===0
    };
  });

  function derivePipelines(info){
    if(!info) return [];
    var list=[];
    if(info.MainlineBuildPipelineId) list.push({ id:info.MainlineBuildPipelineId,type:'Mainline',icon:'git-branch',color:'blue',latestBuild:'20250101.1',dropUrl:'VSO://drop/main',description:'Mainline build' });
    if(info.IncrementalBuildPipelineId) list.push({ id:info.IncrementalBuildPipelineId,type:'Incremental',icon:'trending-up',color:'green',latestBuild:'20250101.3',dropUrl:'VSO://drop/incr',description:'Incremental build' });
    return list;
  }
  var serviceModels = {};
  var serviceCards = [];
  allServices.forEach(function(svc){
    var veList = allVEs.filter(v=> (veServicesMap[v]||[]).includes(svc));
    var info = servicesInfo[svc]||{};
    var model = {
      name:svc,
      description: (info.ServiceName||svc)+' service',
      type:'Service',
      version:'20250101.1',
      veList:veList,
      deployedCount:veList.length,
      totalCount:veList.length,
      status: veList.length?'Active':'Not Deployed',
      statusClass: veList.length?'success':'neutral',
      pipelines: derivePipelines(info),
      favorite: svc==='OwaMailB2'
    };
    serviceModels[svc]=model;
    serviceCards.push({
      name:svc,
      instances:veList.length,
      deployed:veList.length,
      version:model.version,
      status:model.status,
      statusClass:model.statusClass,
      favorite:model.favorite,
      veList:veList
    });
  });

  window.MockData = {
    users:mockUsers,
    roles:mockRoles,
    veServicesMap,
    servicesInfo,
    allVEs,
    allServices,
    veDetails,
    serviceModels,
    serviceCards,
    favorites:{
      VEs: ['SovBase'],
      Services:['OwaMailB2']
    }
  };
  try{ window.dispatchEvent(new Event('MockDataReady')); }catch(_){}
})();