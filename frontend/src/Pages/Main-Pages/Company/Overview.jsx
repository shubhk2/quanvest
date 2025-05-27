import { useEffect } from 'react';
import '../../../Styles/Pages/Main-Pages/Overview.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOverviewDataFunc } from '../../../Redux/MainReducer/action';
import ReactMarkdown from 'react-markdown';

export const Overview = () => {
    const dispatcher = useDispatch();
    const data = useSelector(store => store.mainReducer.data);
    useEffect(() => {
        dispatcher(getOverviewDataFunc(13));
    }, [])
    return (
        <div>
            <p><b>Company Overview:</b></p>
            <ReactMarkdown>
                {data?.overview ? data.overview.overview_text : 'Loading...'}
            </ReactMarkdown>
        </div>
    )
}