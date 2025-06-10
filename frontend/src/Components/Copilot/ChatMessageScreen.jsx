import { useEffect } from "react"
import { useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown';
import { formatLabel, splitOverview } from "../../Utils/utilities";
import { PlotlyGraph } from "../PlotlyGraph";

export const ChatMessageScreen = ({ chatId }) => {
    const { history } = useSelector(state => state?.chatReducer?.chatHistoryMap[chatId] || []);

    const loadCompanyStats = (overviews) => {
        const header = ['Metrices'];
        const companyData = {};
        overviews.forEach(({ overview, stats }) => {
            if (overview && overview.overview_text) {
                const splittedOverview = splitOverview(overview.overview_text, false);
                header.push(splittedOverview.companyName);
                companyData[splittedOverview.companyName] = stats;
            }
        })
        const metricesFormattedData = {};
        for (let companyName in companyData) {
            const currentCompanyData = companyData[companyName];
            for (let metricType in currentCompanyData) {
                const currentMetricType = currentCompanyData[metricType];
                const formattedLabel = formatLabel(metricType);
                if (!metricesFormattedData[formattedLabel]) {
                    metricesFormattedData[formattedLabel] = {}
                }
                const formattedMetricData = metricesFormattedData[formattedLabel];
                for (let i = 0; i < currentMetricType?.values?.length; i++) {
                    const currentMetricData = currentMetricType.values[i];
                    const currentMetricName = currentMetricData[0];
                    const currentMetricValue = `${currentMetricData[1]} ${currentMetricData[2]}`;
                    if (!formattedMetricData[currentMetricName]) {
                        formattedMetricData[currentMetricName] = {
                            [companyName]: currentMetricValue
                        };
                    }
                    const formattedMetric = formattedMetricData[currentMetricName];
                    formattedMetric[companyName] = currentMetricValue;
                }
            }
        }
        let tables = '';
        for (let metric in metricesFormattedData) {
            const currentMetric = metricesFormattedData[metric];
            tables += `<h3>${metric}</h3>`;
            tables += `<table class="company-stats-table"><thead><tr>`;
            // eslint-disable-next-line no-loop-func
            header.forEach(head => {
                tables += `<th>${head}</th>`;
            });
            tables += `</tr></thead><tbody>`;
            for (let metricName in currentMetric) {
                const metricData = currentMetric[metricName];
                tables += `<tr>`;
                tables += `<td>${metricName}</td>`;
                for (let i = 1; i < header.length; i++) {
                    const key = header[i];
                    const value = metricData[key] !== undefined ? metricData[key] : '';
                    tables += `<td>${value}</td>`;
                }
                tables += `</tr>`;
            }
            tables += `</tbody></table>`;
        }
        return (tables && <div dangerouslySetInnerHTML={{ __html: tables }}></div>);
    }

    useEffect(() => {

    }, [chatId])
    return (
        <>
            {
                history && history.length > 0 &&
                history.map(({ query, response, timestamp }, i) => {
                    const graph = (response?.chart_data?.plotly_json && JSON.parse(response?.chart_data?.plotly_json)) || {};
                    return (
                        <div className="query-response-container" key={i}>
                            <div className="chat-timestamp">
                                {new Date(timestamp).toLocaleString()}
                            </div>
                            <div className="chat-query">
                                {query}
                            </div>
                            <div className="chat-response">
                                {
                                    response.company_overviews && response?.company_overviews?.length &&
                                    <div className="company-overviews">
                                        <h2>Company Overviews</h2>
                                        {
                                            response?.company_overviews.map(({ overview }, index) => {
                                                const splittedOverview = splitOverview(overview?.overview_text, false);
                                                return (
                                                    <div className="company-overview" key={index}>
                                                        <div>{splittedOverview.companyName}</div>
                                                        <ReactMarkdown>{splittedOverview?.overview || ''}</ReactMarkdown>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                }
                                {
                                    response?.llm_response && <div className="llm-response">
                                        <ReactMarkdown>{response.llm_response}</ReactMarkdown>
                                    </div>
                                }
                                {
                                    Object.keys(graph).length > 0 && <div className='chart-plot'>
                                        <PlotlyGraph graphData={graph} />
                                    </div>
                                }
                                {
                                    response.company_overviews && response?.company_overviews?.length &&
                                    <div className="company-stats">
                                        <h2>Company Stats</h2>
                                        {
                                            loadCompanyStats(response?.company_overviews)
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}