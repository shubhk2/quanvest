import { useEffect, useMemo } from 'react';
import '../../../Styles/Pages/Main-Pages/Company/InvestorInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getInvertorInfoDataFunc } from '../../../Redux/MainReducer/action';
import { formatLabel } from '../../../Utils/utilities';

export const InvestorInfo = () => {
    const { compId, type } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { investorInfo } = useSelector(store => store.mainReducer);

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

    if (!types.includes(type)) return null;

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
                    investorInfo[type] &&
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
                }
            </div>
        </div>
    )
}