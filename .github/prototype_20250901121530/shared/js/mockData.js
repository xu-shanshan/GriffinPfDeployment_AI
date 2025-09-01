// Minimal mockData stub (will be expanded). Matches legacy naming for continuity.
(function(){
  var mockFavorites = {
    favoriteVEs:[ { name:'SovBase', services:10, updated:'2h ago' }, { name:'ModelBSov', services:10, updated:'2h ago' } ],
    favoriteServices:[ { name:'ActionsAssistants', instances:2, status:'Active', statusClass:'success', updated:'30m ago' } ]
  };
  window.MockData = {
    favorites: mockFavorites,
    allVEs:['SovBase','ModelBSov'],
    allServices:['ActionsAssistants','FlowCore'],
    veDetails:[ { name:'SovBase', status:'normal', services:10 }, { name:'ModelBSov', status:'normal', services:8 } ],
    serviceModels:{ ActionsAssistants:{ name:'ActionsAssistants', status:'Active', statusClass:'success' } }
  };
  try { window.dispatchEvent(new Event('MockDataReady')); } catch(_){}
})();
