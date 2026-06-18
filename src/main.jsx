import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions : {
    queries :{
      slateTime : 1000*60*5,
      cacheTime: 1000*60*15,
      refetchOnWindowFocus : true,
      refetchOnReconnect : true,
      retry : import.meta.env.ENVIRONMENT == 'production' ? 3 : 1,
      retryDelay : attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  }
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </QueryClientProvider>


)
