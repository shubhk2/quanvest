import { Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Landing-Pages/Home';
import { Signin } from '../Pages/Landing-Pages/Signin';
import { Signout } from '../Pages/Landing-Pages/Signout';
import { Signup } from '../Pages/Landing-Pages/Signup';
import { Dashboard } from '../Pages/Main-Pages/Dashboard';

export const HomeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}