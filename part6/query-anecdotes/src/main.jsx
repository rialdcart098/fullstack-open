import ReactDOM from 'react-dom/client'
import App from './App'
import { queryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new queryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)