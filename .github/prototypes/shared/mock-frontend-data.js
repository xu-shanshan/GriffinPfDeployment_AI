// Frontend enrichment mock (favorites, UI-preference data). Independent of backend shape.
window.MockFavorites = {
  // Legacy simple name arrays (fallback)
  VEs: ['SovBase','ModelBSov','OwaMailB2-SOV'],
  Services: ['OwaMailB2','GraphConnectors','FlowControl'],
  // Rich metadata (preferred)
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

// Convenience helper (optional)
window.listAllMockServices = window.listAllServices

// Ensure map is a plain object (call function if necessary & if backend script loaded)
(function ensureVeServicesObject(){
  const raw = typeof window.VeServicesMap === 'function'
    ? window.VeServicesMap()
    : (window.VeServicesMap || {});
  window.mockeVeServicesMap = raw && typeof raw === 'object' ? raw : {};
})();

window.listAllMockVes = window.listAllVEs

window.mockDeploymentScopesMap = window.deploymentScopesMap

/**
 * {
  veDetails: [
    {
      name: "SovBase",
      type: "B Type VE",
      baseType: "B Type",
      group: "SovBaseVEs",
      deployments: 63,        // 来自 ExpectedServices[SovBase].length
      griffinServices: 63,
      status: "normal",
      favorite: true          // 因为在 MockFavorites.VEs 里
    },
    {
      name: "ModelBSov",
      type: "B Type VE",
      baseType: "B Type",
      group: "ModelBSovVEs",
      deployments: 61,
      griffinServices: 61,
      status: "normal",
      favorite: true
    },
    {
      name: "OwaMailB2-SOV",
      type: "B2 Type VE",
      baseType: "B2 Type",
      group: "ModelB2SovVEs",
      deployments: 1,
      griffinServices: 1,
      status: "normal",
      favorite: true
    },
    // ...其余十几个 VE ...
  ]
}

 */

function buildVeDetails() {
  const deploymentScopesMap = 
        (window.mockDeploymentScopesMap && typeof window.mockDeploymentScopesMap === 'object'
          ? window.mockDeploymentScopesMap
          : (typeof window.deploymentScopesMap === 'function' ? window.deploymentScopesMap() : {}));
    const veServicesMap =
        (window.mockeVeServicesMap && typeof window.mockeVeServicesMap === 'object'
          ? window.mockeVeServicesMap
          : (typeof window.VeServicesMap === 'function' ? window.VeServicesMap() : {}));

    const favoritesRich = window.MockFavorites?.favoriteVEs || [];
    const favoriteNames = new Set([
        ...favoritesRich.map(f => f.name),
        ...(window.MockFavorites?.VEs || [])
    ]);
    const deploymentScope = window.

    const veDetails = [];

    Object.entries(veServicesMap || {}).forEach(([veName, services]) => {
        const svcArr = Array.isArray(services) ? services : [];
        const veType = veName.includes('B2') ? 'B2 Type' : 'B Type';
        veDetails.push({
            name: veName,
            type: veType + ' VE',
            baseType: veType,
            group:  deploymentScopesMap[veName] || [],
            deployments: svcArr.length,
            griffinServices: svcArr.length,
            status: (svcArr.length > 0) ? 'normal' : 'inactive',
            favorite: favoriteNames.has(veName)
        });
    });

    // Return shape expected by ve-management.html
    return { dataset: veDetails };
}

// Expose for existing usage (optional)
window.buildVeDetails = buildVeDetails;