import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient } from '@tanstack/react-query'
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'

const queryClient = new QueryClient({
  defaultOptions : {
    queries :{
      slateTime : 1000*60*5,
      cacheTime: 1000*60*15,
      refetchOnWindowFocus : true,
      refetchOnMount: true,
      refetchOnReconnect : true,
      retry : import.meta.env.ENVIRONMENT == 'production' ? 3 : 1,
      retryDelay : attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  }
});

const persist = createSyncStoragePersister({
     storage: window.localStorage,
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistQueryClientProvider client={queryClient} persistOptions={persist}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </PersistQueryClientProvider>
  </Provider>


)
