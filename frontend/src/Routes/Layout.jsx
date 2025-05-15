import { useLocation } from 'react-router-dom';
import { HomeNav } from '../Components/Home-Nav';
import { MainNav } from '../Components/Main-Nav';

export const Layout = ({ children }) => {
    const location = useLocation();
    const homePaths = ['/', '/signin', '/signup', '/signout'];
    const isHomeRoute = homePaths.includes(location.pathname);
    console.log(isHomeRoute)
    return (
        <>
            {isHomeRoute ? <HomeNav /> : <MainNav />}
            {children}
        </>
    );
};
