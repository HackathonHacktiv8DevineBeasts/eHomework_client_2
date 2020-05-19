import { SET_CURRENT_TASK, SET_TASKS, SET_EMAIL } from "../actions";

const initialState = {
    email: '',
    tasks: [],
    currentTask: ''
}

const reducer = ( state = initialState, action ) => {
    const { type, payload } = action
    if (type === SET_CURRENT_TASK) {
        return { ...state, currentTask: payload }
    } else if (type === SET_TASKS) {
        return { ...state, tasks: payload }
    } else if (type === SET_EMAIL) {
        return { ...state, email: payload }
    }
    return state
}

export default reducer