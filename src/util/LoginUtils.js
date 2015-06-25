export function isLogin(){
  if(!JSON.parse(localStorage.getItem("talk2user"))) return false;
  else return true;
}
export function getUser(){
  var user = JSON.parse(localStorage.getItem("talk2user"));
  if(!user) return null;
  else return user;
}
export function login( user, callback ){
  localStorage.setItem("talk2user",JSON.stringify( user ));
  callback( user );
}
export function logout(){
  localStorage.removeItem("talk2user");
}
