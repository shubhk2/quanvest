import { useThemeMode } from './Hooks/useThemeMode';
import { AppRoutes } from './Routes/AppRoutes';
import './Styles/Global/Universal.css';

function App() {
    useThemeMode();
    return (
        <div className="app">
            <AppRoutes />
        </div>
    );
}

export default App;