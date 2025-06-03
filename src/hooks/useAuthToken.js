import { useEffect, useState } from 'react';
import axios from 'axios';

export function useAuthToken() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndFetchToken = async () => {
      setLoading(true);

      // Verifica se já tem token salvo
      let savedToken = localStorage.getItem('auth_token');

      if (savedToken) {
        try {
          // Valida token
          const response = await axios.post('http://localhost:3000/validate-token', {
            token: savedToken
          });

          if (response.data.valid) {
            // Token válido
            setToken(savedToken);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error('Erro ao validar token:', err);
        }
      }

      // Se não tem ou não é válido → busca novo
      try {
        const res = await axios.get('http://localhost:3000/get-token');
        const newToken = res.data.token;

        localStorage.setItem('auth_token', newToken);
        setToken(newToken);
      } catch (err) {
        console.error('Erro ao obter novo token:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAndFetchToken();
  }, []);

  return { token, loading };
}
