import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../../Styles/Pages/Main-Pages/Company/Financial.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { getFinancialDataFunc } from '../../../Redux/MainReducer/action';
import { ParameterChart } from '../../../Components/ParameterChart';
import { formatDateToShortMonthYear, formatLabel, getRandomBrightColor } from '../../../Utils/utilities';

export const Financial = () => {
    const { compId, type } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { financial } = useSelector(store => store.mainReducer);

    const [selectedParams, setSelectedParams] = useState(new Set());
    const [allDatesForChart, setAllDatesForChart] = useState([]);
    const [globalFormattedData, setGlobalFormattedData] = useState({});

    const types = useMemo(() => [
        "balance_sheet",
        "cashflow",
        "profit_and_loss",
        "quarterly_results"
    ], []);

    useEffect(() => {
        if (location.pathname.endsWith("/financial")) {
            navigate('balance_sheet');
            return;
        }
        if (!types.includes(type)) {
            const newUrl = location.pathname.split("/");
            newUrl.pop();
            navigate(`${newUrl.join("/")}/balance_sheet`, { replace: true });
            return;
        }
        dispatch(getFinancialDataFunc(compId, type));
    }, [type, types, compId, navigate, dispatch, location]);

    useEffect(() => {
        if (!financial[type]?.data) return;

        const { formattedData, allDates } = prepareFinancialData(financial[type].data);
        setGlobalFormattedData(formattedData);
        setAllDatesForChart(allDates);
    }, [financial, type]);

    if (!types.includes(type)) return null;

    const handleRowToggle = (parameter) => {
        setSelectedParams(prev => {
            const newSet = new Set(prev);
            if (newSet.has(parameter)) {
                newSet.delete(parameter);
            } else {
                newSet.add(parameter);
            }
            return newSet;
        });
    };

    const prepareFinancialData = (data) => {
        const groupedData = {};
        const dateSet = new Set();
        for (const item of data) {
            const { parameter, report_date, value } = item;
            if (!groupedData[parameter]) {
                groupedData[parameter] = {
                    color: getRandomBrightColor(),
                    records: []
                };
            }
            groupedData[parameter].records.push({ report_date, value });
            dateSet.add(report_date);
        }
        for (const param in groupedData) {
            groupedData[param].records.sort((a, b) => new Date(a.report_date) - new Date(b.report_date));
        }
        const allDates = Array.from(dateSet).sort((a, b) => new Date(a) - new Date(b));
        return { formattedData: groupedData, allDates };
    };

    const generateTableContent = () => {
        if (!globalFormattedData || Object.keys(globalFormattedData).length === 0) {
            return (
                <tbody>
                    <tr>
                        <td>No data available</td>
                    </tr>
                </tbody>
            );
        }

        return (
            <>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        {allDatesForChart.map((date, index) => (
                            <th key={index}>{formatDateToShortMonthYear(date)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(globalFormattedData).map(([parameter, { records, color }], rowIndex) => {
                        const valueMap = Object.fromEntries(records.map(entry => [entry.report_date, entry.value]));
                        const parameterValue = type + "|-|" + parameter;
                        const isChecked = selectedParams.has(parameterValue);

                        return (
                            <tr key={rowIndex} onClick={() => handleRowToggle(parameterValue)}>
                                <td>
                                    <input className="table-row-checkbox" type="checkbox" style={{ '--checkbox-color': color }} checked={isChecked} readOnly /> {parameter}
                                </td>
                                {allDatesForChart.map((date, colIndex) => (
                                    <td key={colIndex}>{valueMap[date] ?? '-'}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </>
        );
    };

    return (
        <div className='financial-container'>
            <div className='body'>
                <div className="chart">
                    {selectedParams.size > 0 && (
                        <ParameterChart
                            selectedParams={selectedParams}
                            allDates={allDatesForChart}
                            formattedData={globalFormattedData}
                        />
                    )}
                </div>
                <div className='tabs'>
                    {types.map((item) => (
                        <NavLink key={item} tabIndex={-1} to={`/company/${compId}/financial/${item}`}>
                            <button className='button-secondary'>{formatLabel(item)}</button>
                        </NavLink>
                    ))}
                </div>
                <div className='table-container'>
                    <table className='table'>
                        {generateTableContent()}
                    </table>
                </div>
            </div>
        </div>
    );
};