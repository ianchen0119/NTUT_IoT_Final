import axios from 'axios'
const cntName = 'cnt-925968799'; // mn-name/AE/DATA
export const va = axios

const AppDomain = axios.create({
    baseURL: `http://liaojack.asuscomm.com:3000/http://liaojack.asuscomm.com:8282/~/mn-cse/`, // connect to mc-cse
    headers:{
        "Accept": "application/json",
        "X-M2M-Origin": "admin:admin",
        "X-Requested-With": "XMLHttpRequest"
    }
});
export const apiDataList = data => AppDomain.get(`${cntName}`, data);