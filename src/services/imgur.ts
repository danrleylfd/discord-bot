import axios from 'axios';
import { imgurClientID } from '../../env';

const api = axios.create({ baseURL: 'https://api.imgur.com/3' });
api.defaults.headers.Authorization = `Client-ID ${imgurClientID}`;

export default api;
