import React from 'react'
import DetailContainer from './DetailContainer'
import { useSelector } from "react-redux";

const DetailPanel = () => {
    const task = useSelector(state => state.currentTask)
    console.log(task)
    return (
        <div style={{ width: '50vw', height: '80vh' }} className='shadow p-3 m-2 bg-warning rounded d-flex justify-content-center align-items-center'>
           <DetailContainer></DetailContainer>
            {/* { task ? <DetailContainer></DetailContainer> : <h2>Please Choose Task</h2>} */}
        </div>
    )
}

export default DetailPanel