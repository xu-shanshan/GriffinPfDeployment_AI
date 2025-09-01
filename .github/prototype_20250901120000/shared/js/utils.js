// filepath: c:\src\gitXxtq\GriffinPfDeployment_AI\.github\prototype_20250901120000\shared\js\utils.js
window.refreshFeatherIcons = function(){
  if(window.feather){ feather.replace(); }
};
window.initPageWithMockData = function(cb){
  if(window.MockData){ cb(window.MockData); return; }
  window.addEventListener('MockDataReady',()=>cb(window.MockData),{ once:true });
};