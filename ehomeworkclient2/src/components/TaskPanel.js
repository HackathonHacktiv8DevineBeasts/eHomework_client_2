import React from 'react'
import CardTask from '../components/CardTask'
import { useSelector } from "react-redux";

const TaskPanel = () => {
    const tasks = useSelector(state => state.tasks)
    return (
        <div style={{ width: '50vw', height: '80vh', overflowY: 'scroll' }} className='shadow p-2 m-2 bg-warning rounded d-flex flex-wrap flex-row justify-content-center align-items-start'>
            {tasks.map(el => { return <CardTask key={el._id} data={el}></CardTask> })}
        </div>
    )
}

export default TaskPanel