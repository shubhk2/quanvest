import '../../../Styles/Pages/Main-Pages/Company/Overview.css';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOverviewDataFunc } from '../../../Redux/MainReducer/action';
import { useParams } from 'react-router-dom';

export const Overview = () => {
    const { compId } = useParams();
    const { data } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOverviewDataFunc(compId))
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