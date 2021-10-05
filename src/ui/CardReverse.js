import React, { useState } from 'react';
import { VscDiscard } from 'react-icons/vsc';
import logos from '../styles/logos.jpg';


export const CardReverse = ({flipCard, values}) => {
    return (
        <div className='cardReverse-container'>
            
            <div 
                id='cardReverse-content'
                className='cardReverse-content' 
            >
                <InfoCompany
                    title='MISION'
                    info='Ofrecer a nuestros clientes experiencias satisfactorias en torno a la gastronomia, despertando en ellos emociones que impriman toques de distincion Con El Sazón del Agave, y que desborden en una sonrisa.'                    
                />

                <InfoCompany
                    title='VISION'
                    info='Ofrecer a nuestros clientes experiencias satisfactorias en torno a la gastronomia, despertando en ellos emociones que impriman toques de distincion Con El Sazón del Agave, y que desborden en una sonrisa.'
                    style={{color: 'rgb(205, 103, 9)'}}
                />

                <InfoCompany
                    title='VALORES'
                    info='Ofrecer a nuestros clientes experiencias satisfactorias en torno a la gastronomia, despertando en ellos emociones que impriman toques de distincion Con El Sazón del Agave, y que desborden en una sonrisa.'
                />

                <PersonalInformation values={values}/>

                <EmployeeInformation values={values}/>

                <div style={{height: '2rem'}}></div>
            </div>

            <img
                src={logos}
                alt=''
                height='16%'
                width='85%'
                style={{alignSelf: 'center'}}
            />

            <div className='cardReverse-borderClip6'></div>
            <div className='cardReverse-borderClip5'></div>
            <div className='cardReverse-borderClip4'></div>
            <div className='cardReverse-borderClip3'></div>
            <div className='cardReverse-borderClip2'></div>
            <div className='cardReverse-borderClip1'></div>

            <VscDiscard
                className='cardReverse-iconFlip'
                size='2.2rem'
                onClick={flipCard}
            />
        </div>
    )
}


const InfoCompany = ({title, info, style}) => {
    return (
        <div className='cardReverse-flexRow-container'>
            <div>
                <h6 style={style}>
                    {title}
                </h6>
            </div>

            <p>{info}</p>
        </div>
    )
}

const PersonalInformation = ({values}) => {

    const {
        rfc,
        curp,
        numberImss,
        bloodType,
        allergies,
        emergencyNumber

    } = values;

    const [showInformation, setShowInformation] = 
        useState(false);

    const clickShowInformation = () => {
        setShowInformation((value) => !value);            
    }

    return (
        <div className='personalInformation-container'>
            <h3 onClick={clickShowInformation}>
                DATOS PERSONALES
            </h3>

            {showInformation &&
                <>
                <h5>RFC</h5>
                <h6>{rfc}</h6>

                <h5>CURP</h5>
                <h6>{curp}</h6>

                <h5>NUMERO IMSS</h5>
                <h6>{numberImss}</h6>

                <h5>TIPO DE SANGRE</h5>
                <h6>{bloodType}</h6>

                <h5>ALERGIAS</h5>
                <h6>{allergies}</h6>

                <h5>TELEFONO DE EMERGENCIA</h5>
                <h6>{emergencyNumber}</h6>
                </>
            }
        </div>
    )
}


const EmployeeInformation = ({values}) => {

    const {
        employeeNumber,
        holidays,
        entryDate

    } = values;

    const [showInformation, setShowInformation] = 
        useState(false);

    const clickShowInformation = () => {
        setShowInformation((value) => !value);
    };

    return (
        <div className='personalInformation-container'>
            <h3 onClick={clickShowInformation}>
                DATOS EMPLEADO
            </h3>

            {showInformation &&
                <>
                <h5>NUMERO EMPLEADO</h5>
                <h6>{employeeNumber}</h6>

                <h5>DIAS DE VACACIONES</h5>
                <h6>{holidays}</h6>

                <h5>FECHA INGRESO</h5>
                <h6>{entryDate}</h6>
                </>
            }
        </div>
    )
}
