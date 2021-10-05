import React, { useState } from 'react';
import { FiUserPlus, FiPower, FiMenu, FiXCircle } from 'react-icons/fi';


export const MenuFAT = ({newEmployee, logOut}) => {

    const [showIcons, setShowIcons] = useState(null);

    const clickAddEmployee = () => {
        newEmployee();

        setShowIcons(false);
    }

    return (
        <div className='menuFAT'>
            {showIcons && 
                <FiUserPlus
                    onClick={clickAddEmployee}
                />
            }
            
            {showIcons && 
                <FiPower
                    onClick={logOut}
                />
            }
            
            {showIcons ?
                <FiXCircle
                    onClick={() => setShowIcons(false)}
                />
                :
                <FiMenu
                    style={{marginBottom: '0px'}}
                    onClick={() => setShowIcons(true)}
                />
            }
        </div>
    )
}
