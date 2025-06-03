import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ dataMatrix }) => {
  const backgroundColors = [
    '#36A2EB', '#FF6384', '#FFCE56',
    '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
  ];

  const hoverBackgroundColors = [
    '#68BFF1', '#FF8FA1', '#FFE88A',
    '#80DDDD', '#BFA6FF', '#FFB770', '#E0E2E5'
  ];

   console.log(dataMatrix);  // ✅ Aqui você recebe: [["1 - Executivo", "R$ 4..."], ...]

  // Processar dataMatrix, criar labels e dataValues
 const labels = dataMatrix.map(item => item[0]);  // Correto: pega "1 - Executivo"

const dataValues = dataMatrix.map(item => parseFloat(item[1]));  // Sem replace

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Despesas Empenhadas',
        data: dataValues,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
        hoverBorderWidth: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { font: { size: 17 }, color: 'white' },
      },
      tooltip: {
        bodyFont: { size: 17 },
        titleFont: { size: 17 },
        bodyColor: 'white',
        titleColor: 'white',
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      },
      title: {
        display: true,
        text: 'Despesas por Poder 2025',
        font: { size: 17 },
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 15 }, color: 'white' },
      },
      y: {
        ticks: {
          font: { size: 14 },
          color: 'white',
          callback: (value) => {
            return `R$ ${(value / 1e6).toFixed(1)} mi`;  // Exibe valores em milhões
          }
        },
      },
    },
    hover: { mode: 'nearest', intersect: true },
  };

  return (
    <div style={{ marginTop: '40px', height: '90%', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
