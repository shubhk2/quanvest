import { Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Landing-Pages/Home';
import { Signin } from '../Pages/Landing-Pages/Signin';
import { Signout } from '../Pages/Landing-Pages/Signout';
import { Signup } from '../Pages/Landing-Pages/Signup';
import { Dashboard } from '../Pages/Main-Pages/Dashboard';
import { Layout } from './Layout';
import { Overview } from '../Pages/Main-Pages/Companies/Overview';
import { Financials } from '../Pages/Main-Pages/Companies/Financials';
import { RatioAnalysis } from '../Pages/Main-Pages/RatioAnalysis';
import { ValuationModeling } from '../Pages/Main-Pages/ValuationModeling';
import { PeerComparison } from '../Pages/Main-Pages/PeerComparison';
import { Forecasting } from '../Pages/Main-Pages/Companies/Forecasting';
import { ReportsDownloads } from '../Pages/Main-Pages/ReportsDownloads';
import { ChatAI } from '../Pages/Main-Pages/ChatAI';
import { InvestorInfo } from '../Pages/Main-Pages/Companies/InvestorInfo';
import { Companies } from '../Pages/Main-Pages/Companies';

export const AppRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signout" element={<Signout />} />
                <Route path="/chat-ai" element={<ChatAI />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/companies" element={<Companies />} >
                    <Route path="overview" element={<Overview />} />
                    <Route path="financials" element={<Financials />} />
                    <Route path="forecasting" element={<Forecasting />} />
                    <Route path="investor-info" element={<InvestorInfo />} />
                </Route>
                <Route path="/ratio-analysis" element={<RatioAnalysis />} />
                <Route path="/valuation-modeling" element={<ValuationModeling />} />
                <Route path="/peer-comparison" element={<PeerComparison />} />
                <Route path="/reports-downloads" element={<ReportsDownloads />} />
            </Routes>
        </Layout>
    );
};
