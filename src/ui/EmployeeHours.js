
import React, { memo } from 'react';
import { FaUserAlt } from 'react-icons/fa';


export const EmployeeHours = memo(({
    employee, click, isSelected, showEmployeeInfo
}) => {

    console.log('employee container');

    const {employeeNumber, name, totalHours, allDates} = employee;

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div 
                className='employeeInfo-container'
                onClick={() => click(name)}
                style={{
                    backgroundColor: isSelected ?
                        'rgb(205, 103, 10)' : ''
                }}
            >
                <h4>{employeeNumber}</h4>
                <h4>{name}</h4>
                <h4>{totalHours}</h4>
            </div>

            {isSelected ?
                <>
                <div style={{height: '15px'}}></div>

                {window.innerWidth < 1024 ?
                    <FaUserAlt
                        className='icon-ShowUser'
                        onClick={showEmployeeInfo}
                    />
                    :
                    null
                }
                
                {allDates.map((infoDate,index) => (
                    <DatesDetails
                        key={`${infoDate}${index}`}
                        infoDate={infoDate}
                    />
                ))}

                <div style={{height: '35px'}}></div>
                </>
                :
                null
            }  
        </div>
    )
}, 
    (prevPros, nextPros) => {
        if(
            prevPros.employee.totalHours === nextPros.employee.totalHours &&
            prevPros.isSelected === nextPros.isSelected
        ){
            return true;
        } else {
            return false
        }
    });


const DatesDetails = ({infoDate}) => {

    const dayAndMonth = Object.keys(infoDate);

    const initHour = infoDate[dayAndMonth][0];

    const exitHour = infoDate[dayAndMonth][1];
    
    const totalHour = infoDate[dayAndMonth][2];

    return (
        <div className='detailsHours-container'>
            <h4>{dayAndMonth[0]}</h4>
            <h4>{initHour}</h4>
            <h4>{exitHour}</h4>
            <h4>{totalHour}</h4>
        </div>
    )
}
