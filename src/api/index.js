import axios from 'axios'
const cntName = 'cnt-780139102'; // mn-name/AE/DATA
export const va = axios

const AppDomain = axios.create({
    baseURL: `http://192.168.254.170:3000/http://192.168.254.170:8282/~/mn-cse/`, // connect to mc-cse
    headers:{
        "Accept": "application/json",
        "X-M2M-Origin": "admin:admin",
        "X-Requested-With": "XMLHttpRequest"
    }
});
export const apiDataList = data => AppDomain.get(`${cntName}`, data);