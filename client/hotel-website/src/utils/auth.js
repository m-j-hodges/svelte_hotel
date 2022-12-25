import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken())
  }

  loggedIn() {
    const token = this.getToken();

    return token && this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    

  }

}