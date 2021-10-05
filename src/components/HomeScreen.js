import React, { useContext, useEffect, useState } from 'react';
import QrReader from 'modern-react-qr-reader';
import Swal from 'sweetalert2';
import { AiFillCloseSquare, AiOutlineQrcode, AiOutlinePoweroff } from 'react-icons/ai';
import { generateUuidScanQR } from '../helpers/generateUuid';
import { addAssistanceDatabase } from '../helpers/addAssistanceDatabase';
import { HomeScreenOffices } from './HomeScreenOffices';
import { AppContext } from '../AppContext';
import { useHistory } from 'react-router';
import { verifyUser } from '../helpers/verifyUser';
import { types } from '../types';
import { LoadDataContainer } from '../ui/LoadDataContainer';


export const HomeScreen = () => {
    
    const history = useHistory();

    const {data, dispatch} = useContext(AppContext);

    useEffect(() => {

        if(!data.isUserVerifyLogin){

            if(localStorage.getItem('lgsdf')){
                verifyUser(history, dispatch);
            } else {
                history.replace('/login');
            }
        }

    }, [history, dispatch, data.isUserVerifyLogin]);
    
    console.log('home screen main');

    return (
        data.bussinesName === null ?
            <LoadDataContainer/>
            :
            data.bussinesName === 'OFFICES' ?
                <HomeScreenOffices/>
                :
                <ScreenQR/>
    )
}




const ScreenQR = () => {

    const history = useHistory();

    const {data, dispatch} = useContext(AppContext);

    const [showScanQR, setShowScanQR] = useState(false);

    const [valueScanQRuser, setValueScanQRuser] = useState(null);

    const [uuidQRscan, setUuidQRscan] = useState(null);

    const [attemptsCount, setAttemptsCount] = useState(0);

    const errorScanQR = (err) => {
        console.log('error scan qr');
        console.log(err);
    };

    const onScanQR = async (scannedData) => {
        if(attemptsCount > 5){
            console.log('demasiados intentos');
            
            setValueScanQRuser(null);
            
            setAttemptsCount(0);
            
            return;
        }

        if(scannedData){
            if(valueScanQRuser === null){
                console.log('primera escaneada');

                setValueScanQRuser(scannedData);
                
                let uuidQR = await generateUuidScanQR(
                    data.bussinesName, scannedData
                );

                if(uuidQR !== 'QR invalido'){
                    setUuidQRscan(uuidQR);
                } else {
                    console.log('qr invalido');
                }
            
            } else if(scannedData === valueScanQRuser){
                console.log('es el mismo codigo y no se ha actualizado');

                setAttemptsCount((value) => value + 1);

            } else if(scannedData === uuidQRscan){
                addAssistance();

            } else {
                console.log('ninguna de las anteriores');
                setAttemptsCount((value) => value + 1);
            }
        }
    };

    const addAssistance = async () => {

        const valueQR = valueScanQRuser;

        setShowScanQR(false);
        setUuidQRscan(null);
        setAttemptsCount(0);
        setValueScanQRuser(null);
        
        Swal.fire({
            icon: 'success',
            title: 'Listo',
        });

        clickPlayAudio();

        await addAssistanceDatabase(data.bussinesName, valueQR);
        
        Swal.close();

        setShowScanQR(true);
    }

    const closeScanQR = () => {

        setShowScanQR(false);
        setValueScanQRuser(null);
        setUuidQRscan(null);
        setAttemptsCount(0);
    }

    const clickPlayAudio = () => {
        const audio = 
            document.getElementById('audioConfirm');

        audio.play();
    }

    const logOut = () => {
        dispatch({ type: types.logOut });
        
        localStorage.clear();

        history.replace('/login');
    }

    return (
        <div className='scanQR-main-container'>
            
            <audio id='audioConfirm'>
                <source src={localStorage.getItem('soundConfirm')}/>
            </audio>

            {showScanQR ?
                <QrReader
                    delay={300}
                    facingMode={"environment"}
                    onError={errorScanQR}
                    onScan={onScanQR}
                    style={{ 
                        width: window.innerWidth > 1024 ? 
                            '45%' : '100%'
                    }}
                />
                :                
                <AiOutlineQrcode
                    className='icon-showScanner'
                    onClick={() => setShowScanQR(true)}
                />
            }

            {showScanQR &&
                <AiFillCloseSquare
                    className='icon-cancelScanner'
                    size='2.5rem'
                    onClick={closeScanQR}
                />
            }

            <AiOutlinePoweroff
                className='icon-logout'
                onClick={logOut}
            />
        </div>
    )
}
