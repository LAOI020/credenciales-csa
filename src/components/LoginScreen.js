import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { loginUser, verifyUser } from '../helpers/verifyUser';
import csa from '../styles/CSA.jpg';


export const LoginScreen = () => {

    const history = useHistory();

    const {data, dispatch} = useContext(AppContext);
    
    const [valueCode, setValueCode] = useState('');
    
    useEffect(() => {

        if(!data.isUserVerifyLogin){
            console.log('va a database y checa usuario');
            if(localStorage.getItem('lgsdf')){
                verifyUser(history, dispatch, true);
            }
        }

    }, [history, dispatch, data.isUserVerifyLogin]);

    const changeInput = (e) => {
        setValueCode(e.target.value);
    };

    const clickButtonLogin = () => {
        loginUser(valueCode, history, dispatch);
    };

    return (
        <div className="loginScreen-container">
            <div>
                <img
                    src={csa}
                    alt='logo'
                />

                <h4>Iniciar Sesion</h4>

                <input
                    className='input-code-login'
                    id='code-input-login'
                    name='code-input-login'
                    type='password'
                    value={valueCode}
                    onChange={changeInput}
                />

                <button
                    className='btn-loginScreen'
                    onClick={clickButtonLogin}
                >
                    ENTRAR
                </button>
            </div>
        </div>
    )
}
