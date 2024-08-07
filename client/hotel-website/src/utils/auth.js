import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    if(this.getToken() === null) return
    return decode(this.getToken())
  }

  loggedIn() {
    const token = this.getToken();

    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if(decoded.exp < Date.now()/1000) {
      localStorage.removeItem('id_token');
      return true
    }
  return false;
  }
  getToken() {
    return localStorage.getItem('id_token');

  }
  login(idToken) {
  localStorage.setItem('id_token', idToken);
  window.location.reload()
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('myCart')
    window.location.assign('/')
  }

};

export default new AuthService();