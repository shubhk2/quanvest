import '../Styles/Components/Main-Nav.css';
import { NavLink } from 'react-router-dom';
import { useActivePage } from '../Hooks/useActivePage';

export const MainNav = () => {
    const activePage = useActivePage();

    return (
        <div className="main-nav">
            <NavLink className={activePage === "overview" ? "active" : ""} to={"/companies/overview"}>
                <button>Overview</button>
            </NavLink>
            <NavLink className={activePage === "financials" ? "active" : ""} to={"/companies/financials"}>
                <button>Financials</button>
            </NavLink>
            <input type='text' value={"Some company"} />
            <NavLink className={activePage === "forecasting" ? "active" : ""} to={"/companies/forecasting"}>
                <button>Forecasting</button>
            </NavLink>
            <NavLink className={activePage === "investor-info" ? "active" : ""} to={"/companies/investor-info"}>
                <button>Investor Info</button>
            </NavLink>
        </div>
    )
}