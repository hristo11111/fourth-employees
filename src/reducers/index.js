import { combineReducers } from 'redux'

const getCustomerNames = (customers) => {
    return customers.map(customerData => {
        return `${customerData.first_name} ${customerData.surname}`
    })
}

const enrichEmplData = (customers) => {
    return customers.map(customerData => {
        customerData.names = `${customerData.first_name} ${customerData.surname}`
        return customerData
    })
}

const getEmployeesReducer = (state = [], action) => {
    const nextState = Object.assign({}, state)

    switch (action.type) {
        case 'GET_EMPLOYEES':
            nextState.employeesStorage = enrichEmplData(action.payload)
            nextState.employeesFullData = nextState.employeesStorage
            nextState.employeesNames = getCustomerNames(action.payload)

            return nextState
        case 'FILTER_TABLE':
            nextState.employeesFullData = nextState.employeesStorage.filter(customerData => customerData.names === action.payload)
            return nextState
        case 'RESET_EMPLOYES':
            nextState.employeesFullData = nextState.employeesStorage
            return nextState
        default:
            return state 
    }
}

export default combineReducers({
    employees: getEmployeesReducer
})