import { ReactNode, useContext } from 'react';
import { DungeonProvider } from '../../context/DungeonContext.tsx';
import { AuthContext } from '../../context/AuthContext.tsx';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const { userId } = useContext(AuthContext);

  return (
    <DungeonProvider userId={userId || ''}>
      {children}
    </DungeonProvider>
  );
};

export default AppProviders;