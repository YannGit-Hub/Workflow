// src/services/cookieService.js
export const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };
  
  export const getCookie = (name) => {
    return document.cookie.split('; ').reduce((res, current) => {
      const [key, value] = current.split('=');
      return key === name ? decodeURIComponent(value) : res;
    }, '');
  };
  