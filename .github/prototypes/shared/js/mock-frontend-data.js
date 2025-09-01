// ...existing code (moved)...
window.MockFavorites = {
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
window.listAllMockServices = window.listAllServices;
(function ensureVeServicesObject(){
  const raw = typeof window.VeServicesMap === 'function'
    ? window.VeServicesMap()
    : (window.VeServicesMap || {});
  window.mockeVeServicesMap = raw && typeof raw === 'object' ? raw : {};
})();
window.listAllMockVes = window.listAllVEs;
window.mockDeploymentScopesMap = window.deploymentScopesMap;
function buildVeDetails() {
  const deploymentScopesMap = (window.mockDeploymentScopesMap && typeof window.mockDeploymentScopesMap === 'object'
      ? window.mockDeploymentScopesMap
      : (typeof window.deploymentScopesMap === 'function' ? window.deploymentScopesMap() : {}));
  const veServicesMap = (window.mockeVeServicesMap && typeof window.mockeVeServicesMap === 'object'
      ? window.mockeVeServicesMap
      : (typeof window.VeServicesMap === 'function' ? window.VeServicesMap() : {}));
  const favoritesRich = window.MockFavorites?.favoriteVEs || [];
  const favoriteNames = new Set([...favoritesRich.map(f=>f.name), ...(window.MockFavorites?.VEs||[])]);
  const veToScopes = {};
  Object.entries(deploymentScopesMap||{}).forEach(([scope,ves])=>{
    (ves||[]).forEach(vn=>{
      if(!veToScopes[vn]) veToScopes[vn]=[];
      veToScopes[vn].push(scope);
    });
  });
  const veDetails = [];
  Object.entries(veServicesMap||{}).forEach(([veName, services])=>{
    const svcArr = Array.isArray(services)?services:[];
    const veType = veName.includes('B2') ? 'B2 Type' : 'B Type';
    const scopes = veToScopes[veName]? [...new Set(veToScopes[veName])] : [];
    veDetails.push({
      name: veName,
      type: veType + ' VE',
      baseType: veType,
      group: scopes,
      deployments: svcArr.length,
      griffinServices: svcArr.length,
      status: (svcArr.length>0)?'normal':'inactive',
      favorite: favoriteNames.has(veName)
    });
  });
  return { dataset: veDetails };
}
window.buildVeDetails = buildVeDetails;
