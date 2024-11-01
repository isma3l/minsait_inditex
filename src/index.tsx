import React from 'react';
import { createRoot } from 'react-dom/client';
//import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { QueryProvider } from '@/modules/core/queryProvider';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
//const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
