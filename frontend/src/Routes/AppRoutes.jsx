import { Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Landing-Pages/Home';
import { Signin } from '../Pages/Landing-Pages/Signin';
import { Signout } from '../Pages/Landing-Pages/Signout';
import { Signup } from '../Pages/Landing-Pages/Signup';
import { Dashboard } from '../Pages/Main-Pages/Dashboard';
import { Layout } from './Layout';
import { Company_Overview } from '../Pages/Main-Pages/Company_Overview';
import { Financials } from '../Pages/Main-Pages/Financials';
import { Ratio_Analysis } from '../Pages/Main-Pages/Ratio_Analysis';
import { Valuation_Modeling } from '../Pages/Main-Pages/Valuation_Modeling';
import { Peer_Comparison } from '../Pages/Main-Pages/Peer_Comparison';
import { Forecasting } from '../Pages/Main-Pages/Forecasting';
import { Reports_Downloads } from '../Pages/Main-Pages/Reports_Downloads';
import { ChatAI } from '../Pages/Main-Pages/ChatAI';

export const AppRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signout" element={<Signout />} />
                <Route path="/chat_ai" element={<ChatAI />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/company-overview" element={<Company_Overview />} />
                <Route path="/financials" element={<Financials />} />
                <Route path="/ratio-analysis" element={<Ratio_Analysis />} />
                <Route path="/valuation-modeling" element={<Valuation_Modeling />} />
                <Route path="/peer-comparison" element={<Peer_Comparison />} />
                <Route path="/forecasting" element={<Forecasting />} />
                <Route path="/reports-downloads" element={<Reports_Downloads />} />
            </Routes>
        </Layout>
    );
};
