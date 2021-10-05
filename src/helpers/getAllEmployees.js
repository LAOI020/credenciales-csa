
import firebase from '../database/config';


export const getAllEmployees = async () => {

    const docBussines = await firebase.firestore()
        .collection('App-credentials')
        .doc('bussines')
        .get();

    const allBussinesName = docBussines.data().names;

    let allUsers = [];

    for(const bussinesName of allBussinesName){
        
        const users = await docBussines.ref
            .collection(bussinesName)
            .get();
        
        users.docs.forEach((user) => {
            
            const userObject = extractDocFields(bussinesName, user);

            allUsers.push(userObject);
        });
    }

    allUsers.sort((a,b) => {
        return a.employeeNumber - b.employeeNumber;
    });

    return allUsers;
};


const extractDocFields = (bussinesName, user) => {

    let userObject = {
        userID: user.id,
        allDates: [],
        bussinesName,
        firstName: '',
        lastName: '',
        employeeNumber: 0,
        totalHours: 0
    };

    const keysDoc = Object.keys(user.data());

    keysDoc.forEach((key) => {
        
        // IS FIELD DATE
        if(key.length === 6 && user.data()[key] !== null){
        
            if(user.data()[key][2]){
                userObject.totalHours = 
                    userObject.totalHours + user.data()[key][2]
            }

            userObject.allDates.push({
                [key]: user.data()[key]
            });

        } else if(key.length !== 6){
            userObject[key] = user.data()[key]
        }
    });

    userObject.employeeNumber = 
        userObject.employeeNumber.toString();

    userObject['name'] = 
        `${userObject.firstName} ${userObject.lastName}`;

    delete userObject.firstName;
    delete userObject.lastName;

    return userObject;
}
// const calculateHours = (date, hours) => {
    
//     if(hours.length !== 2){
//         return 0;

//     } else {
//         const initHour = moment(`${date} ${hours[0]}`);
//         const endHour = moment(`${date} ${hours[1]}`);
    
//         const minutes = endHour.diff(initHour, 'minutes', true);
    
//         return minutes / 60;
//     }
// };