import { useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DonutChart = ({ dataug }) => {
  const [hiddenIndices, setHiddenIndices] = useState([]);

  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#8AC24A', '#D2691E'
  ];

  const hoverBackgroundColors = [
    '#FF8FA1', '#68BFF1', '#FFE88A', '#80DDDD',
    '#BFA6FF', '#FFB770', '#A9DA6F', '#E07B3B'
  ];

  const topData = dataug.slice(0, 8);

  const labels = topData.map(item => item[0]);
  const dataValues = topData.map(item => parseFloat(item[1]));

  // ✅ Calcula o total
  const total = useMemo(() => dataValues.reduce((sum, val) => sum + val, 0), [dataValues]);

  // ✅ Monta labels com porcentagem
  const labelsWithPercentage = labels.map((label, index) => {
    const value = dataValues[index];
    const percentage = ((value / total) * 100).toFixed(1);
    return `${label} (${percentage}%)`;
  });

  const data = {
    labels: labelsWithPercentage,
    datasets: [{
      data: dataValues.map((value, index) => 
        hiddenIndices.includes(index) ? 0 : value
      ),
      backgroundColor: backgroundColors.slice(0, topData.length),
      hoverBackgroundColor: hoverBackgroundColors.slice(0, topData.length),
      borderColor: backgroundColors.slice(0, topData.length),
      borderWidth: 1,
      hoverOffset: 20,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    spacing: 5,
    plugins: {
      legend: {
        position: 'left',
        align: 'start',
        labels: {
          boxWidth: 12,
          padding: 40,
          font: { size: 17 },
          color: 'white',
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.index;
          setHiddenIndices(prev => 
            prev.includes(index) 
              ? prev.filter(i => i !== index) 
              : [...prev, index]
          );
        }
      },
      tooltip: {
        bodyFont: { size: 17 },
        titleFont: { size: 17 },
        bodyColor: 'white',
        titleColor: 'white',
      },
      title: {
        display: true,
        text: 'Despesas pagas por UG do executivo ',
        font: { size: 17 },
        color: 'white',
        
       

        
        
      },
      
    },
    onClick: (e, elements, chart) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setHiddenIndices(prev => 
          prev.includes(index) 
            ? prev.filter(i => i !== index) 
            : [...prev, index]
        );
      }
    }
  };

  return (
    <div style={{ marginTop: '50px', height: '80%', width: '100%' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
