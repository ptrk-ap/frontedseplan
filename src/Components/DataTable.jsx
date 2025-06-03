import React, { useState, useMemo } from 'react';

const DataTable = ({ data = [] }) => {
  const [hoverCell, setHoverCell] = useState(null);

  const processedData = useMemo(() => {
    return data.map(item => {
      const keys = Object.keys(item);
      const newItem = { ...item };

      if (keys.length < 5) {
        const missing = 5 - keys.length;
        for (let i = 1; i <= missing; i++) {
          newItem[`coluna${i}`] = ''; 
        }
      }
      return newItem;
    });
  }, [data]);

  const columnKeys = useMemo(() => {
    if (processedData.length === 0) return [];
    return Object.keys(processedData[0]).slice(0, 5);
  }, [processedData]);

  const colorsRGB = [
    '54, 162, 235',   // Azul
    '138, 194, 74',   // Verde
    '255, 99, 132',   // Rosa
    '255, 159, 64',   // Laranja
    '153, 102, 255'   // Roxo
  ];

  const maxValues = useMemo(() => {
    const result = {};
    columnKeys.forEach(key => {
      const nums = processedData.map(item => Number(item[key])).filter(val => !isNaN(val));
      result[key] = nums.length > 0 ? Math.max(...nums, 1) : 1; // evita zero
    });
    return result;
  }, [processedData, columnKeys]);

const getColorIntensity = (value, max, baseRGB, lighter = false) => {
  let numericValue = Number(value);
  if (isNaN(numericValue) || numericValue === 0) numericValue = 0.1;

  let opacity = 0.7 + (numericValue / max) * 0.9;  // ← Mais intensidade
  if (opacity > 1) opacity = 1;  // ← Não passa de 1

  if (lighter) {
    opacity += 0.15;  // ← No hover, mais brilho
    if (opacity > 1) opacity = 1;
  }
  
  return `rgba(${baseRGB}, ${opacity})`;
};


  const headerStyle = {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#373b38',
    textAlign: 'center',
    height: '60px',
    padding: '20px 10px',
  };

  const cellStyle = {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'black',
    textAlign: 'center',
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <table
        className="table table-striped table-hover"
        style={{ backgroundColor: 'black', borderCollapse: 'separate' }}
      >
        <thead style={{ backgroundColor: '#111' }}>
          <tr>
            {columnKeys.map((key, index) => (
              <th key={index} style={{ ...headerStyle, textAlign: 'center' }}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnKeys.map((colName, colIndex) => {
                const isHovered = hoverCell && hoverCell.rowIndex === rowIndex && hoverCell.colIndex === colIndex;
                const baseRGB = colorsRGB[colIndex % colorsRGB.length];
                const rawValue = row[colName];

                // Sempre formatar valor
                const numValue = Number(rawValue);
                const displayValue = isNaN(numValue) || rawValue === '' 
                  ? rawValue 
                  : Number(rawValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                return (
                  <td
                    key={colIndex}
                    style={{ ...cellStyle, backgroundColor: 'black', cursor: 'pointer', textAlign: colIndex === 0 ? 'left' : 'center' }}
                    onMouseEnter={() => setHoverCell({ rowIndex, colIndex })}
                    onMouseLeave={() => setHoverCell(null)}
                  >
                    <div
                      style={{
                        width: isHovered ? '85%' : '70%',
                        margin: '0 auto',
                        height: '100%',
                        backgroundColor: getColorIntensity(rawValue, maxValues[colName], baseRGB, isHovered),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        fontSize: isHovered ? '1.3rem' : '1rem',
                        transition: 'all 0.3s ease',
                        color: 'white',
                        fontWeight: 'bold',
                        minHeight: '40px',
                        padding: '5px'
                      }}
                    >
                      {displayValue}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
