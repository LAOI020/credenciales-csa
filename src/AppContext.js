
import React, { createContext, useReducer } from "react";
import { appReducer } from "./appReducer";


export const AppContext = createContext();

const initialState = {
    isUserVerifyLogin: null,
    bussinesName: null,
    showContainerNewUser: null,
    allEmployees: [],
    employeesFilterDate: [],
    employeeSelected: null
};


export const AppProvider = ({children}) => {

    const [data, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{data, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}
