// services/dashboardService.js
import axios from 'axios';

export const fetchGrafico1 = () => axios.get('http://localhost:3000/get-data').then(res => res.data);
export const fetchGrafico2 = () => axios.get('http://localhost:3000/get-ug').then(res => res.data);
export const fetchGrafico3 = () => axios.get('http://localhost:3000/get-receita').then(res => res.data);

