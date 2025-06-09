import '../../../Styles/Pages/Main-Pages/Company/Overview.css';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOverviewDataFunc, getOverviewGraphDataFunc } from '../../../Redux/MainReducer/action';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';

export const Overview = () => {
    const { compId } = useParams();
    const [fullOverview, setFullOverview] = useState(false);
    const { overview: { data: { overview, stats }, graph }, selectedCompany } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();
    const [graphPeriod, setGraphPeriod] = useState('10yr');
    const [graphType, setGraphType] = useState('price');
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
    useEffect(() => {
        overview && stats && dispatch(getOverviewGraphDataFunc(compId, graphType, graphPeriod));
    }, [graphPeriod, graphType, compId, overview, stats, dispatch]);
    return (
        <div className='overview-container'>
            <div className='overview'>
                <h2 className='overview-heading'>Company Overview</h2>
                <ReactMarkdown>{splitOverview(overview?.overview_text)}</ReactMarkdown>
                <button className='overview-show-more' onClick={() => setFullOverview(!fullOverview)}>{fullOverview ? 'Show Less' : 'Show More'}</button>
            </div>
            <div className='chart'>
                <div className='chart-controls'>
                    <div className='chart-periods'>
                        <button className={`chart-period-button ${graphPeriod === '1month' && 'active'}`} onClick={() => setGraphPeriod('1month')}>1 Mon</button>
                        <button className={`chart-period-button ${graphPeriod === '6month' && 'active'}`} onClick={() => setGraphPeriod('6month')}>6 Mon</button>
                        <button className={`chart-period-button ${graphPeriod === '1yr' && 'active'}`} onClick={() => setGraphPeriod('1yr')}>1 Yr</button>
                        <button className={`chart-period-button ${graphPeriod === '3yr' && 'active'}`} onClick={() => setGraphPeriod('3yr')}>3 Yr</button>
                        <button className={`chart-period-button ${graphPeriod === '5yr' && 'active'}`} onClick={() => setGraphPeriod('5yr')}>5 Yr</button>
                        <button className={`chart-period-button ${graphPeriod === '10yr' && 'active'}`} onClick={() => setGraphPeriod('10yr')}>10 Yr</button>
                    </div>
                    <select className='chart-type-select' onChange={(e) => setGraphType(e.target.value)} value={graphType}>
                        <option value={'price'}>Price</option>
                        <option value={'dma50'} title='50-Day Moving Average'>DMA50</option>
                        <option value={'dma200'} title='100-Day Moving Average'>DMA200</option>
                    </select>
                </div>
                <div className='chart-plot'>
                    <Plot
                        className='plot'
                        data={graph.data}
                        layout={{
                            ...graph.layout,
                            scrollZoom: true,
                            paper_bgcolor: 'transparent',
                            plot_bgcolor: 'transparent'
                        }}
                        config={{
                            displayModeBar: false,
                            scrollZoom: true,
                            responsive: true,
                        }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
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