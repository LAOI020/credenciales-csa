
import { types } from './types';




export const appReducer = (state, action) => {
    switch (action.type) {
        case types.verifyUserLogin:
            return {
                ...state,
                isUserVerifyLogin: true
            }

        case types.getAllEmployeesDatabase:
            return {
                ...state,
                allEmployees: action.payload
            }

        case types.updateBussinesName:
            return {
                ...state,
                bussinesName: action.payload
            }

        case types.showContainerNewUser:
            return {
                ...state,
                showContainerNewUser: action.payload
            }

        case types.selectEmployee:
            return {
                ...state,
                employeeSelected: action.payload
            }

        case types.filterEmployeesDate:
            return {
                ...state,
                employeeSelected: null,
                employeesFilterDate: action.payload
            }

        case types.deleteEmployee:
            return {
                ...state,
                allEmployees: action.payload
            }

        case types.logOut:
            return {
                isUserVerifyLogin: null,
                bussinesName: null,
                showContainerNewUser: null,
                allEmployees: [],
                employeesFilterDate: [],
                employeeSelected: null
            }
                
        default:
            return state;
    }
}