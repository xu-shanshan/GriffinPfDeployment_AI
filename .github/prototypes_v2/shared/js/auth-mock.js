(function(){
  const LS_KEY='griffin.auth.mock.user.v1';
  const DEFAULT_ALLOWED = {
    Groups:['AME\\M365-SovFleet'],
    Users:['AME\\xushanshan','AME\\chenjzha','AME\\peihuazhang']
  };
  const MOCK_DIRECTORY = [
    { upn:'john.doe@contoso.com', name:'John Doe', groups:['AME\\M365-SovFleet'], roles:['Admin'] },
    { upn:'jane.viewer@contoso.com', name:'Jane Viewer', groups:[], roles:['Viewer'] },
    { upn:'oliver.ops@contoso.com', name:'Oliver Ops', groups:['AME\\M365-SovFleet'], roles:['Operator'] }
  ];
  function load(){
    try{
      const raw = localStorage.getItem(LS_KEY);
      return raw?JSON.parse(raw):null;
    }catch(_){ return null; }
  }
  function persist(u){
    try{ localStorage.setItem(LS_KEY, JSON.stringify(u)); }catch(_){}
  }
  function effectiveAllowed(){
    return DEFAULT_ALLOWED;
  }
  function matchUser(upn){
    return MOCK_DIRECTORY.find(u=>u.upn.toLowerCase()===upn.toLowerCase());
  }
  function canDeployInternal(user){
    if(!user) return ()=>false;
    const allowed = effectiveAllowed();
    const allowedUsers = new Set(allowed.Users.map(u=>u.toLowerCase()));
    const allowedGroups = new Set(allowed.Groups.map(g=>g.toLowerCase()));
    const userGroups = (user.groups||[]).map(g=>g.toLowerCase());
    const isListed = allowedUsers.has(user.upn.toLowerCase()) ||
                     userGroups.some(g=>allowedGroups.has(g));
    const isAdmin = user.roles?.includes('Admin');
    return ()=> (isAdmin || isListed);
  }
  const Auth = {
    getUser(){ return load(); },
    isAuthenticated(){ return !!load(); },
    signIn(upn, _opts){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          const user = matchUser(upn||'john.doe@contoso.com');
            if(!user){ reject(new Error('User not found')); return; }
          const session = {
            upn:user.upn,
            name:user.name,
            roles:user.roles,
            groups:user.groups,
            issuedAt:Date.now(),
            expiresAt:Date.now()+8*60*60*1000
          };
          persist(session);
          resolve(session);
        }, 800);
      });
    },
    signOut(){
      try{ localStorage.removeItem(LS_KEY); }catch(_){}
    },
    hasRole(role){
      const u = load();
      return !!u && (u.roles||[]).includes(role);
    },
    canDeploy(){
      return canDeployInternal(load())();
    },
    allowedToSignClaims(){
      return effectiveAllowed();
    }
  };
  window.Auth = Auth;
})();
