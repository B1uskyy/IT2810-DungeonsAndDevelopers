import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes.tsx';

function App() {
  return (
    <BrowserRouter basename="/project2">
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
