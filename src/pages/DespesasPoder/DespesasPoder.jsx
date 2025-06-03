import BarraSuperior from '../../Components/BarraSuperior'
import DonutChart from '../../Components/DonutChart'
import BarChart from '../../Components/BarChart'
import DataTable from '../../Components/DataTable'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../pages/DespesasPoder/despesas.css'
import { useDashboardData } from '../../hooks/useDashboardData'


 function DespesasPoder() {
  const { grafico1,grafico2,grafico3, isLoading, isError } =  useDashboardData()

if (isLoading) return <div>Carregando...</div>;
if (isError) return <div>Erro ao carregar dados.</div>;

const dataMatrix = grafico1?.map(item => [item.Poder, item['Despesas Empenhadas']]) || [];

const dataug = grafico2
  ? grafico2
      .map(item => [item['Unidade Gestora'], Number(item['Despesas Pagas'])])
      .sort((a, b) => b[1] - a[1]) // Ordena do maior para o menor
  : [];

  // Função utilitária para buscar o valor pela chave do poder
const getDespesa = (poder) => {
  const found = grafico1.find(item => item.Poder === poder);
  const valor = found ? Number(found["Despesas Empenhadas"]) : 0;

  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
const getReceita = (poder) => {
  const found = grafico3.find(item => item.Poder === poder);
  const valor = found ? Number(found["Receita Arrecadada Líquida"]) : 0;

  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

  return (
    <>
      <BarraSuperior />
      <div className="dashboard-container">
        <div className="faixa">
          <div className="poder receita">
            <p>Receita Total</p>
            <br />
            <p>{getReceita("Total")}</p>
          </div>
          <div className="poder total">
            <p>Total de Despesas</p>
            <br />
            <p>{getDespesa("Total")}</p>
          </div>      
      

          <div className="poder executivo">
          <p>Despesas Executivo</p>
          <br />
          <p>{getDespesa("1 - Executivo")}</p>
        </div>

          <div className="poder legislativo">
          <p>Despesas Legislativo</p>
          <br />
          <p>{getDespesa("2 - Legislativo")}</p>
        </div>

        <div className="poder judiciario">
          <p>Despesas Judiciário</p>
          <br />
          <p>{getDespesa("3 - Judiciário")}</p>
        </div>
       <div className="poder MP">        
          <p>Despesas Ministério Público</p>
          <br />
          <p>{getDespesa("4 - Ministério Público")}</p>
        </div>
         <div className="poder MP">
          <p>Despesas Defensoria</p>
          <br />
          <p>{getDespesa("5 - Defensoria")}</p>
        </div>
        
        
        </div>

        <div className="chart-row">
          <div className="donut-chart-container">
            <DonutChart dataug={dataug} />
          </div>
          <div className="bar-chart-container">
            {/* ✅ Envia matriz convertida via props */}
            <BarChart dataMatrix={dataMatrix} />
           
          </div>
        </div>

        <div className="table-container">
          <DataTable data={grafico2} />
        </div>
      </div>
    </>
  )
}

export default DespesasPoder
