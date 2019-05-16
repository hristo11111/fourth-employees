import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { getEmployees, filterEmployees, resetEmployees } from '../actions'
import { bindActionCreators } from 'redux'
import EmployeesTable from './EmployeesTable/EmployeesTable'

import './app.scss'

const App = (props) => {
    const [text, onInputChange] = useState('')
    const [suggestions, changeSuggestions] = useState([])
    
    useEffect(() => {
        props.actions.getEmployees()
    }, [props.actions])


    const renderSuggestions = () => {
        return (
            suggestions.length > 0 && 
            <div className='employees--suggestions'>{suggestions.map((suggestion, index) => 
                <div className='employees--suggestions-item' key={index} onClick={() => suggestionClicked(suggestion)}>
                    {suggestion}
                </div>)}
            </div>
        )
    }

    const suggestionClicked = (names) => {
        props.actions.filterEmployees(names)
        onInputChange(names)
        changeSuggestions([])
    }

    const onTextChanged = (value) => {
        onInputChange(value)

        if (value) {
            const regexp = new RegExp(value, 'i')
            const suggestedNames = props.employees && 
                props.employees.employeesNames && 
                props.employees.employeesNames.filter(name => regexp.test(name))
            changeSuggestions(suggestedNames)
        } else {
            changeSuggestions([])
            props.actions.resetEmployees()
        }
    }

    return (
        <div className='app-wrapper'>
            <div className='employees--info-wrapper'>
                <div className='employees--search-wrapper'>
                    <input className='employees--search-input' placeholder='Employee names' type='text' value={text} onChange={(e) => onTextChanged(e.target.value)}/>
                    {renderSuggestions()}
                </div>
                <EmployeesTable employees={props.employees.employeesFullData}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { employees: state.employees }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {
        getEmployees,
        filterEmployees,
        resetEmployees
    }
    return { actions: bindActionCreators(actions, dispatch) }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)