import '../../../Styles/Pages/Main-Pages/Overview.css';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTab, getOverviewDataFunc, setActiveTab } from '../../../Redux/MainReducer/action';
import { useParams } from 'react-router-dom';

export const Overview = () => {
    const { compId } = useParams();
    const { userTabs, data } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOverviewDataFunc(compId))
            .then(() => {
                console.log("Overview data loaded");
            })
            .catch((err) => {
                console.error("Error loading overview data", err);
            });
        if (userTabs[compId]) {
            dispatch(setActiveTab(userTabs[compId]));
        }
        else {
            dispatch(createTab(userTabs[compId]));
            dispatch(setActiveTab(userTabs[compId]));
        }
    }, [compId, dispatch])
    return (
        <div className='overview'>
            <p><b>Company Overview:</b></p>
            <ReactMarkdown>
                {data?.overview ? data.overview.overview_text : 'Loading...'}
            </ReactMarkdown>
        </div>
    )
}