import Routing from '../src/routes/Routing';
import SessionProvider from './context/SessionProvider';
import FavoritesProvider from './context/FavoritesProvider';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <Toaster position="top-center" />
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  );
}
export default App;