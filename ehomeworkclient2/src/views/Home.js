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
    const logout = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }} className="bg-light">
            <nav className="mb-5 navbar navbar-light bg-warning d-flex justify-content-between">
                <a className="navbar-brand" href="/">Welcome to Task Manager</a>
                <div>
                    <button onClick={logout} className="form-control btn-danger">Logout</button>
                </div>
            </nav>
            <div className='d-flex justify-content-center align-items-center'>
                <TaskPanel></TaskPanel>
                <DetailPanel></DetailPanel>
            </div>
        </div>
    )
}

export default Home