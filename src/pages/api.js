import axios from "axios";
import global from "./global";


export async function post(url, data){
    var config = {
        method: 'POST',
        url: global.BASE_URL+url,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
      };
      
    await axios(config)
      .then(response => response)
    .catch(error => error );
}

export async function get(url){
    var config = {
        method: 'GET',
        url: global.BASE_URL+url,
      };
      
    return await axios(config)
      .then(response => response )
      .catch(error => error );
}

export async function deleteFunction(url){
    var config = {
        method: 'DELETE',
        url: global.BASE_URL+url,
      };
      
    return await axios(config)
      .then(response => response )
      .catch(error => error );
}