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

    console.log(investorInfo)
    useEffect(() => {
        if (location.pathname.endsWith("/investor-info")) {
            navigate('dividend');
            return;
        }
        if (!types.includes(type)) {
            const newUrl = location.pathname.split("/");
            newUrl.pop();
            navigate(`${newUrl.join("/")}/dividend`, { replace: true });
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
                <iframe
                    src={`https://drive.google.com/file/d/${investorInfo[type]}/view`}
                    width="640"
                    height="480"
                    allow="autoplay"
                    title="Google Drive File"
                />
            </div>
        </div>
    )
}