import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { CredentialScreen } from '../components/CredentialScreen';
import { HomeScreen } from '../components/HomeScreen';
import { LoginScreen } from '../components/LoginScreen';
import { EmployeeDataContainer } from '../ui/EmployeeDataContainer';


export const AppRouter = () => {
    
    useEffect(() => {

        let vh = window.innerHeight * 0.01;

        document.documentElement.style.setProperty(
            '--vh', `${vh}px`
        );
        
    }, []);

    console.log('app route');
    return (
        <Router>        
            <div>
                <Switch>
                    <Route
                        exact
                        path='/credentials/:id'
                        component={CredentialScreen}
                    />

                    <Route
                        exact
                        path='/login'
                        component={LoginScreen}
                    />

                    <Route
                        exact
                        path='/'
                        component={HomeScreen}
                    />

                    <Route
                        exact
                        path='/employeeInfo'
                        component={EmployeeDataContainer}
                    />

                    <Redirect to='/login' />
                </Switch>
            </div>
        </Router>
    )
};