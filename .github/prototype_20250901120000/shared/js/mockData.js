// Mock Users / Roles
var mockUsers = [
  { id: 1, name: "Alice Admin", role: "Admin", upn: "alice@corp" },
  { id: 2, name: "Oliver Operator", role: "Operator", upn: "oliver@corp" },
  { id: 3, name: "Victor Viewer", role: "Viewer", upn: "victor@corp" }
];

// Active (simulated logged in) user (can be changed on login page)
var currentUser = mockUsers[0];

// VE Catalog
var mockVEs = [
  { name: "SovBase", type: "B", environment: "APE", services: ["AuthService","ConfigService","TelemetryService"] },
  { name: "ModelBSov", type: "B", environment: "APE", services: ["LegacyDataService"] },
  { name: "OwaMailB2-SOV", type: "B2", environment: "CPE", services: ["MailAggregationService","NotificationService"] },
  { name: "TodoB2-SOV", type: "B2", environment: "CPE", services: ["TaskApi","TaskWorker"] }
];

// Service Build / Pipeline / Drop Info
var mockServices = {
  AuthService: {
    name:"AuthService",
    model:"B",
    pipelines:[
      { id:101, name:"Auth-CI", lastBuild:"1.3.4", dropUrlPattern:"https://artifacts.example.com/auth/<BuildVersion>/drop.zip" }
    ],
    latestBuildVersion:"1.3.4",
    description:"Authentication / token issuance"
  },
  ConfigService:{
    name:"ConfigService",
    model:"B",
    pipelines:[{ id:102, name:"Config-CD", lastBuild:"2.1.0", dropUrlPattern:"https://artifacts.example.com/config/<BuildVersion>/bundle.tar.gz"}],
    latestBuildVersion:"2.1.0",
    description:"Central configuration distribution"
  },
  TelemetryService:{
    name:"TelemetryService",
    model:"B",
    pipelines:[{ id:103, name:"Telemetry-CI", lastBuild:"0.9.12", dropUrlPattern:"https://artifacts.example.com/tel/<BuildVersion>/pkg.zip"}],
    latestBuildVersion:"0.9.12",
    description:"Metrics + logging aggregation"
  },
  LegacyDataService:{
    name:"LegacyDataService",
    model:"B",
    pipelines:[{ id:104, name:"Legacy-Migrate", lastBuild:"5.4.2", dropUrlPattern:"https://artifacts.example.com/legacy/<BuildVersion>/drop.zip"}],
    latestBuildVersion:"5.4.2",
    description:"Legacy data bridge"
  },
  MailAggregationService:{
    name:"MailAggregationService",
    model:"B2",
    pipelines:[{ id:201, name:"Mail-CI", lastBuild:"3.2.1", dropUrlPattern:"https://artifacts.example.com/mail/<BuildVersion>/artifact.zip"}],
    latestBuildVersion:"3.2.1",
    description:"Mailbox event aggregation"
  },
  NotificationService:{
    name:"NotificationService",
    model:"B2",
    pipelines:[{ id:202, name:"Notify-CD", lastBuild:"1.8.0", dropUrlPattern:"https://artifacts.example.com/notify/<BuildVersion>/bundle.zip"}],
    latestBuildVersion:"1.8.0",
    description:"User notification dispatcher"
  },
  TaskApi:{
    name:"TaskApi",
    model:"B2",
    pipelines:[{ id:301, name:"TaskApi-CI", lastBuild:"0.4.7", dropUrlPattern:"https://artifacts.example.com/taskapi/<BuildVersion>/artifact.zip"}],
    latestBuildVersion:"0.4.7",
    description:"Task management REST API"
  },
  TaskWorker:{
    name:"TaskWorker",
    model:"B2",
    pipelines:[{ id:302, name:"TaskWorker-CD", lastBuild:"0.4.7", dropUrlPattern:"https://artifacts.example.com/taskworker/<BuildVersion>/worker.zip"}],
    latestBuildVersion:"0.4.7",
    description:"Background task processor"
  }
};

// Permission (INI-like) - AllowedToSignClaims simulation
var allowedToSignClaims = {
  groups:["AME\\M365-SovFleet"],
  users:["alice@corp","oliver@corp"] // upn list
};

// Deployment History (mock)
var mockDeployments = [
  {
    id: 1,
    timestamp: "2025-08-25T10:15:00Z",
    user: "alice@corp",
    scope: { ve: "SovBase", services:["AuthService","ConfigService"] },
    artifacts:[
      { service:"AuthService", build:"1.3.4" },
      { service:"ConfigService", build:"2.1.0" }
    ],
    status:"Succeeded"
  },
  {
    id: 2,
    timestamp:"2025-08-26T14:02:00Z",
    user:"oliver@corp",
    scope:{ ve:"OwaMailB2-SOV", services:["MailAggregationService"] },
    artifacts:[{ service:"MailAggregationService", build:"3.2.1"}],
    status:"InProgress"
  }
];

// Helpers (simple, global)
function getVE(name){
  for (var i=0;i<mockVEs.length;i++){ if(mockVEs[i].name===name) return mockVEs[i]; }
  return null;
}
function getService(name){ return mockServices[name]; }
function canCurrentUserDeploy(){
  if(!currentUser) return false;
  if(currentUser.role==="Admin") return true;
  if(currentUser.role==="Operator"){
    return allowedToSignClaims.users.indexOf(currentUser.upn) !== -1;
  }
  return false;
}
function composeDropUrl(service){
  var svc = getService(service);
  if(!svc) return "";
  var pattern = svc.pipelines[0].dropUrlPattern;
  return pattern.replace("<BuildVersion>", svc.latestBuildVersion);
}
function simulateDeploy(scope){
  var id = mockDeployments.length+1;
  mockDeployments.push({
    id:id,
    timestamp:new Date().toISOString(),
    user:currentUser.upn,
    scope:scope,
    artifacts:(scope.services||[]).map(function(s){ return { service:s, build:getService(s).latestBuildVersion }; }),
    status:"Queued"
  });
  alert("Deployment queued (mock). History updated.");
}
