(function(G){
  function renderFooter(){
    const f = document.createElement('footer');
    f.className='layout-footer';
    f.textContent = 'Prototype build - static mock (no backend) - '+ new Date().toLocaleString();
    return f;
  }
  G.Layout = G.Layout || {};
  G.Layout.renderFooter = renderFooter;
})(window.GMS);
