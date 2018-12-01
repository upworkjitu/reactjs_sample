import axios from 'axios';
import { API_BASEURL } from '../config/config';


/**
 * 
 * @param {*} makeGETRequest 
 * @param {*} successCallback 
 * @param {*} errorCallback 
 */

export const makeGETRequest = (METHOD, successCallback, errorCallback) =>{
  

        axios.get(API_BASEURL + METHOD)
        .then((response) => {
     
            successCallback(response);
     
        })
        .catch(function (error) {

            errorCallback(error);
            
        });

}

/**
 * function printLogMessages prints message on browser's console
 * @param {*} message 
 */
export const printLogMessages = (message) => {
   console.log(message);
}