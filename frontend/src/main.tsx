import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { DungeonProvider } from './context/DungeonContext.tsx';
import './index.css';
import client from './client/apollo.ts';
import {ApolloProvider} from '@apollo/react-hooks';
import { AuthProvider } from './context/authContext.tsx';


const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <DungeonProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
    </DungeonProvider>
    </QueryClientProvider>
    
  </StrictMode>
  </ApolloProvider>
);
