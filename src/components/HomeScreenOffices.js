
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { FaSearch } from 'react-icons/fa';
import { EmployeeDataContainer } from '../ui/EmployeeDataContainer';
import { NewEmployee } from './NewEmployee';
import { types } from '../types';
import { AppContext } from '../AppContext';
import { EmployeeHours } from '../ui/EmployeeHours';
import { filterDateResults } from '../helpers/filterDateResults';
import { useHistory } from 'react-router';
import { MenuFAT } from '../ui/MenuFAT';

registerLocale('es', es);


export const HomeScreenOffices = () => {

    const history = useHistory();

    const {data, dispatch} = useContext(AppContext);

    const clickIconNewEmployee = () => {
        dispatch({
            type: types.showContainerNewUser,
            payload: true
        });
    };

    const logOut = () => {
        dispatch({ type: types.logOut });
        
        localStorage.clear();

        history.replace('/login');
    };

    console.log('home screen offices');
    return (
        <div className='screenOffices-main-container'>
            <AllEmployees/>

            {data.employeeSelected && window.innerWidth > 1024 ?
                <EmployeeDataContainer/>
                :
                null
            }

            <MenuFAT
                newEmployee={clickIconNewEmployee}
                logOut={logOut}
            />

            {data.showContainerNewUser ?
                <NewEmployee/>
                :
                null
            }
        </div>
    )
}


const AllEmployees = () => {

    const history = useHistory();
    
    const {data, dispatch} = useContext(AppContext);

    const [searchValue, setSearchValue] = useState('');

    const changeInputSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const filterDate = (minDate, maxDate) => {
        const resultFilter = 
            filterDateResults(minDate, maxDate, data.allEmployees);
        
        setSearchValue('');

        if(resultFilter.length > 0){
            dispatch({
                type: types.filterEmployeesDate,
                payload: resultFilter
            });

        } else {
            Swal.fire({
                icon: 'info',
                title: '!Hey¡',
                text: 'No hay resultados para ese rango'
            });
        }
        
    }

    const clickEmployee = (value) => {
        dispatch({
            type: types.selectEmployee,
            payload: data.employeeSelected === value ? 
                null : value
        });
    };
    
    const usersFilters = data.employeesFilterDate.length > 0 ?
        data.employeesFilterDate.filter(
            user => user.name.toUpperCase()
                        .includes(searchValue.toUpperCase().trim())
                    ||
                    user.employeeNumber.includes(searchValue.trim())
        )
        :
        data.allEmployees.filter(
            user => user.name.toUpperCase()
                        .includes(searchValue.toUpperCase().trim()) 
                    ||
                    user.employeeNumber.includes(searchValue.trim())
    );

    console.log('all employees container');
    return (
        <div className='allEmployees-container'>
            
            <SearchBar
                inputValue={searchValue}
                changeInput={changeInputSearch}
                filterDate={filterDate}
            />

            <div style={{height: '160px'}}></div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%', 
                height: '100%',
                overflowY: 'auto', 
            }}>
                {usersFilters.map((employee, index) => (
                    <EmployeeHours
                        key={`${employee.employeeNumber}${index}`}
                        employee={employee}
                        click={clickEmployee}
                        isSelected={
                            data.employeeSelected === 
                            employee.name ?
                                true : false
                        }
                        showEmployeeInfo={
                            () => history.push('/employeeInfo')
                        }
                    />
                ))}
            </div>
        </div>
    )
};


const SearchBar = ({inputValue, changeInput, filterDate}) => {

    const [currentDate1, setCurrentDate1] = 
        useState(new Date(new Date().getFullYear(), 0, 1));

    const [currentDate2, setCurrentDate2] = 
        useState(new Date(new Date().getFullYear(), 11, 31));

    const changeDatePicker = (date) => {
        setCurrentDate1(date);

        filterDate(date, currentDate2);
    };

    const changeDatePicker2 = (date) => {
        setCurrentDate2(date);

        filterDate(currentDate1, date);
    };

    return (
        <div className='allEmployees-searchBar'>
            <div className='searchBar-divs'>
                <FaSearch
                    color='white'
                    size='1.8rem'
                />

                <input
                    id='input-search-employee'
                    name='input-search-employee'
                    autoComplete='off'
                    value={inputValue}
                    onChange={changeInput}
                />
            </div>

            <div className='searchBar-datePicker-div'>
                    <h2>DE</h2>

                    <DatePicker
                        selected={currentDate1}
                        onChange={changeDatePicker}
                        minDate={new Date(new Date().getFullYear(), 0, 1)}
                        maxDate={currentDate2}
                        locale='es'
                        dateFormat='dd/MMM/yy'
                    />
                
                    <h2>A</h2>

                    <DatePicker
                        selected={currentDate2}
                        onChange={changeDatePicker2}
                        minDate={currentDate1}
                        maxDate={new Date()}
                        locale='es'
                        dateFormat='dd/MMM/yy'
                    />
            </div>
        </div>
    )
};
