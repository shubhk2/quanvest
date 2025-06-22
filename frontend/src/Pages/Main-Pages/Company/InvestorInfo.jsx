import { useEffect, useMemo, useState } from 'react';
import '../../../Styles/Pages/Main-Pages/Company/InvestorInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getInvertorInfoDataFunc } from '../../../Redux/MainReducer/action';
import { formatLabel, shortifyDecimalValue } from '../../../Utils/utilities';

export const InvestorInfo = () => {
    const { compId, type } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, investorInfo } = useSelector(store => store.mainReducer);
    const [currentPageData, setCurrentPageData] = useState();

    const types = useMemo(() => [
        "dividend",
        "shareholding_pattern",
    ], []);

    useEffect(() => {
        if (location.pathname.endsWith("/investor-info")) {
            navigate('dividend');
            return;
        }
        if (!types.includes(type)) {
            const newUrl = location.pathname.split("/");
            newUrl.pop();
            navigate(`${newUrl.join("/")}/dividend`);
            return;
        }
        dispatch(getInvertorInfoDataFunc(compId, type));
    }, [type, types, compId, navigate, dispatch, location])
    useEffect(() => {
        setCurrentPageData(investorInfo[type]);
    }, [investorInfo])
    if (!types.includes(type)) return null;
    console.log(investorInfo[type])
    return (
        <div className="investor-info-container">
            <div className='body'>
                <div className='tabs'>
                    {types.map((item) => (
                        <NavLink key={item} tabIndex={-1} to={`/company/${compId}/investor-info/${item}`}>
                            <button className='button-secondary'>{formatLabel(item)}</button>
                        </NavLink>
                    ))}
                </div>
                {
                    type === "dividend" && investorInfo[type] ?
                        <div className="pdf-viewer-container">
                            <iframe title='PDF Viewer' src={`https://drive.google.com/file/d/${investorInfo[type]}/preview`} allow="autoplay"></iframe>
                            <a
                                href={`https://drive.google.com/uc?export=download&id=${investorInfo[type]}`}
                                download
                                className="download-button"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download File
                            </a>
                        </div>
                        :
                        <></>
                }
                {
                    type === "shareholding_pattern" && investorInfo[type] ?
                        <div className='table-container'>
                            <table className='table'>
                                {
                                    isLoading ?
                                        <tbody>
                                            <tr>
                                                <td>Getting Your Requested Data. Please Wait...</td>
                                            </tr>
                                        </tbody>
                                        :
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
                                                            <tr key={rowIndex}>
                                                                {
                                                                    currentPageData?.headers?.map((head, headIndex) => {
                                                                        return headIndex === 0 ?
                                                                            <td title={row[head]} key={headIndex}>{shortifyDecimalValue(row[head]) ?? '-'}</td>
                                                                            :
                                                                            <td key={headIndex}>{shortifyDecimalValue(row[head]) ?? '-'}</td>
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
                        :
                        <></>
                }
            </div>
        </div>
    )
}