import { Link, NavLink, useLocation } from "react-router-dom"
import '../Styles/Components/Home-Nav.css';
import { useThemeMode } from '../Hooks/useThemeMode';
import { IoMdSettings } from "react-icons/io";
import { FaRegSun, FaRegMoon } from "react-icons/fa";

export const HomeNav = () => {
    const { mode, toggleTheme } = useThemeMode();
    const location = useLocation();
    const isCompanyPage = location.pathname.startsWith("/company/");

    return (
        <div className={`home-nav ${isCompanyPage && 'compressed'}`}>
            <div></div>
            <div>
                <NavLink tabIndex={-1} to={"dashboard"}><button>Dashboard</button></NavLink>
                <NavLink tabIndex={-1} to={"company"}><button>Company</button></NavLink>
                <NavLink tabIndex={-1} to={""}><button>Quanvest</button></NavLink>
                <NavLink tabIndex={-1} to={"market"}><button>Market</button></NavLink>
                <NavLink tabIndex={-1} to={"news"}><button>News</button></NavLink>
            </div>
            <div>
                <div className='settings'>
                    <button><IoMdSettings /></button>
                    <div className='settings-dropdown'>
                        <Link to={"account"}>
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