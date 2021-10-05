import React, { useEffect, useState } from 'react';
import { verifyCredentialData } from '../helpers/verifyCredentialData';
import { CardFront } from '../ui/CardFront';
import { CardReverse } from '../ui/CardReverse';
import { ErrorContainer } from '../ui/ErrorContainer';
import { LoadDataContainer } from '../ui/LoadDataContainer';


export const CredentialScreen = () => {

    const origin = 
        new URLSearchParams(window.location.search).get('origin');

    const [cardFlip, setCardFlip] = useState(false);

    const [availableQR, setAvailableQR] = useState(false);
    
    const [valuesUser, setValuesUser] = useState(null);

    const [erros, setErros] = useState(null);
    
    useEffect(() => {
        
        async function verify(){
            const [status, result] = await verifyCredentialData(
                window.location.pathname, origin
            );

            if(status === true){
                setValuesUser(result);

                setAvailableQR(true);

            } else if(status === false) {
                setValuesUser(result);

            } else if(status === null){
                setErros(result);
            }
        }
            
        verify();

    }, [origin]);

    return (
        erros ?
            <ErrorContainer error={erros}/>
            :
            !valuesUser ?
                <LoadDataContainer/>
                :
                <div 
                    style={{
                        perspective: '600px', 
                        overflow: 'hidden'
                    }}
                >
                    <div 
                        className='cardFlip-container'
                        style={{
                            transform: cardFlip ? 
                                'rotateY(-180deg)' : ''
                        }}
                    >
                        <div className='showFront'>
                            <CardFront 
                                flipCard={() => setCardFlip(true)}
                                values={valuesUser}
                                availableQR={availableQR}
                            />
                        </div>

                        <div className='showBack'>
                            <CardReverse
                                flipCard={() => setCardFlip(false)}
                                values={valuesUser}
                            />
                        </div>
            
                    </div>
                </div>
            
    )
}
