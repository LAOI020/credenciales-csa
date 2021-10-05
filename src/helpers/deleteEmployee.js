
import firebase from '../database/config';
import { types } from '../types';


export const deleteEmployee = (
    bussinesName, userID, allEmployees, dispatch
) => {

    firebase.firestore()
        .collection('App-credentials')
        .doc('bussines')
        .collection(bussinesName)
        .doc(userID)
        .delete();

    const newAllEmployees = allEmployees.filter(
        employee => employee.userID !== userID
    );

    console.log(newAllEmployees);

    dispatch({
        type: types.deleteEmployee,
        payload: newAllEmployees
    });

    dispatch({
        type: types.selectEmployee,
        payload: null
    });
}