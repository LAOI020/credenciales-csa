
import moment from 'moment';
import 'moment/locale/es-mx';


export const filterDateResults = (
    minDate, maxDate, allEmployees
) => {

    const currentYear = moment().format('YY');

    let dateMin = moment(minDate);

    let dateMax = moment(maxDate);

    let usersFilters = [];

    allEmployees.forEach((employee, index) => {
        
        let newInfoEmployee = employee;

        let allDatesFilters = [];

        let totalHours = 0;
    
        employee.allDates.forEach((dateDetails) => {

            const getDate = Object.keys(dateDetails);

            const dateFormat = 
                moment(`${getDate[0]}-${currentYear}`, 'DD-MMM-YY');

            const isBetween = 
                moment(dateFormat).isBetween(
                    dateMin, dateMax, undefined, '[]'
                );

            if(isBetween){

                if(dateDetails[getDate[0]][2]){
                    totalHours = 
                        totalHours + dateDetails[getDate[0]][2];
                }

                allDatesFilters.push(dateDetails);
            }
        });

        if(totalHours > 0){
            newInfoEmployee.totalHours = totalHours;
            
            newInfoEmployee.allDates = allDatesFilters;

            usersFilters.push(newInfoEmployee);
        }
    });

    return usersFilters;
}