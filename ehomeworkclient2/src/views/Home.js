import React, { useEffect } from 'react'
import DetailPanel from '../components/DetailPanel'
import TaskPanel from '../components/TaskPanel'
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setEmail } from "../store/actions";
import { useHistory } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const email = useSelector(state => state.email)
    useEffect(() => {
        if (localStorage.access_token) {
            dispatch(setEmail(localStorage.email))
            if (email !== '') {
                dispatch(fetchTasks(email))
            }
        } else {
            history.push('/')
        }
    }, [dispatch, email, history])

    return (
        <div style={{ width: '100vw', height: '100vh' }} className="bg-light">
            <h1 className='mb-5'>Welcome to TaskManager</h1>
            <div className='d-flex justify-content-center align-items-center'>
                <TaskPanel></TaskPanel>
                <DetailPanel></DetailPanel>
            </div>
        </div>
    )
}

export default Home