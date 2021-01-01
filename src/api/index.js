import axios from 'axios'
const cntName = 'cnt-576768572'; // mn-name/AE/DATA
export const va = axios
const AppDomain = axios.create({
    baseURL: `http://192.168.254.170:8282/~/mn-cse/` // connect to mc-cse
});
export const apiDataList = data => AppDomain.get(`${cntName}`, data);