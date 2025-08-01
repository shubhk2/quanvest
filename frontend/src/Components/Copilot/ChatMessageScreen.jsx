import ReactMarkdown from 'react-markdown';
import { PlotlyGraph } from "../PlotlyGraph";
import {useSelector} from "react-redux";

export const ChatMessageScreen = ({ chatId }) => {
    const { history } = useSelector(state => state?.chatReducer?.chatHistoryMap[chatId] || []);

    const renderLLMResponse = (llmResponse, ratiosData, financialData, shareholdingData) => {
    const responseArray = Array.isArray(llmResponse) ? llmResponse : [];
    return responseArray.map((segment, index) => {
        if (typeof segment === 'string') {
            return <ReactMarkdown key={index}>{segment}</ReactMarkdown>;
        } else if (segment.placeholder === '~COMPREHENSIVE_RATIOS_TABLE~' || segment.placeholder === '~RATIOS_TABLE~' && segment.type === 'table') {
            return (
                <div key={index} className="company-stats-table">
                    <h3>Comprehensive Ratios Table</h3>
                    <table>
                        <thead>
                            <tr>
                                {ratiosData.headers.map((header, i) => (
                                    <th key={i}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ratiosData.data.map((row, i) => (
                                <tr key={i}>
                                    {ratiosData.headers.map((header, j) => (
                                        <td key={j}>{row[header] || ''}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (segment.placeholder === '~FINANCIAL_DATA_TABLE~' || segment.placeholder === '~FINANCIAL_PARAMETERS_TABLE~' && segment.type === 'table') {
            return (
                <div key={index} className="company-stats-table">
                    <h3>Financial Table</h3>
                    <table>
                        <thead>
                            <tr>
                                {financialData.headers.map((header, i) => (
                                    <th key={i}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.data.map((row, i) => (
                                <tr key={i}>
                                    {ratiosData.headers.map((header, j) => (
                                        <td key={j}>{row[header] || ''}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (segment.placeholder === '~SHAREHOLDING_TABLE~' && segment.type === 'table') {
            return (
                <div key={index} className="shareholding-data-table">
                    <h3>Shareholding Table</h3>
                    <table>
                        <thead>
                            <tr>
                                {shareholdingData.headers.map((header, i) => (
                                    <th key={i}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {shareholdingData.data.map((row, i) => (
                                <tr key={i}>
                                    {shareholdingData.headers.map((header, j) => (
                                        <td key={j}>{row[header] || ''}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        return null;
    });
};

    return (
        <>
            {history && history.length > 0 &&
                history.map(({ query, response, timestamp }, i) => {
                    const graph = (response?.chart_data?.plotly_json && JSON.parse(response?.chart_data?.plotly_json)) || {};
                    const llmResponse = response?.llm_response || [];
                    const ratiosData = response?.ratios_data?.filtered?.[0] || {};
                    const financialsData = response?.financial_data.balance?.[0] || {};
                    const shareholdingData = response?.shareholding_data?.[0] || {};
                    console.log(llmResponse);

                    return (
                        <div className="query-response-container" key={i}>
                            <div className="chat-timestamp">
                                {new Date(timestamp).toLocaleString()}
                            </div>
                            <div className="chat-query">
                                {query}
                            </div>
                            <div className="chat-response">
                                {renderLLMResponse(llmResponse, ratiosData, financialsData, shareholdingData)}
                                {Object.keys(graph).length > 0 && (
                                    <div className="chart-plot">
                                        <PlotlyGraph graphData={graph} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};