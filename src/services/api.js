import axios from 'axios';

export default axios.create({
    baseURL: 'https://banksystem-1-0.onrender.com',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});