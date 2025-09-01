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
    ]
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
      "GraphConnectorsB2-SOV","FlowControlB2-SOV"
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

window.MockData = {
  users: mockUsers,
  roles: mockRoles,
  favorites: mockFavorites,
  deploymentScopeVesMap: deploymentScopeVesMap,
  veServicesMap: veServicesMap,
  servicesInfo: servicesInfo,
  allVes: allVes,
  allServices: allServices,
  veDetails: veDetails
};

// (Optional) simple list helpers (kept for potential reuse)
window.listServicesByVeName = listServicesByVeName;
window.listVesByDeploymentScope = listVesByDeploymentScope;