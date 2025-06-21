import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../../Styles/Pages/Main-Pages/Company/Financial.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { getFinancialDataFunc } from '../../../Redux/MainReducer/action';
import { ParameterChart } from '../../../Components/ParameterChart';
import { formatLabel, getRandomBrightColor } from '../../../Utils/utilities';

export const Financial = () => {
    const { compId, type } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { financial } = useSelector(store => store.mainReducer);
    const [currentPageData, setCurrentPageData] = useState({});
    const [generatedColors, setGeneratedColors] = useState(new Set());
    const [selectedParams, setSelectedParams] = useState(new Map());

    const types = useMemo(() => [
        "balance_sheet",
        "cashflow",
        "profit_and_loss"
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
        type && financial[type] && setCurrentPageData(financial[type]);
    }, [financial])

    if (!types.includes(type)) return null;

    const handleRowToggle = (parameter, data) => {
        const color = getRandomBrightColor();
        if (generatedColors.has(color)) {
            handleRowToggle(parameter, data);
            return;
        } else {
            const newColorSet = new Set(generatedColors);
            setGeneratedColors(newColorSet);
        }
        setSelectedParams(prev => {
            const newMap = new Map(prev);
            if (newMap.has(parameter)) {
                newMap.delete(parameter);
            } else {
                newMap.set(parameter, [color, data]);
            }
            return newMap;
        });
    };
    console.log(selectedParams);

    return (
        <div className='financial-container'>
            <div className='body'>
                <div className="chart">
                    {selectedParams.size > 0 && (
                        <ParameterChart
                            selectedParams={selectedParams}
                            headers={currentPageData.headers}
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
                        {
                            currentPageData.data && currentPageData.data.length ?
                                <>
                                    <thead>
                                        <tr>
                                            {currentPageData?.headers?.map((date, index) => (
                                                <th key={index}>{date}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPageData?.data?.map((row, rowIndex) => {
                                            return (
                                                <tr key={rowIndex} onClick={() => handleRowToggle(row[currentPageData?.headers[0]], row)}>
                                                    {
                                                        currentPageData?.headers?.map((head, headIndex) => {
                                                            if (headIndex === 0 && head === "Account") {
                                                                return (
                                                                    <td key={headIndex}>
                                                                        <input className="table-row-checkbox" type="checkbox" style={{ '--checkbox-color': selectedParams.has(row[head]) && selectedParams.get(row[head])[0] }} checked={selectedParams.has(row[head])} readOnly /> {row[head]}
                                                                    </td>
                                                                )
                                                            } else {
                                                                return (
                                                                    <td key={headIndex}>{row[head] ?? '-'}</td>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </>
                                :
                                <tbody>
                                    <tr>
                                        <td>No data available</td>
                                    </tr>
                                </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};