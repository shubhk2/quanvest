import '../../../Styles/Pages/Main-Pages/Company/Overview.css';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOverviewDataFunc } from '../../../Redux/MainReducer/action';
import { useParams } from 'react-router-dom';

export const Overview = () => {
    const { compId } = useParams();
    const [fullOverview, setFullOverview] = useState(false);
    const { data: { overview, stats }, selectedCompany } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();
    const processStatsData = (key, statCategory) => {
        if (!stats[key]) {
            return;
        }
        const { columns, values } = stats[key];
        if (!values || !columns) {
            return;
        }
        return (
            <>
                <h3 className='stat-category'>{statCategory}</h3>
                {
                    values.map(value => {
                        return (
                            <div className='stat-item' key={value}>
                                <span className='item-name'>{value[0]}</span>
                                <span className='item-value'>{value[1]} {value[2]}</span>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    const splitOverview = (text = '') => {
        const cleaned = text.replace(new RegExp(`^For company ${selectedCompany.companyName} Company Overview Hide\\s*\\n*\\s*`, 'i'), '');
        const [intro = '', ...rest] = cleaned.split(/\n{2,}/);
        return intro.trim() + (fullOverview ? '\n\n' + rest.join('\n\n') : '');
    };
    useEffect(() => {
        dispatch(getOverviewDataFunc(compId))
    }, [compId, dispatch])
    return (
        <div className='overview-container'>
            <div className='overview'>
                <h2 className='overview-heading'>Company Overview</h2>
                <ReactMarkdown>{splitOverview(overview?.overview_text)}</ReactMarkdown>
                <button className='overview-show-more' onClick={() => setFullOverview(!fullOverview)}>{fullOverview ? 'Show Less' : 'Show More'}</button>
            </div>
            <div className='chart'>

            </div>
            <div className='statistics'>
                <h2 className='stats-heading'>Company Statistics</h2>
                <div className="profile">{stats && processStatsData("profile_metrics", 'Profile')}</div>
                <div className="margins">{stats && processStatsData("margins_metrics", 'Margins')}</div>
                <div className="returns-5yr">{stats && processStatsData("returns_5yr_avg_metrics", 'Returns (5Yr Avg)')}</div>
                <div className="valuation-ttm">{stats && processStatsData("valuation_ttm_metrics", 'Valuation (TTM)')}</div>
                <div className="valuation-ntm">{stats && processStatsData("valuation_ntm_metrics", 'Valuation (NTM)')}</div>
                <div className="financial-health">{stats && processStatsData("financial_health_metrics", 'Financial Health')}</div>
                <div className="growth">{stats && processStatsData("growth_cagr_metrics", 'Growth (CAGR)')}</div>
            </div>
        </div>
    )
}