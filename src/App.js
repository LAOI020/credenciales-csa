import React from 'react';
import { AppProvider } from './AppContext';
import { AppRouter } from './routers/AppRouter';


export const App = () => {
    return (
        <AppProvider>
            <AppRouter/>
        </AppProvider>
    )
}
