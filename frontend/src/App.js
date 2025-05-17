import { useThemeMode } from './Hooks/useThemeMode';
import { AppRoutes } from './Routes/AppRoutes';

function App() {
    useThemeMode();
    return (
        <div className="app">
            <AppRoutes />
        </div>
    );
}

export default App;