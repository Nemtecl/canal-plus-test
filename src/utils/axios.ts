import axios from 'axios';

export function setup() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || '/api';
  axios.defaults.headers.common.Accept = 'application/json';

  axios.defaults.params = {
    api_key: process.env.REACT_APP_API_KEY || '',
    language: 'fr-FR',
  };

  axios.interceptors.response.use(
    (r) => r.data,
    (err) => {
      const r = err.response;
      if (r.status >= 400 && r.status < 500) {
        console.error(r);
      }

      if (r.status >= 500) {
        console.error(r);
      }

      return Promise.reject(err);
    },
  );
}

export default setup;
