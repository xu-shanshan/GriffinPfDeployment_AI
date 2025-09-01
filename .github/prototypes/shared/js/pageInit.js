/* Page initialization utility for MockData-dependent prototype pages (no modules) */
(function(){
  var DEFAULT_POLL_INTERVAL = 60;
  var DEFAULT_TIMEOUT = 4000;

  function hasData(d){
    return !!(d && d.veDetails && Array.isArray(d.veDetails) && d.veDetails.length);
  }

  function finish(cb, data, resolve){
    try { cb && cb(data); } catch(e){ console.error('[initPageWithMockData] callback error:', e); }
    resolve && resolve(data);
  }

  /**
   * initPageWithMockData(callback, options?)
   * options: { timeoutMs?:number, pollIntervalMs?:number, requireDetails?:boolean }
   * - Waits for window.MockData (and optionally veDetails) then invokes callback(MockData).
   * - Returns a Promise resolving to MockData.
   */
  window.initPageWithMockData = function initPageWithMockData(callback, options){
    options = options || {};
    var timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT;
    var pollMs = options.pollIntervalMs || DEFAULT_POLL_INTERVAL;
    var requireDetails = options.requireDetails !== false; // default true
    return new Promise(function(resolve){
      var start = Date.now();

      // Immediate
      if (window.MockData && (!requireDetails || hasData(window.MockData))){
        return finish(callback, window.MockData, resolve);
      }

      // Event listener path
      var done = false;
      function tryComplete(reason){
        if(done) return;
        if(window.MockData && (!requireDetails || hasData(window.MockData))){
          done = true;
          finish(callback, window.MockData, resolve);
          return true;
        }
        if(Date.now() - start >= timeoutMs){
          console.warn('[initPageWithMockData] timeout waiting for MockData ('+reason+')');
          done = true;
            finish(callback, window.MockData || {}, resolve);
          return true;
        }
        return false;
      }

      window.addEventListener('MockDataReady', function onReady(){
        if(tryComplete('event')) window.removeEventListener('MockDataReady', onReady);
      });

      // Poll fallback
      (function poll(){
        if(tryComplete('poll')) return;
        setTimeout(poll, pollMs);
      })();
    });
  };

  // Convenience accessors (safe fallbacks)
  window.getVeDataset = function(){ return (window.MockData && window.MockData.veDetails) ? window.MockData.veDetails.slice() : []; };
  window.getAllVEs = function(){ return (window.MockData && (window.MockData.allVEs || window.MockData.allVes)) ? (window.MockData.allVEs || window.MockData.allVes).slice() : []; };
  window.getAllServices = function(){ return (window.MockData && window.MockData.allServices) ? window.MockData.allServices.slice() : []; };
})();
