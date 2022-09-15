import axios from 'axios';
const instance = axios.create({baseURL: 'http://13.127.241.54/api/v1'});
export default instance