var releaseMapping = {
  "CloudBuildRoot": "https://cloudbuild.microsoft.com",
  "ExpectedServices": {
    "SovBase": [
      "ActionsAssistants",
      "ActionsB2NetCore",
      "WebhookB2NetCore"
    ],
    "ModelBSov": [
      "ActionsAssistants",
      "ActionsB2NetCore"
    ],
    /* Added minimal placeholder service arrays so VE cards show activity */
    "OwaMailB2-SOV":[ "OwaMailB2Core" ],
    "GraphConnectorsB2-SOV":[ "GraphConnectorsCore" ],
    "FlowControlB2-SOV":[ "FlowCore" ],
    "TBA1-SOV":[ "TBAService" ],
    "EBA1-SOV":[ "EBAService" ],
    "M365Coral1B2-SOV":[ "CoralCore" ],
    "FastV2B2-SOV":[ "FastCore" ],
    "MessagesIngestionServiceB2-SOV":[ "MsgIngest" ],
    "ConnectorsB2-SOV":[ "ConnectorsCore" ],
    "VSOB2-SOV":[ "VSOCore" ],
    "ProtocolsB2-SOV":[ "ProtocolsCore" ],
    "ContentEnrichmentServiceB2-SOV":[ "ContentEnrich" ],
    "GraphAnalyticsB2-SOV":[ "GraphAnalyticsCore" ],
    "TodoB2-SOV":[ "TodoCore" ],
    "MicroSvcB2-SOV":[ "MicroSvcCore" ]
    // ...existing code (other services can be added here)...
  },
  "ExpectedVEs": {
    "AgAllVEs": [ "AGALL" ],
    "SovBaseVEs": [ "SovBase" ],
    "ModelBSovVEs": [ "ModelBSov" ],
    "ModelB2SovVEs": [
      "TBA1-SOV","OwaMailB2-SOV","EBA1-SOV","M365Coral1B2-SOV","FastV2B2-SOV",
      "MessagesIngestionServiceB2-SOV","ConnectorsB2-SOV","VSOB2-SOV","ProtocolsB2-SOV",
      "ContentEnrichmentServiceB2-SOV","GraphAnalyticsB2-SOV","TodoB2-SOV","MicroSvcB2-SOV",
      "GraphConnectorsB2-SOV","FlowControlB2-SOV" /* restored FlowControlB2-SOV */
    ]
    // ...existing code...
  },
  "Apps": {
    "ConnectorsProcessors": { "ServiceName": "Connectors" },
    "ConnectorsWatchdog": { "ServiceName": "Connectors" },
    "ConnectorsManagementWebWatchdog": { "ServiceName": "Connectors" },
    "CustomerKeyEncryptionService": { "ServiceName": "CKES" },
    "HippogriffServer": { "ServiceName": "Hippogriff" },
    "HippogriffWatchdog": { "ServiceName": "Hippogriff" },
    "AHCoreB2": { "ServiceName": "AHB2" },
    "ApplicationHost": { "ServiceName": "AH" },
    "ReplicationDeliveryProcessorService": { "ServiceName": "RDPService" }
    // ...existing code...
  },
  "Services": {
    "UserKnowledgeBase": {
      "BuildType": "RingPromotion",
      "IncrementalBuildPipelineId": 31284,
      "MainlineBuildPipelineId": 31285,
      "RingPromotionRootPath": "target/distrib/Release/x64/autopilot",
      "BuildQueue": "OSS_Sigs_Retail_Drops_Signing_Git",
      "BuildRoot": "target/distrib/Release/x64/autopilot",
      "PpeVeName": "VSOB2-PPE",
      "BuildPathPattern": "VSO://...<BuildVersion>?root=/target/distrib/Release/x64/autopilot"
    },
    "UserTrainingAssignments": {
      "BuildType": "RingPromotion",
      "IncrementalBuildPipelineId": 35131,
      "MainlineBuildPipelineId": 35130,
      "RingPromotionRootPath": "target/distrib/product/all/retail/amd64/UserTrainingAssignmentsAutoPilot",
      "BuildRoot": "UserTrainingAssignmentsAutoPilot",
      "PpeVeName": "IPB2-PPE",
      "DevRoots": [ "AttackSimAndTraining\\src" ]
    },
    "Yimirs": {
      "BuildType": "RingPromotion",
      "IncrementalBuildPipelineId": 35131,
      "MainlineBuildPipelineId": 35130,
      "RingPromotionRootPath": "target/distrib/product/all/retail/amd64/YimirsAutoPilot",
      "BuildRoot": "YimirsAutoPilot",
      "PpeVeName": "IPGB2-PPE",
      "DevRoots": [ "yimirs\\src" ]
    },
    "YimirsNetCore": {
      "BuildType": "RingPromotion",
      "IncrementalBuildPipelineId": 21889,
      "MainlineBuildPipelineId": 21886,
      "RingPromotionRootPath": "target/distrib/release/x64/yimirsnetcore/netcoreapp3.1/win10-x64/autopilot",
      "BuildQueue": "OSS_Yimi_Retail_Drops_Signing_Git",
      "BuildRoot": "target/distrib/release/x64/yimirsnetcore/netcoreapp3.1/win10-x64/autopilot",
      "PpeVeName": "IPGB2-PPE",
      "BuildPathPattern": "VSO://...<BuildVersion>?root=/target/distrib/release/x64/yimirsnetcore/.../autopilot"
    }
    // ...existing code...
  }
};

