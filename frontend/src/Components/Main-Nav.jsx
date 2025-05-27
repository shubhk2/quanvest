import { useRef, useState } from 'react';
import '../Styles/Components/Main-Nav.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchCompanyFunc } from '../Redux/MainReducer/action';

export const MainNav = () => {
    const dispatcher = useDispatch();
    const { selectedCompany, searchedCompanies } = useSelector(state => state.mainReducer);
    const [search, setSearch] = useState(selectedCompany.full_name || '');
    const [searchFocused, setSearchFocused] = useState(false);
    const debounceTimeout = useRef(null);
    const handleCompanySearch = (event) => {
        const searchString = event.target.value;
        setSearch(searchString);
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            searchString.length >= 1 && dispatcher(searchCompanyFunc(searchString));
        }, 500);
    };
    return (
        <div className="main-nav">
            <NavLink tabIndex={-1} to={"/company/overview"}><button>Overview</button></NavLink>
            <NavLink tabIndex={-1} to={"/company/financial"}><button>Financial</button></NavLink>
            <input type='text' value={search} onChange={e => handleCompanySearch(e)} placeholder='Search For Company' onFocus={() => setSearchFocused(true)} onBlur={() => setTimeout(() => setSearchFocused(false), 150)} />
            {
                searchFocused && <div className="searched-companies-container">
                    {
                        searchedCompanies.length > 0 ?
                            <ul className="searched-companies">
                                {searchedCompanies.map((company) => (
                                    <li key={company.company_number}>
                                        <NavLink to={`/company/${company.company_number}`} onClick={() => setSearch('')}>
                                            {company.full_name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                            :
                            <div className="no-results">No results found</div>
                    }
                </div>
            }
            <NavLink tabIndex={-1} to={"/company/forecasting"}><button>Forecasting</button></NavLink>
            <NavLink tabIndex={-1} to={"/company/investor-info"}><button>Investor Info</button></NavLink>
        </div>
    )
}