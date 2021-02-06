import axios from 'axios';

const fetchData = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default fetchData;
