
import firebase from '../database/config';


export const generateUuidScanQR = async (bussinesName, dataQR) => {
    let positionID = dataQR.indexOf('credentials');
                
    if(positionID !== -1){
        positionID = positionID + 12;

        let userID =
            dataQR.substring(positionID, positionID + 20);

        let uuidQR = generateUuid(userID);
        
        await firebase.firestore()
            .collection('App-credentials')
            .doc('bussines')
            .update({
                [`QR${bussinesName}`]: uuidQR
            });
        console.log('enviado a firestore');
        return uuidQR;

    } else {
        return 'QR invalido';
    }
}


export const generateUuid = (userID) => {
    let d = new Date().getTime();

    let d2 = (performance && performance.now && (performance.now()*1000)) || 0;

    let uuid =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c) => {
	
        let r = Math.random() * 16;
	
        if(d > 0){
		    r = (d + r)%16 | 0;
	    	d = Math.floor(d/16);
	
        } else {
	        r = (d2 + r)%16 | 0;
	    	d2 = Math.floor(d2/16);
        }
	
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });

    if(!userID){

        return uuid;
    }

    let uuidScanQR = 
        [uuid.slice(0, 18), userID, uuid.slice(18)].join('');

    
    return uuidScanQR;
};

