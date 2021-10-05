import React from 'react';
import csa from '../styles/CSA.jpg';


export const LoadDataContainer = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: window.innerHeight,
            width: '100vw'
        }}>
            <div style={{
                display: 'flex',
                height: '25%', 
                width: window.innerWidth < 1024 ? '90%' : '40%'
            }}>
                <img
                    className='shimmer'
                    src={csa}
                    alt=''
                    style={{minHeight: '100%', minWidth: '100%'}}
                />
            </div>
        </div>
    )
}