// --- Derived base maps ---
var deploymentScopeVesMap = releaseMapping.ExpectedVEs;
var veServicesMap = releaseMapping.ExpectedServices;
var servicesInfo = releaseMapping.Services;

// Safe flatten utility (older browsers)
function flatArrays(inputObj){
  var arrays = Object.values(inputObj || {});
  var out = [];
  arrays.forEach(function(a){
    if (Array.isArray(a)) a.forEach(function(i){ out.push(i); });
  });
  return out;
}

// Compute all distinct VEs (union of service keys + expected VE lists)
var allVes = Array.from(new Set([
  ...Object.keys(veServicesMap || {}),
  ...flatArrays(deploymentScopeVesMap || {})
]));

// All service names (declared services + those referenced in VE maps)
var allServices = Array.from(new Set([
  ...Object.keys(servicesInfo || {}),
  ...Object.values(veServicesMap || {}).reduce(function(acc, arr){
    (arr||[]).forEach(function(s){ acc.push(s); });
    return acc;
  },[])
]));

// Build scope lookup
var veToScopesMap = {};
Object.keys(deploymentScopeVesMap).forEach(function(scope){
  (deploymentScopeVesMap[scope]||[]).forEach(function(ve){
    (veToScopesMap[ve] = veToScopesMap[ve] || []).push(scope);
  });
});

// Roles & users (added mockUsers so window.MockData.users resolves)
var mockRoles = [
  { name:'Admin', permissions:['ve.read','ve.write','service.read','service.deploy'] },
  { name:'Operator', permissions:['ve.read','service.read','service.deploy'] },
  { name:'Viewer', permissions:['ve.read','service.read'] }
];
var mockUsers = [
  { id:1, upn:'john.doe@contoso.com', name:'John Doe', roles:['Admin'], groups:['AME\\M365-SovFleet'] },
  { id:2, upn:'modelb.ops@contoso.com', name:'Model Ops', roles:['Operator'], groups:['AME\\M365-SovFleet'] },
  { id:3, upn:'viewer@contoso.com', name:'View User', roles:['Viewer'], groups:[] }
];

// Favorites
var mockFavorites = {
  VEs: ['SovBase','ModelBSov','OwaMailB2-SOV'],
  Services: ['OwaMailB2','GraphConnectors','FlowControl'],
  favoriteVEs: [
    { name:'SovBase', services:67, type:'B Type', typeClass:'neutral', updated:'2 hours ago' },
    { name:'ModelBSov', services:65, type:'B Type', typeClass:'neutral', updated:'4 hours ago' },
    { name:'OwaMailB2-SOV', services:1, type:'B2 Type', typeClass:'success', updated:'2 minutes ago' }
  ],
  favoriteServices: [
    { name:'OwaMailB2', instances:2, status:'Active', statusClass:'success', updated:'1 hour ago' },
    { name:'Exchange', instances:2, status:'Active', statusClass:'success', updated:'3 hours ago' },
    { name:'GraphConnectors', instances:2, status:'Not Deployed', statusClass:'neutral', updated:'6 hours ago' }
  ]
};

// Helpers
function listServicesByVeName(veName) {
  if (!veName) return [];
  return Array.isArray(veServicesMap[veName]) ? veServicesMap[veName].slice() : [];
}
function listVesByDeploymentScope(scope) {
  if (!scope) return [];
  return Array.isArray(deploymentScopeVesMap[scope]) ? deploymentScopeVesMap[scope].slice() : [];
}

// Build VE detail rows (include VEs with zero services)
function buildVeDetailsArray(){
  var favSet = new Set([].concat(
    mockFavorites.VEs||[],
    (mockFavorites.favoriteVEs||[]).map(function(f){ return f.name; })
  ));
  var rows = [];
  allVes.forEach(function(veName){
    var svcArr = listServicesByVeName(veName);
    var veType = veName.indexOf('B2')>-1 ? 'B2 Type':'B Type';
    var scopes = (veToScopesMap[veName]||[]).filter(function(x,i,a){ return a.indexOf(x)===i; });
    var status = svcArr.length
      ? (veName.indexOf('GraphConnectors')>-1 ? 'attention'
         : (veName.indexOf('FlowControl')>-1 ? 'deploying' : 'normal'))
      : 'inactive';
    rows.push({
      name: veName,
      type: veType + ' VE',
      baseType: veType,
      group: scopes,        // alias required by filter UI
      scopeList: scopes,    // original naming retained for compatibility
      deployments: svcArr.length,
      griffinServices: svcArr.length,
      status: status,
      favorite: favSet.has(veName)
    });
  });
  return rows;
}

var veDetails = buildVeDetailsArray();

