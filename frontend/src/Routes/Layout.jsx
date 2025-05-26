import { useLocation } from 'react-router-dom';
import { HomeNav } from '../Components/Home-Nav';
import { MainNav } from '../Components/Main-Nav';

export const Layout = ({ children }) => {
    const location = useLocation();
    const companyPath = ['/companies', '/companies/overview', '/companies/financials', '/companies/forecasting', '/companies/investor-info'];
    const isCompanyPath = companyPath.includes(location.pathname);
    return (
        <>
            <HomeNav />
            {isCompanyPath && <MainNav />}
            {children}
        </>
    );
};
