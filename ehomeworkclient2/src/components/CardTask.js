import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTask } from "../store/actions";

const CardTask = (props) => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const { taskName, status, description, _id } = props.data

    const handleCurrentTask = (id) => {
        let currentTask = tasks.filter(el => { return el._id === id })
        dispatch(setCurrentTask(currentTask[0]))
    }
    return (
        <div className="card m-2" style={{ width: '45%' }}>
            <div className="card-body">
                <h5 className="card-title">{taskName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{status === false ? 'Not Submitted' : 'Submitted' }</h6>
                <p className="card-text">{description}</p>
                <button className='form-control btn-primary' onClick={(e) => { e.preventDefault(); handleCurrentTask(_id) }}>Detail</button>
            </div>
        </div>
    )
}

export default CardTask