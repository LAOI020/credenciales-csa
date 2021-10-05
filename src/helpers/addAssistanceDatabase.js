
import firebase from '../database/config';
import moment from 'moment';
import 'moment/locale/es-mx';
import { getDateTimeZone } from './getDateTimeZone';


export const addAssistanceDatabase = async (
    bussinesName, dataQRuser
) => {
    
    await firebase.firestore()
        .collection('App-credentials')
        .doc('bussines')
        .update({
            [`QR${bussinesName}`]: 'none'
        });

    let positionID = dataQRuser.indexOf('credentials');

    positionID = positionID + 12;

    let userID =
        dataQRuser.substring(positionID, positionID + 20);
    
    await setDateUserDatabase(bussinesName, userID);
};


const setDateUserDatabase = async (bussinesName, userID) => {
    
    const [currentDate, currentHour, fullDate] 
        = await getDateTimeZone();
        
    let currentDateFormat = 
        currentDate.replace(/\//gi, '-');
        
    currentDateFormat = currentDateFormat.substring(0, 6);

    const docUser = await firebase.firestore()
        .collection('App-credentials')
        .doc('bussines')
        .collection(bussinesName)
        .doc(userID)
        .get();    

    const field = docUser.data()[currentDateFormat];

    if(field){

        const firstHour = 
            moment(`${currentDate} ${field[0]}`, 'DD/MMM/YY h:m:A');
            
        const differenceMinutes = 
            moment(fullDate).diff(firstHour, 'minutes');

        const differenceHours = 
            parseFloat((differenceMinutes / 60).toFixed(2));

        docUser.ref
            .update({
                [currentDateFormat]: [field[0], currentHour, differenceHours]
            });

    } else {
        docUser.ref
            .update({
                [currentDateFormat]: [currentHour]
            });
    }
}