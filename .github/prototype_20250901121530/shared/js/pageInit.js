/* pageInit: ensures MockData ready + shared injection chain */
(function(){
  function initPageWithMockData(navKey, cb){
    injectHeader(); injectSidebar();
    if(navKey) setActiveNav(navKey);
    var attempt=0;
    function ready(){
      if(window.MockData){ cb && cb(); syncSidebarFavorites(); }
      else if(attempt<20){ attempt++; setTimeout(ready,30); }
    }
    ready();
  }
  window.initPageWithMockData = initPageWithMockData;
})();
