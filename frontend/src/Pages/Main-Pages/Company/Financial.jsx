import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../../Styles/Pages/Main-Pages/Company/Financial.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getFinancialDataFunc } from '../../../Redux/MainReducer/action';
import { formatDateToShortMonthYear } from '../../../Utils/dateFormatter';

export const Financial = () => {
    const { compId, type } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { financial } = useSelector(store => store.mainReducer);

    const types = useMemo(() => [
        "balance_sheet",
        "cashflow",
        "profit_and_loss",
        "quarterly_results"
    ], []);

    useEffect(() => {
        if (!types.includes(type)) {
            const newUrl = location.pathname.split("/");
            newUrl.pop();
            navigate(`${newUrl.join("/")}/balance_sheet`, { replace: true });
            return;
        }
        dispatch(getFinancialDataFunc(compId, type));
    }, [type, types, compId, navigate, dispatch, location]);

    if (!types.includes(type)) return null;

    const formatData = () => {
        const { data } = financial[type];
        const formattedData = {};
        for (let i = 0; i < data.length; i++) {
            const currentItem = data[i];
            const param = currentItem.parameter;
            const formattedDate = formatDateToShortMonthYear(currentItem.report_date);
            if (!formattedData[param]) {
                formattedData[param] = [];
            }
            const formattedItem = formattedData[param];
            formattedItem.push(currentItem);
        }
        for (const param in formattedData) {
            formattedData[param].sort((a, b) => new Date(a.report_date) - new Date(b.report_date));
        }
        return formattedData;
    }
    const generateTableContent = () => {
        const formattedData = formatData();

        if (!formattedData || Object.keys(formattedData).length === 0) {
            return (
                <tbody>
                    <tr>
                        <td>No data available</td>
                    </tr>
                </tbody>
            );
        }

        // Step 1: Get all unique dates from all parameters
        const allDates = Array.from(
            new Set(
                Object.values(formattedData)
                    .flat()
                    .map(item => item.report_date)
            )
        ).sort((a, b) => new Date(a) - new Date(b));

        return (
            <>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        {allDates.map((date, index) => (
                            <th key={index}>{formatDateToShortMonthYear(date)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(formattedData).map(([parameter, records], rowIndex) => {
                        const valueMap = Object.fromEntries(
                            records.map(entry => [entry.report_date, entry.value])
                        );

                        return (
                            <tr key={rowIndex}>
                                <td>{parameter}</td>
                                {allDates.map((date, colIndex) => (
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
                <div className='tabs'>
                    {
                        types.map((item) => {
                            const label = item
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, c => c.toUpperCase());
                            return (
                                <NavLink key={item} tabIndex={-1} to={`/company/${compId}/financial/${item}`}>
                                    <button>
                                        {label}
                                    </button>
                                </NavLink>
                            );
                        })
                    }
                </div>
                <table className='table'>
                    {financial[type]?.data && generateTableContent()}
                </table>
            </div>
        </div>
    );
}
