import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { ImQrcode } from 'react-icons/im';
import { VscDiscard } from 'react-icons/vsc';
import firebase from '../database/config';
import { getDateTimeZone } from '../helpers/getDateTimeZone';
import csa from '../styles/CSA.jpg';


export const CardFront = ({flipCard, values, availableQR}) => {

    const imageUser = localStorage.getItem('userImage');

    const [validityDate, setValidityDate] = useState(null);

    const [showQR, setShowQR] = useState(false);
    
    useEffect(() => {
        
        async function getCurrentDate(){

            const [dateComplete] = 
                await getDateTimeZone();
            
            setValidityDate(dateComplete);
        }

        getCurrentDate();

    }, []);

    const {
        firstName,
        lastName,
        job,
        
    } = values;

    return (
        <div className='credential-container'>        
            <div className='container-departmentName'>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className='container-mainInformation'>
                <h5>GRUPO GRASTRONOMICO LA POSTA</h5>

                <img
                    src={csa}
                    alt=''
                />

                <div style={{
                    background: `url(${imageUser}) no-repeat`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center'
                }}></div>

                <h2>{firstName}</h2>

                <h3>{lastName}</h3>

                <h4 className='job-text'>
                    {job}
                </h4>

                <h5 className='validity-date'>
                    {`VIGENCIA : ${validityDate}`}
                </h5>

                {availableQR ?
                    <ImQrcode
                        size='3.5rem'
                        onClick={() => setShowQR(true)}
                        style={{
                            marginTop: '2.5rem'
                        }}
                    />
                    :
                    <h6>QR no disponible</h6>
                }

                <VscDiscard
                    className='iconFlip'
                    size='2.2rem'
                    onClick={flipCard}
                />
            </div>

            {availableQR ? 
                showQR ?
                    <QRcontainer
                        exitContainer={() => setShowQR(false)}
                    />
                    :
                    null
                :
                null
            }
        </div>
    )
}


const QRcontainer = ({exitContainer}) => {

    const valueQR = window.location.href;

    const userID = window.location.pathname.substring(13, 33);

    const [qrValue, setQrValue] = useState(valueQR);
    
    const listenignClick = (e) => {
        let containerQR = document.getElementById('qr-img');

        if(
            containerQR !== e.target && 
            !containerQR.contains(e.target)
        ){    
            console.log('exit container');
            exitContainer();
        }
    }
    
    useEffect(() => {
        let qrBussinesCurrent = 'none';
        
        document.addEventListener('click', listenignClick);

        let listeningQR = firebase.firestore()
            .collection('App-credentials')
            .doc('bussines')
            .onSnapshot((docSnapshot) => {
                console.log('snapshot doc bussines');
                
                if(docSnapshot.data().QRCHOLULA !== 'none'){

                    if(
                        docSnapshot.data().QRCHOLULA !== 
                        qrBussinesCurrent
                    ){
                        qrBussinesCurrent = 
                            docSnapshot.data().QRCHOLULA;
    
                        if(qrBussinesCurrent.length === 56){
                            let extractUserID = 
                                qrBussinesCurrent.substring(18, 38);
    
                            if(extractUserID === userID){
                                setQrValue(qrBussinesCurrent);
                            }
                        }
                    }

                } else {
                    setQrValue(valueQR);
                }
            });

        return () => {
            listeningQR();
            document.removeEventListener('click', listenignClick);
        }
        
    }, [userID, listenignClick]);

    console.log(qrValue);

    return (
        <div className='qrCode-container'>
            <QRCode  
                id='qr-img'
                value={qrValue}
                size={200}
                level='M'
            />
        </div>
    )
}
