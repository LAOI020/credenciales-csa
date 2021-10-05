
import Swal from 'sweetalert2';
import firebase from '../database/config';
import { types } from '../types';
import { getAllEmployees } from './getAllEmployees';


export const verifyUser = async (
    history, dispatch, fromLoginScreen
) => {

    const lgsdf = localStorage.getItem('lgsdf');

    const docUsers = await firebase.firestore()
        .collection('App-credentials')
        .doc('r8tUnV3nvu77yxcjPdRm')
        .get();

    const userField = docUsers.data()[lgsdf][0];

    if(userField){
        
        
        dispatch({
            type: types.verifyUserLogin
        });
        
        if(userField === 'OFFICES'){
            const allUsers = await getAllEmployees();
    
            dispatch({
                type: types.getAllEmployeesDatabase,
                payload: allUsers
            });
        }
        
        await getAudioDatabase();

        dispatch({
            type: types.updateBussinesName,
            payload: userField
        });

        if(fromLoginScreen){            
            history.replace('/');
        }
        
    } else if(!fromLoginScreen){
        localStorage.removeItem('lgsdf');
        
        history.replace('/login');
    }
}


export const loginUser = async (valueCode, history, dispatch) => {
    
    if(!valueCode){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el campo no puede estar vacio'
        });
    }

    const docUsers = await firebase.firestore()
        .collection('App-credentials')
        .doc('r8tUnV3nvu77yxcjPdRm')
        .get();

    const fields = Object.keys(docUsers.data());

    let isCorrect = false;

    for(const fieldName of fields){

        if(
            docUsers.data()[fieldName][1] ===
            valueCode
        ){
    
            dispatch({
                type: types.verifyUserLogin
            });
    
            localStorage.setItem('lgsdf', fieldName);
            
            isCorrect = true;
            
            history.replace('/');
    
            if(docUsers.data()[fieldName][0] === 'OFFICES'){
                
                const allUsers = await getAllEmployees();

                dispatch({
                    type: types.getAllEmployeesDatabase,
                    payload: allUsers
                });
            }
    
            await getAudioDatabase();
    
            dispatch({
                type: types.updateBussinesName,
                payload: docUsers.data()[fieldName][0]
            });
        }
    }

    if(!isCorrect){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Codigo incorrecto'
        });
    }
}


const getAudioDatabase = async () => {
    
    let dataUrl;

    if(!localStorage.getItem('dataUrlSound')){
        console.log('lo extrae de database');
        const urlMp3 = await  firebase.storage().ref()
            .child(`soundConfirm.mp3`)
            .getDownloadURL();
    
        let response = await fetch(urlMp3);
        let data = await response.blob();
        
        let file = new File([data], {type: 'audio/mp3'});
    
        let reader = new FileReader();
        reader.readAsDataURL(file);
    
        function loadData(obj){
            return new Promise((resolve) => {
                obj.onload = () => resolve(obj.result)
            });
        }

        dataUrl = await loadData(reader);

    } else {
        dataUrl = localStorage.getItem('dataUrlSound');
    }
    
    const binary = convertDataURIToBinary(dataUrl);
    
    const blob = new Blob([binary], {type : 'audio/ogg'});

    const blobUrl = URL.createObjectURL(blob);

    localStorage.setItem('dataUrlSound', dataUrl);
    localStorage.setItem('soundConfirm', blobUrl);
}

const convertDataURIToBinary = (dataURI) => {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
  
    for(let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }