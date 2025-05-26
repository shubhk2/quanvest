import { Link, NavLink } from "react-router-dom"
import '../Styles/Components/Home-Nav.css';
import { useThemeMode } from '../Hooks/useThemeMode';
import { IoMdSettings } from "react-icons/io";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { useActivePage } from "../Hooks/useActivePage";

export const HomeNav = () => {
    const { mode, toggleTheme } = useThemeMode();
    const activePage = useActivePage();
    console.log(activePage);

    return (
        <div className="home-nav">
            <div></div>
            <div>
                <NavLink className={activePage === "dashboard" ? "active" : ""} to={"/dashboard"}><button>Dashboard</button></NavLink>
                <NavLink className={activePage === "companies" ? "active" : ""} to={"/companies"}><button>Companies</button></NavLink>
                <NavLink to={"/"}><button><img src="" /></button></NavLink>
                <NavLink className={activePage === "market" ? "active" : ""} to={"/market"}><button>Market</button></NavLink>
                <NavLink className={activePage === "news" ? "active" : ""} to={"/news"}><button>News</button></NavLink>
            </div>
            <div>
                <div className='settings'>
                    <button><IoMdSettings /></button>
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