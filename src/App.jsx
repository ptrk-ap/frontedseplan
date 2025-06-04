import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DespesasPoder from './pages/DespesasPoder/DespesasPoder'
import { usePageLoading } from './hooks/usePageLoading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Cria a instância do QueryClient
const queryClient = new QueryClient()

function AppRoutes() {
  const loadingPage = usePageLoading()

  if (loadingPage) return null

  return (
    <Routes>
      <Route path="/" element={<DespesasPoder />} />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  )
}

export default App
