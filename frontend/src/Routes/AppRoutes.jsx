import { Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Landing-Pages/Home';
import { Signin } from '../Pages/Landing-Pages/Signin';
import { Signout } from '../Pages/Landing-Pages/Signout';
import { Signup } from '../Pages/Landing-Pages/Signup';
import { Dashboard } from '../Pages/Main-Pages/Dashboard';
import { Layout } from './Layout';
import { Overview } from '../Pages/Main-Pages/Company/Overview';
import { Financial } from '../Pages/Main-Pages/Company/Financial';
import { RatioAnalysis } from '../Pages/Main-Pages/RatioAnalysis';
import { ValuationModeling } from '../Pages/Main-Pages/ValuationModeling';
import { PeerComparison } from '../Pages/Main-Pages/PeerComparison';
import { Forecasting } from '../Pages/Main-Pages/Company/Forecasting';
import { ReportsDownloads } from '../Pages/Main-Pages/ReportsDownloads';
import { ChatAI } from '../Pages/Main-Pages/ChatAI';
import { InvestorInfo } from '../Pages/Main-Pages/Company/InvestorInfo';
import { Company } from '../Pages/Main-Pages/Company';

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
                <Route path="/company" element={<Company />} >
                    <Route path=":compId/overview" element={<Overview />} />
                    <Route path=":compId/financial" element={<Financial />} />
                    <Route path=":compId/forecasting" element={<Forecasting />} />
                    <Route path=":compId/investor-info" element={<InvestorInfo />} />
                </Route>
                <Route path="/ratio-analysis" element={<RatioAnalysis />} />
                <Route path="/valuation-modeling" element={<ValuationModeling />} />
                <Route path="/peer-comparison" element={<PeerComparison />} />
                <Route path="/reports-downloads" element={<ReportsDownloads />} />
            </Routes>
        </Layout>
    );
};
