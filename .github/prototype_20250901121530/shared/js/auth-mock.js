(function(){
  var KEY="proto_session_user";
  function loggedIn(){ try { return !!localStorage.getItem(KEY); } catch(e){ return false; } }
  function login(u){ try { localStorage.setItem(KEY,u||"demo"); } catch(e){} }
  function logout(){ try { localStorage.removeItem(KEY); } catch(e){} }
  window.MockAuth={ loggedIn:loggedIn, login:login, logout:logout };
})();
