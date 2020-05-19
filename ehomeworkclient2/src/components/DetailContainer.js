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
        { !task ? <h2>Please Choose Your Task</h2> : <><div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h5 style={{ flex: 2 }}>This is Question Link</h5>
                    <a href={task.viewURL} style={{ flex: 1 }} target="_blank" rel="noopener noreferrer" className='form-control btn-primary'>See Question</a>
                </div>
            </div>
            <div className="shadow mt-4 mb-4 rounded bg-light p-4 d-flex flex-column justify-content-start align-items-start" style={{ height: '75%' }}>
                <label htmlFor="teacher">Teacher:</label>
                <input value={task.emailTeacher} id="teacher" className="form-control" disabled></input>
                <label htmlFor="description">Description:</label>
                <textarea value={task.description} id="description" className="form-control" disabled></textarea>                
                <label htmlFor="Score">Score:</label>
                <textarea value={task.score} id="Score" className="form-control" disabled></textarea>
                <label htmlFor="status">Status:</label>
                <textarea value={task.status === false ? 'Not Submitted' : 'Submitted'} id="status" className="form-control" disabled></textarea>
                { task.url === '-' ? 
                <>
                    <label className="mt-3" htmlFor="link">Your Assignment:</label>
                    <input value={task.url} id="link" className="mb-1 form-control" disabled></input>
                </> : <a href={task.url} target="_blank" rel="noopener noreferrer" className='mt-3 form-control btn-primary'>Your Assignment</a> }
            </div>
            { task.url === '-' ? <div className="shadow rounded mb-4 bg-light p-1 d-flex">
                <input type='file' className='form-control m-2' onChange={handleChange}></input>
                <button className='form-control btn-primary m-2' onClick={handleSubmit}>Submit</button>
            </div> : <></> }
            </> }
            
        </div>
    )
}

export default DetailContainer