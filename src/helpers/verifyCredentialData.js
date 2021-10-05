
import firebase from '../database/config';
import { generateUuid } from './generateUuid';


export const verifyCredentialData = async (pathName, origin) => {

    let result = 'Usuario no encontrado. Verifica la URL';
    
    if(!origin){
        return [null, result];
    }

    if(!pathName){
        return [null, result];
    }

    const userID = pathName.substring(13, 33);

    const docBussines = await firebase.firestore()
        .collection('App-credentials')
        .doc('bussines')
        .get();
    
    if(!docBussines.data().names.includes(origin)){
        return [null, result];
    }

    const userDatabase = await firebase.firestore()
        .collection('App-credentials')
        .doc('bussines')
        .collection(origin)
        .doc(userID)
        .get();
    
    if(!userDatabase.exists){
        return [null, result];
    }

    if(!localStorage.getItem('userImage')){
        await getUserImage(userID);

    } else {
        console.log('ya hay imagen');
    }

    const userDatabaseUuid = userDatabase.data().uuid;

    if(userDatabaseUuid === ''){

        const newUuid = generateUuid();
        
        await userDatabase.ref.update({
            uuid: newUuid,
            deviceInfo: `${window.FRUBIL.device.class},${window.FRUBIL.client.os},${window.FRUBIL.client.class},${window.FRUBIL.client.name} ${window.FRUBIL.client.version}`
        });

        localStorage.setItem('hkljasfd', newUuid);
        
        let jsonResult = userDatabase.data();
        
        delete jsonResult.uuid;
        delete jsonResult.deviceInfo;

        return [true, jsonResult];

    } else if(
        localStorage.getItem('hkljasfd') ===
        userDatabaseUuid
    ){
        if(
            userDatabase.data().deviceInfo ===
            `${window.FRUBIL.device.class},${window.FRUBIL.client.os},${window.FRUBIL.client.class},${window.FRUBIL.client.name} ${window.FRUBIL.client.version}`
        ){
            let jsonResult = userDatabase.data();
        
            delete jsonResult.uuid;
            delete jsonResult.deviceInfo;

            return [true, jsonResult];

        } else {
            result = 'Dispositivo incorrecto';
            return [false, result];
        }

    } else {
        let jsonResult = userDatabase.data();
        
        delete jsonResult.uuid;
        delete jsonResult.deviceInfo;

        return [false, jsonResult];
    }
}


const getUserImage = async (userID) => {

    const urlImage = await  firebase.storage().ref()
        .child(`usersImages/${userID}.jpg`)
        .getDownloadURL();

    let response = await fetch(urlImage);
    let data = await response.blob();
    
    let file = new File([data], "imageUser.jpg");

    let reader = new FileReader();
    reader.readAsDataURL(file);

    function loadData(obj){
        return new Promise((resolve) => {
            obj.onload = () => resolve(obj.result)
        });
    }
     
    const dataUrl = await loadData(reader);
    
    localStorage.setItem('userImage', dataUrl);
}