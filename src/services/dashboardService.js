// services/dashboardService.js
import axios from 'axios';

export const fetchGrafico1 = () => axios.get('https://painelseplan.onrender.com/get-data').then(res => res.data);
export const fetchGrafico2 = () => axios.get('https://painelseplan.onrender.com/get-ug').then(res => res.data);
export const fetchGrafico3 = () => axios.get('https://painelseplan.onrender.com//get-receita').then(res => res.data);

