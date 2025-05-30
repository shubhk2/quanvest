import { useLocation } from 'react-router-dom';
import { HomeNav } from '../Components/Home-Nav';
import { MainNav } from '../Components/Main-Nav';
import { TabFoot } from '../Components/Tab-Foot';

export const Layout = ({ children }) => {
    const location = useLocation();
    const companyTabs = ['overview', 'financial', 'forecasting', 'investor-info'];
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const isCompanyPath = companyTabs.includes(lastSegment);
    return (
        <>
            <HomeNav />
            {isCompanyPath && <MainNav />}
            {children}
            {isCompanyPath && <TabFoot />}
        </>
    );
};