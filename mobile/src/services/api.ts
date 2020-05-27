import axios from 'axios';

const api = axios.create({
  // 10.0.2.2 => ip usado para emulador android studio
  baseURL: 'http://10.0.2.2:3333',
});

export default api;
