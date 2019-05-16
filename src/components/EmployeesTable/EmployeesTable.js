import React from 'react'

import './employeesTable.scss'

const EmployeesTable = ({employees}) => {
    return <div className='table--wrapper'>
        <table>
            <thead>
                <tr>
                    <th>First name</th><th>Surname</th>
                </tr>
            </thead>
            <tbody>
                {employees && employees.map((employee) => {
                    return <tr key={employee.id}>
                        <td>{employee.first_name}</td> 
                        <td>{employee.surname}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default EmployeesTable