import axios from 'axios'

export const SET_CURRENT_TASK = 'SET_CURRENT_TASK'
export const SET_TASKS = 'SET_TASKS'
export const SET_EMAIL = 'SET_EMAIL'

export const setCurrentTask = (data) => {
    return { type: SET_CURRENT_TASK, payload: data }
}

export const setEmail = (data) => {
        return { type: SET_EMAIL, payload: data }
}

export const setTask = (data) => {
    return { type: SET_TASKS, payload: data }
}

export const fetchTasks = (email) => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: `https://ehomework-server.herokuapp.com/task/email/${email}`,
            headers: {
                token: localStorage.access_token
            }
        })
        .then(result => {
            console.log(result.data.result)
            dispatch(setTask(result.data.result))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateTask = (data) => {
    console.log(data)
    let updateData = { ...data }
    delete updateData._id
    return (dispatch) => {
        axios({
            method: 'PUT',
            url: `https://ehomework-server.herokuapp.com/task/edit/${data._id}`,
            data: updateData,
            headers: {
                token: localStorage.access_token
            }
        })
        .then(result => {
            console.log(result.data.result)
            dispatch(fetchTasks(data.emailStudent))
            dispatch(setCurrentTask(''))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const login = (data) => {
    console.log(data)
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: 'https://ehomework-server.herokuapp.com/login/student',
                data
            })
            .then(result => {
                console.log(result.data)
                // dispatch(setEmail(result.data.email))
                localStorage.access_token = result.data.token
                localStorage.email = result.data.email
                resolve(result.data)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })
    }
}