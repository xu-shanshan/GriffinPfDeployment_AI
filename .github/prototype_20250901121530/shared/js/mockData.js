/* Mock Data Bootstrapping
   Pulls subsets & structures akin to ReleaseMapping.json.
   Deterministic pseudo-random derived status using simple hash for stable visuals.
*/
(function(){
  var seedHash = function(str){
    var h=0,i,ch; if(!str) return 0;
    for(i=0;i<str.length;i++){ ch=str.charCodeAt(i); h=((h<<5)-h)+ch; h|=0; }
    return Math.abs(h);
  };
  var pick = function(str, arr){
    var h=seedHash(str);
    return arr[h % arr.length];
  };
  var ExpectedServices = {
    Prod:["AH","CompliancePolicy","ComplianceWorkbench","Connectors","DWEngineV2","Grain","Griffin","Hippogriff","Locations","LogScrubServer","Scheduling","TEE","TokenIssuerSAPs"],
    "AHCoreB2-PROD":["AHB2"],
    "EBA1-AG":["AllFiles","ClearData","DirectoryReplication","SignalService"],
    "FastV2B2-Prod":["JanMayenB2","PeopleGraph","PrimeCore","Seed","Swm","YggdrasilB2"],
    "IPGB2-Prod":["AcronymService","ConceptAggregation","DWEngineV2B2","WKWService"],
    "OutlookB2-Prod":["CalendarReplication","GroupService","LocationsB2","SchedulingB2"],
    "TBA1-PPE":["PingB2NetCore"],
    SovBase:["ActionsAssistants","ComplianceAuthServerV2","LinkExtraction","TenantDataSink"]
  };
  var Groups = {
    AllProdVEs:["Prod","AHCoreB2-PROD","OutlookB2-Prod","FastV2B2-Prod","IPGB2-Prod"],
    SovBaseVEs:["SovBase"],
    EagleXBVEs:["EagleX"],
    ItarBVEs:["GccHigh","DoD"]
  };
  // Services meta subset
  var ServiceMeta = {};
  var addServicesFromList=function(list){
    list.forEach(function(s){
      if(ServiceMeta[s]) return;
      ServiceMeta[s]={
        ServiceName:s,
        BuildType:pick(s,["RingPromotion","CloudBuild","Exchange","CustomCloudBuild"]),
        BuildRoot:"/autogen/"+s.toLowerCase(),
        PpeVeName: pick(s,["PPE","FastV2B2-PPE","EBA1-PPE","Griffin",""]),
        IncrementalBuildPipelineId: seedHash(s) % 50000,
        MainlineBuildPipelineId: (seedHash(s+"m") % 50000),
        BuildPathPattern: "VSO://.../"+s+"/<BuildVersion>"
      };
      if(Math.random() < .35){ delete ServiceMeta[s].MainlineBuildPipelineId; }
    });
  };
  Object.keys(ExpectedServices).forEach(function(ve){
    addServicesFromList(ExpectedServices[ve]);
  });

  // Derived mappings
  var allVEsMap = {};
  Object.keys(ExpectedServices).forEach(function(ve){ allVEsMap[ve]=true; });

  Object.keys(Groups).forEach(function(g){
    Groups[g].forEach(function(ve){ allVEsMap[ve]=true; });
  });

  var allVEs = Object.keys(allVEsMap).sort();

  // VE -> services list map (clone)
  var veServicesMap = {};
  allVEs.forEach(function(ve){
    veServicesMap[ve] = (ExpectedServices[ve]||[]).slice();
  });

  // VE details derived (status counts)
  var veDetails = {};
  allVEs.forEach(function(ve){
    var svcs = veServicesMap[ve];
    var statuses = { healthy:0, attention:0, deploying:0 };
    svcs.forEach(function(sv){
      var st = pick(sv+ve,["healthy","healthy","attention","deploying","healthy"]);
      statuses[st] += 1;
    });
    veDetails[ve]={
      name:ve,
      total:svcs.length,
      healthy:statuses.healthy,
      attention:statuses.attention,
      deploying:statuses.deploying,
      updated: Date.now()- (seedHash(ve)%600000)
    };
  });

  // Service models (pipelines / versions)
  var serviceModels = {};
  Object.keys(ServiceMeta).forEach(function(s){
    serviceModels[s]={
      name:s,
      version:"1."+ (seedHash(s)%50) +"."+ (seedHash(s+"v")%100),
      status:pick(s,["ok","ok","warn","bad","ok"]),
      pipelines:[
        { id:"inc-"+ServiceMeta[s].IncrementalBuildPipelineId, type:"Incremental", lastRun:"2025-09-"+((seedHash(s)%27)+1) },
        { id:"main-"+ServiceMeta[s].MainlineBuildPipelineId, type:"Mainline", lastRun:"2025-08-"+((seedHash(s+"m2")%27)+1) }
      ].filter(function(p){ return !p.id.match(/main-0$/); }),
      activeDeploy: pick(s+"dep",[false,false,false,true])
    };
  });

  // Favorites (persist localStorage)
  var FAVORITES_KEY="prototype_favorites_v1";
  var favorites = { ves:[], services:[] };
  var loadFavorites = function(){
    try {
      var raw = localStorage.getItem(FAVORITES_KEY);
      if(raw){ favorites = JSON.parse(raw); }
    } catch(e){}
    if(!favorites.ves) favorites.ves=[];
    if(!favorites.services) favorites.services=[];
  };
  var saveFavorites = function(){
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch(e){}
  };
  loadFavorites();

  var toggleFav = function(kind,name){
    var arr = favorites[kind];
    var i = arr.indexOf(name);
    if(i>=0){ arr.splice(i,1); } else { arr.push(name); }
    saveFavorites();
  };

  // Deployment history generator
  var deploymentHistory = function(count){
    var rows=[];
    for(var i=0;i<count;i++){
      var svc = pick("svc"+i, Object.keys(ServiceMeta));
      var ve = pick("ve"+i, allVEs);
      rows.push({
        id:"dpl-"+i,
        ve:ve,
        service:svc,
        status:pick(ve+svc+i,["Succeeded","Succeeded","InProgress","Failed","Queued"]),
        started:new Date(Date.now()- (i*3600*1000 + (seedHash(ve+svc)%100000))).toISOString(),
        duration:(5 + (seedHash("dur"+i)%54)) + "m"
      });
    }
    return rows;
  };

  window.MockData = {
    expectedVEsGroups:Groups,
    expectedServicesMap:ExpectedServices,
    servicesDetails:ServiceMeta,
    allVEs:allVEs,
    veServicesMap:veServicesMap,
    veDetails:veDetails,
    serviceModels:serviceModels,
    favorites:favorites,
    toggleFavoriteVE:function(n){ toggleFav("ves",n); },
    toggleFavoriteService:function(n){ toggleFav("services",n); },
    isFavoriteVE:function(n){ return favorites.ves.indexOf(n)>=0; },
    isFavoriteService:function(n){ return favorites.services.indexOf(n)>=0; },
    regenDeploymentHistory:function(n){ return deploymentHistory(n||40); }
  };
})();
