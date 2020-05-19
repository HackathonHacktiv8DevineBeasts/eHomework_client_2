import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from "../store/actions";
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
     
    useEffect(() => {
        if (localStorage.access_token) {
            history.push('/home')
        }
    })

    const handleChangeEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const handleChangePass = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }
    const handleLogin = (e) => {
        e.preventDefault()
        let data = {
            email,
            password
        }
        dispatch(login(data))
        .then(() => {
            history.push('/home')
        })
    }

    return (
        <div style={{ width: '410px', height: '410px', borderRadius: '10px' }} className="bg-warning d-flex flex-column justify-content-center align-items-center ">
            <h4>Login Student</h4>
            <form style={{ width: '70%' }}>
                <input onChange={handleChangeEmail} className='form-control my-2' type='text' placeholder='Input your username' value={email} required></input>
                <input onChange={handleChangePass} className='form-control my-2' type='password' placeholder='Input your password' value={password} required></input>
                <button onClick={handleLogin} className='form-control btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm