
import firebase from '../database/config';
import moment from 'moment';
import 'moment/locale/es-mx';
import 'moment-timezone';


export const getDateTimeZone = async () => {
    
    const docDate = firebase.firestore()
        .collection('App-credentials')
        .doc('asistencias');

    await docDate
        .update({
            date: firebase.firestore.FieldValue.serverTimestamp()
        });

    const getValueDoc = await docDate.get();

    const dateServer = getValueDoc.data().date;

    const dateTimeZone = new Date(dateServer.seconds * 1000);
    
    const dateTimeZoneLocal = 
        moment(dateTimeZone).tz('America/Mexico_City')

    const fullDate = 
        dateTimeZoneLocal.format('DD/MMM/YY h:m:A')
        .toUpperCase();

    const dateComplete = 
        dateTimeZoneLocal.format('DD/MMM/YY')
        .replace('.', '').toUpperCase();
    
    const dateHour = 
        dateTimeZoneLocal.format('h:m:A')
        .toUpperCase();    
        
    return [dateComplete, dateHour, fullDate];
}