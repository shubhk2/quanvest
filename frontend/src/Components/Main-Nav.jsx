import { Link } from 'react-router-dom';
import '../Styles/Components/Main-Nav.css';
import { useThemeMode } from '../Hooks/useThemeMode';
import { FaRegSun, FaRegMoon } from "react-icons/fa";

export const MainNav = () => {
    const { mode, toggleTheme } = useThemeMode();

    return (
        <div className="main-nav">
            <div>
                <Link to={"/chat-ai"}>
                    <button>Chat AI</button>
                </Link>
                <Link to={"/dashboard"}>
                    <button>Dashboard</button>
                </Link>
                <Link to={"/company-overview"}>
                    <button>Company Overview</button>
                </Link>
                <Link to={"/financials"}>
                    <button>Financials</button>
                </Link>
                <Link to={"/ratio-analysis"}>
                    <button>Ratio Analysis</button>
                </Link>
                <Link to={"/valuation-modeling"}>
                    <button>Valuation Modeling</button>
                </Link>
                <Link to={"/peer-comparison"}>
                    <button>Peer Comparison</button>
                </Link>
                <Link to={"/forecasting"}>
                    <button>ML Forecasting</button>
                </Link>
                <Link to={"/reports-downloads"}>
                    <button>Reports & Downloads</button>
                </Link>
            </div>
            <div>
                <div className='settings'>
                    <button>Settings</button>
                    <div className='settings-dropdown'>
                        <Link to={"/account"}>
                            <button>Account</button>
                        </Link>
                        <div className='theme-toggle-container' onClick={toggleTheme}>
                            <FaRegSun className='modes' />
                            <div className={mode === 'light' ? 'theme-toggler light-theme' : 'toggle theme-toggler dark-theme'}>
                                <span className='toggle'></span>
                            </div>
                            <FaRegMoon className='modes' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}