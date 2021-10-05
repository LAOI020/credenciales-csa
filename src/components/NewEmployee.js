
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { AppContext } from '../AppContext';
import { dataNewUser } from '../database/Info';
import { verifyDataNewUser } from '../helpers/verifyDataNewUser';
import { types } from '../types';


export const NewEmployee = () => {
    
    const {dispatch} = useContext(AppContext);
    
    const [showSweetAlert, setShowSweetAlert] = useState(null);

    const [imageNewEmployee, setImageNewEmployee] = 
        useState(null);

    const [bussinesName, setBussinesName] = useState('CHOLULA');

    const [inputValues, setInputValues] = useState({
        'newEmployee-name': '',
        'newEmployee-age': '',
        'newEmployee-numberPhone': '',
        'newEmployee-curp': '',
        'newEmployee-numberImss': '',
        'newEmployee-bloodType': '',
        'newEmployee-allergies': '',
        'newEmployee-rfc': '',
        'newEmployee-employeeNumber': '',
        'newEmployee-job': '',
        'newEmployee-holidays': '',
    });

    
    const listenignClick = (e) => {
        console.log('click event');
        let formContainer = document.getElementById(
            'newEmployeeForm-container'
        );

        if(
            formContainer !== e.target && 
            !formContainer.contains(e.target)
        ){   
            if(!showSweetAlert){
                dispatch({
                    type: types.showContainerNewUser,
                    payload: false
                });

            } else {
                setShowSweetAlert(false);
            }
        }
    };
    
    useEffect(() => {
        
        document.addEventListener('click', listenignClick);
        
        return () => {
            document.removeEventListener('click', listenignClick);
        }
        
    }, [listenignClick]);

    const keyPressEvent = (e) => {
        if(e.key === 'Enter'){
            const focusedElement = document.querySelector(':focus');

            const findIndex = dataNewUser.findIndex(
                value => value.inputID === focusedElement.id
            );

            const nextFocus = dataNewUser[findIndex + 1]?.inputID;

            if(nextFocus && document.getElementById(nextFocus)){
                document.getElementById(nextFocus).focus();
            
            } else if(document.activeElement instanceof HTMLElement){
                document.activeElement.blur();
            }
        }
    };

    const clickImageContainer = () => {
        document.getElementById('newEmployee-inputFile').click();
    };

    const changeInputFile = (e) => {
        if(e.target.files[0]){
            
            let reader = new FileReader();
    
            reader.readAsDataURL(e.target.files[0]);
    
            reader.onload = () => setImageNewEmployee(reader.result);
        }

    };

    const changeDropDown = (e) => {
        setBussinesName(e.target.value);
    };

    const changeInputText = (e) => {
        setInputValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    const clickButtonReady = () => {
        setShowSweetAlert(true);

        verifyDataNewUser(
            bussinesName, inputValues, imageNewEmployee, dispatch
        );
    };

    return (
        <div className='addNewEmployee-container'>
            <div 
                id='newEmployeeForm-container'
                className='form-NewEmployee'
                onKeyUp={keyPressEvent}
            >
                <ImageNewEmployeeContainer
                    click={clickImageContainer}
                    image={imageNewEmployee}
                />

                <input
                    id='newEmployee-inputFile'
                    type='file'
                    accept='image/png, image/jpg, image/jpeg'
                    style={{display: 'none'}}
                    onChange={changeInputFile}
                />

                <DropDown
                    value={bussinesName}
                    changeSelect={changeDropDown}
                />

                {dataNewUser.map(info => (
                    <DataEntryContainer
                        key={info.title}
                        title={info.title}
                        inputID={info.inputID}
                        valueInput={inputValues[info.inputID]}
                        changeInput={changeInputText}
                    />
                ))}

                <button onClick={clickButtonReady}>
                    LISTO
                </button>
            </div>
        </div>
    )
};



const DropDown = ({value, changeSelect}) => {
    return (
        <select
            className='dropdownBussines'
            name='type-bussines'
            value={value}
            onChange={changeSelect}
        >
            <option value="CHOLULA">CHOLULA</option>
            <option value="POSTA">POSTA</option>
            <option value="AMOR DE MIS AMORES">AMOR DE MIS AMORES</option>
        </select>
    )
};


const ImageNewEmployeeContainer = ({click, image}) => {
    return (
        image ?
            <div 
                className='newEmployee-image'
                onClick={click}
                style={{
                    backgroundColor: 'white',
                    backgroundImage: `url(${image})`,                       
                }}
            ></div>
            :
            <div 
                className='newEmployee-image'
                onClick={click}
                style={{backgroundColor: 'rgb(205, 103, 9)'}}
            >                       
                <FaUser
                    color='white'
                />
            </div>
    )
};


const DataEntryContainer = ({
    title, inputID, valueInput, changeInput
}) => {

    const [activeFocus, setActiveFocus] = useState(false);

    return (
        <div className='newEmployee-entryData'>
            <h4 style={{
                color: activeFocus ? 'orange' : 'white'
            }}>
                {title}
            </h4>

            <input
                id={inputID}
                name={inputID}
                autoComplete='off'
                value={valueInput}
                onChange={changeInput}
                onFocus={() => setActiveFocus(true)}
                onBlur={() => setActiveFocus(false)}
            />
        </div>
    )
};
