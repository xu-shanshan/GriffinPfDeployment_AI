(function(G){
  const navItems = [
    { href:'dashboard.html', label:'Dashboard', key:'dashboard' },
    { href:'ve-list.html', label:'VEs', key:'ves' },
    { href:'deployments.html', label:'Deployments', key:'deployments' },
    { href:'reports.html', label:'Reports', key:'reports' },
    { href:'settings.html', label:'Settings', key:'settings' }
  ];
  function renderSidebar(active){
    const aside = document.createElement('aside');
    aside.className='layout-sidebar';
    const ul = document.createElement('ul');
    ul.className='nav';
    ul.innerHTML = navItems.map(n=>`
      <li><a data-nav href="${n.href}" class="${active===n.key?'active':''}">${n.label}</a></li>
    `).join('');
    aside.appendChild(ul);
    return aside;
  }
  G.Layout = G.Layout || {};
  G.Layout.renderSidebar = renderSidebar;
})(window.GMS);
