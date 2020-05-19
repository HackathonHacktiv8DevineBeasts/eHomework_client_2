import React, { useState } from 'react'
import { storage } from '../firebase/index'
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../store/actions";


const DetailContainer = () => {
    const dispatch = useDispatch()
    const task = useSelector(state => state.currentTask)
    console.log(task, '<<<<<<<<<')
    const [image, setImage] = useState({})
    const handleChange = e => {
    e.preventDefault()
    if (e.target.files[0]) {
        setImage(e.target.files[0])
    }
    }

    const handleSubmit = e => {
    e.preventDefault()
    if (image) {
        const upload = storage.ref(`/${image.name}`).put(image)
        upload.on('state_changed', (snapshot) => {}, (err) => { console.log(err) }, () => {
        storage.ref('/').child(image.name).getDownloadURL()
        .then(url => {
            let newTask = { ...task, url, status: true }
            dispatch(updateTask(newTask))
        })
        })
    }
    }
    return (
        <div style={{ flex: 3, height: '100%' }}> 
            <div className="shadow mb-4 rounded bg-light p-1">
                <h2>{task.taskName}</h2>
            </div>
            <div className="shadow mt-4 mb-4 rounded bg-light p-1 d-flex flex-column justify-content-start align-items-start" style={{ height: '79%' }}>
                <h2>Teacher: {task.emailTeacher}</h2>
                <h2>Description: {task.description}</h2>
                <h2>Score: {task.score}</h2>
                <h2>Status: {task.status === false ? 'Not Submitted' : 'Submitted'}</h2>
                { task.url === '-' ? <h2>Link: {task.url}</h2> : <a href={task.url} target="_blank" rel="noopener noreferrer" className='form-control btn-primary'>Link</a> }
            </div>
            { task.url === '-' ? <div className="shadow mt-4 rounded bg-light p-1 d-flex">
                <input type='file' className='form-control m-2' onChange={handleChange}></input>
                <button className='form-control btn-primary m-2' onClick={handleSubmit}>Submit</button>
            </div> : <></> }
            
        </div>
    )
}

export default DetailContainer