// Fallback safeguard: rebuild once more if somehow empty (e.g., earlier script error)
if (!veDetails.length) {
  console.warn('[mockData] veDetails empty after first build – attempting fallback rebuild from releaseMapping lists.');
  veDetails = Array.from(new Set([ // union of all VE names from ExpectedVEs
    ...allVes,
    ...flatArrays(deploymentScopeVesMap || {})
  ])).map(function(veName){
    var svcArr = listServicesByVeName(veName);
    var veType = veName.indexOf('B2')>-1 ? 'B2 Type':'B Type';
    var scopes = (veToScopesMap[veName]||[]).filter(function(x,i,a){return a.indexOf(x)===i;});
    return {
      name:veName,
      type:veType+' VE',
      baseType:veType,
      group:scopes,
      scopeList:scopes,
      deployments:svcArr.length,
      griffinServices:svcArr.length,
      status: svcArr.length ? 'normal':'inactive',
      favorite:false
    };
  });
  console.info('[mockData] Fallback veDetails size:', veDetails.length);
}

// ---- Service aggregation (for pages; moved from page scripts) ----
function aggregateServiceStatusFromVeStatuses(arr){
  if(arr.some(s=>'attention'===s)) return { status:'Config Issue', statusClass:'warning' };
  if(arr.some(s=>'deploying'===s)) return { status:'Deploying', statusClass:'warning' };
  if(arr.some(s=>'normal'===s)) return { status:'Active', statusClass:'success' };
  return { status:'Not Deployed', statusClass:'neutral' };
}
function derivePipelines(info){
  if(!info) return [{
    id:0,type:'Placeholder',icon:'package',color:'purple',
    latestBuild:'n/a',dropUrl:'N/A',description:'No pipeline metadata in mock data'
  }];
  const list=[];
  if(info.MainlineBuildPipelineId) list.push({
    id:info.MainlineBuildPipelineId,type:'Mainline',icon:'git-branch',color:'blue',
    latestBuild:info.BuildVersion||info.BuildVersionPreview||'—',
    dropUrl:info.BuildPathPattern||'N/A',description:'Mainline build artifacts'
  });
  if(info.IncrementalBuildPipelineId) list.push({
    id:info.IncrementalBuildPipelineId,type:'Incremental',icon:'trending-up',color:'green',
    latestBuild:info.BuildVersion||'—',
    dropUrl:info.BuildPathPattern||'N/A',description:'Incremental build artifacts'
  });
  return list.length?list:derivePipelines(null);
}
// Build service cards + detailed models
var favoriteServiceNames = new Set(
  [].concat(mockFavorites.Services||[], (mockFavorites.favoriteServices||[]).map(function(f){return f.name;}))
);
var serviceCards = [];
var serviceModels = {};
(function buildServices(){
  var statusByVe = {};
  veDetails.forEach(function(v){ statusByVe[v.name]=v.status; });
  allServices.forEach(function(svc){
    // Collect VEs containing this service
    var veList = Object.keys(veServicesMap||{}).filter(function(ve){
      return (veServicesMap[ve]||[]).indexOf(svc)>-1;
    });
    var veStatuses = veList.map(function(ve){ return statusByVe[ve]||'inactive'; });
    var agg = aggregateServiceStatusFromVeStatuses(veStatuses);
    var info = servicesInfo[svc] || {};
    var version = info.BuildVersion || info.MainlineBuildVersion || null;
    var card = {
      name:svc,
      instances:veList.length,
      deployed:veList.length,
      version:version,
      status:agg.status,
      statusClass:agg.statusClass,
      favorite:favoriteServiceNames.has(svc),
      veList:veList
    };
    serviceCards.push(card);
    serviceModels[svc] = {
      name:svc,
      description: info.Description || info.ServiceName || (svc + ' service'),
      type: info.ServiceType || 'Service',
      version: version,
      veList: veList,
      deployedCount: veList.length,
      totalCount: veList.length,
      status: agg.status,
      statusClass: agg.statusClass,
      pipelines: derivePipelines(info),
      favorite: card.favorite
    };
  });
  // Favorite-first ordering for cards
  serviceCards.sort(function(a,b){
    if(a.favorite&&!b.favorite) return -1;
    if(!a.favorite&&b.favorite) return 1;
    return a.name.localeCompare(b.name);
  });
})();

// Replace MockData object (keep previous properties, add allVEs alias)
window.MockData = {
  users: mockUsers,
  roles: mockRoles,
  favorites: mockFavorites,
  deploymentScopeVesMap: deploymentScopeVesMap,
  veServicesMap: veServicesMap,
  servicesInfo: servicesInfo,
  allVes: allVes,
  allVEs: allVes,
  allServices: allServices,
  veDetails: veDetails,
  serviceCards: serviceCards,
  serviceModels: serviceModels
};
// Dispatch ready event (pages can listen if needed)
try { window.dispatchEvent(new Event('MockDataReady')); } catch(_){}

// (Optional) simple list helpers (kept for potential reuse)
window.listServicesByVeName = listServicesByVeName;
window.listVesByDeploymentScope = listVesByDeploymentScope;