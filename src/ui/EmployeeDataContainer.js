import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';
import { AppContext } from '../AppContext';
import { deleteEmployee } from '../helpers/deleteEmployee';
import csa from '../styles/CSA.jpg';


export const EmployeeDataContainer = () => {

    const {data, dispatch} = useContext(AppContext);

    const findEmployee = data.allEmployees.find(
        user => user.name === data.employeeSelected
    );

    if(
        !findEmployee &&
        window.location.pathname === '/employeeInfo'
    ){
        return <Redirect to='/'/>
    }

    const {
        userID,
        name,
        numberPhone,
        curp,
        numberImss,
        bloodType,
        allergies,
        rfc,
        employeeNumber,
        holidays,
        entryDate,
        job,
        bussinesName

    } = findEmployee;

    const clickDeleteEmployee = () => {
        window.history.back();
        
        deleteEmployee(
            bussinesName, 
            userID, 
            data.allEmployees,
            dispatch
        );

        Swal.fire({
            icon: 'success',
            title: 'Listo',
            text: 'Usuario borrado'
        });
    }
    
    return (
        <div className='employeeData-container'>
            <div className='employeeData-card'>

                <div
                    className='employeeInfoPhoto' 
                >
                    <img src={csa} alt=''/>
                </div>

                <InfoContainer
                    title='UNIDAD'
                    text={bussinesName}
                />
                <InfoContainer
                    title=''
                    text={job}
                />
                <InfoContainer
                    title='NOMBRE'
                    text={name}
                />
                <InfoContainer
                    title='CELULAR'
                    text={numberPhone}
                />
                <InfoContainer
                    title='CURP'
                    text={curp}
                />
                <InfoContainer
                    title='NUMERO IMSS'
                    text={numberImss}
                />
                <InfoContainer
                    title='TIPO DE SANGRE'
                    text={bloodType}
                />
                <InfoContainer
                    title='ALERGIAS'
                    text={allergies}
                />
                <InfoContainer
                    title='RFC'
                    text={rfc}
                />


                <InfoContainer
                    title='FECHA INGRESO'
                    text={entryDate}
                />
                <InfoContainer
                    title='NUMERO EMPLEADO'
                    text={employeeNumber}
                />
                <InfoContainer
                    title='DIAS DE VACACIONES'
                    text={holidays}
                />
                
                <button 
                    onClick={clickDeleteEmployee}
                >
                    ELIMINAR
                </button>
            </div>
        </div>
    )
}


const InfoContainer = ({title, text}) => {
    return (
        <div>
            <h4>{title}</h4>
            <h4>{text}</h4>
        </div>
    )
}
