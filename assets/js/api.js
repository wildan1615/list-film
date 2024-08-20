'use strict'

const api_key = '9c720b8e5858b51a4a90595f3ad879f4';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

/**  
 * mengambil data dari server menggunakan 'url' dan meneruskan hasilnya dalam data JSON ke function 'callback', bersama dengan parameter opsional jika memiliki 'opsionalParam'
*/

const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
}

export { imageBaseURL, api_key, fetchDataFromServer}