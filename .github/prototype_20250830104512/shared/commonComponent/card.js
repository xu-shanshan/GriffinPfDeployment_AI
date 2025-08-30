(function(G){
  function Card({ title, right, body, footer, classes='' }){
    const c = document.createElement('div');
    c.className = 'card '+classes;
    c.innerHTML = `
      <div class="card-header">
        <span>${title||''}</span>
        <div class="card-header-right">${right||''}</div>
      </div>
      <div class="card-body">${body||''}</div>
      ${footer?`<div class="card-footer">${footer}</div>`:''}
    `;
    return c;
  }
  G.Components = G.Components || {};
  G.Components.Card = Card;
})(window.GMS);
