import React from 'react';
import csa from '../styles/CSA.jpg';


export const ErrorContainer = ({error}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: window.innerHeight,
            width: '100%'
        }}>
            <img
                src={csa}
                alt=''
                height='25%'
                width={window.innerWidth < 1024 ? '90%' : '40%'}
            />

           <h3 style={{color: 'rgb(60,108,120'}}>
               {error}
            </h3>
        </div>
    )
}
