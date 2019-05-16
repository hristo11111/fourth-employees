import axios from 'axios'

export const getEmployees = () => {
    return async (dispatch) => {
        const response = await axios.get('https://fourth-js-interview-b392e.firebaseapp.com/employees', {
            headers: {
                Authorization: "fourth-js-interview-data"
            }
        })

        dispatch({ type: 'GET_EMPLOYEES', payload: response.data})
    }
}

export const filterEmployees = (names) => {
    return {
        payload: names,
        type: 'FILTER_TABLE'
    }
}

export const resetEmployees = () => {
    return {
        type: 'RESET_EMPLOYES'
    }
}