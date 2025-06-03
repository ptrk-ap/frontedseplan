// hooks/useDashboardData.js
import { useQuery } from '@tanstack/react-query';
//import { fetchGrafico1, fetchGrafico2, fetchGrafico3 } from '../services/dashboardService';
import { fetchGrafico1, fetchGrafico2,fetchGrafico3} from '../services/dashboardService';

export const useDashboardData = () => {
  const grafico1Query = useQuery({
    queryKey: ['grafico1'],
    queryFn: fetchGrafico1
  });

   const grafico2Query = useQuery({
    queryKey: ['grafico2'],
    queryFn: fetchGrafico2
  });
    const grafico3Query = useQuery({
    queryKey: ['grafico3'],
    queryFn: fetchGrafico3
  });



  /*
   

    const isLoading = grafico1Query.isLoading || grafico2Query.isLoading || grafico3Query.isLoading;
  const isError = grafico1Query.isError || grafico2Query.isError || grafico3Query.isError;

   return {
    grafico1: grafico1Query.data,
    grafico2: grafico2Query.data,
    grafico3: grafico3Query.data,
    isLoading,
    isError
  };
  */


  const isLoading = grafico1Query.isLoading || grafico2Query.isLoading  || grafico3Query.isLoading;
  const isError = grafico1Query.isError || grafico2Query.isError  || grafico3Query.isError;

  return {
    grafico1: grafico1Query.data,
    grafico2: grafico2Query.data,
     grafico3: grafico3Query.data,
  
    isLoading,
    isError
  };
};
