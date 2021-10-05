
import Compressor from 'compressorjs';
import Swal from 'sweetalert2';
import firebase from '../database/config';
import { getDateTimeZone } from './getDateTimeZone';
import { types } from '../types';


export const verifyDataNewUser = async (
    bussinesName, valuesInput, imageDataUrl, dispatch
) => {

    let incomplete;

    for(const value in valuesInput){
        if(valuesInput[value] === ''){
            incomplete = true;
        }
    }

    if(incomplete){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ningun campo puede estar vacio'
        });
    }

    if(valuesInput['newEmployee-numberPhone'].length !== 10){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El numero celular debe tener 10 digitos'
        });
    }

    if(!imageDataUrl){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Es obligatorio poner una foto'
        });
    }

    const getAllName = 
        valuesInput['newEmployee-name']
            .toUpperCase().trim().split(" ");

    if(getAllName.length < 3){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo nombre debe tener minimo un nombre y los dos apellidos'
        });
    }

    const employeeNumber = 
        parseInt(valuesInput['newEmployee-employeeNumber']);

    if(!employeeNumber){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo numero de empleado debe contener un numero valido'
        });
    }

    Swal.fire({
        title: 'Cargando...',
        text: 'Creando usuario',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
    });

    const docUserIDdatabase = await createUserDatabase(
        bussinesName, valuesInput, employeeNumber, getAllName
    );

    uploadImageDatabase(
        imageDataUrl, docUserIDdatabase, dispatch
    );
};


const createUserDatabase = async (
    bussinesName, valuesInput, employeeNumber, getAllName
) => {
    
    const [dateComplete] = await getDateTimeZone();

    const fieldsDoc = {
        allergies: valuesInput['newEmployee-allergies'].toUpperCase().trim(),
        bloodType: valuesInput['newEmployee-bloodType'].toUpperCase().trim(),
        curp: valuesInput['newEmployee-curp'].toUpperCase().trim(),
        deviceInfo: '',
        emergencyNumber: '(374)74.24.515 Y (374)74.20.412',
        employeeNumber: employeeNumber,
        entryDate: dateComplete,
        firstName: getAllName[0],
        lastName: `${getAllName[getAllName.length - 2]} ${getAllName[getAllName.length - 1]}`,
        age: valuesInput['newEmployee-age'].trim(),
        numberPhone: valuesInput['newEmployee-numberPhone'].trim(),
        holidays: valuesInput['newEmployee-holidays'].toUpperCase().trim(),
        job: valuesInput['newEmployee-job'].toUpperCase().trim(),
        numberImss: valuesInput['newEmployee-numberImss'].toUpperCase().trim(),
        rfc: valuesInput['newEmployee-rfc'].toUpperCase().trim(),
        uuid: ''
    };

    let allDaysYear = {};

    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

    months.forEach((month) => {

        for(let i = 1; i <= 31; i++){
            if(i.toString().length === 1){
                allDaysYear[`0${i}-${month}`] = ['10:05 AM', '1:05 PM', 3];
            } else {
                allDaysYear[`${i}-${month}`] = null;
            }
        }
    });
  
    const docNewUser = await firebase.firestore()
        .collection('App-credentials')
        .doc('bussines')
        .collection(bussinesName)
        .add({
            ...fieldsDoc,
            ...allDaysYear
        });

    return docNewUser.id;
};


const uploadImageDatabase = async (
    imageDataUrl, userIDdatabase, dispatch
) => {
    
    const resDataUrl = await fetch(imageDataUrl);
    const blobDataUrl = await resDataUrl.blob();

    const userImageFile = 
        new File([blobDataUrl], `${userIDdatabase}.jpg`, {type: 'image/jpg'});
    
    new Compressor(userImageFile, {
        quality: 0.6,
        success(resultFile){

            const refImageUser = firebase.storage().ref()
                .child(`usersImages/${userIDdatabase}.jpg`)
        
            const uploadImage = refImageUser.put(resultFile);
        
            uploadImage.on(
                "state_changed",
                function progress() {
                            
                },
        
                function error() {
                  console.log("error uploading image file");
                },
        
                function complete() {
                    
                    Swal.close();
        
                    dispatch({
                        type: types.showContainerNewUser,
                        payload: null
                    });
        
                    Swal.fire({
                        icon: 'success',
                        title: 'Listo...',
                        text: 'Usuario creado correctamente'
                    });
                }
            );
        },
        error(err){
            console.log(err);
        }
    });
}