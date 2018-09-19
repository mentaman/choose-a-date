import axios from 'axios';

let url = "http://localhost:3003";
export function getDates() {
    return axios({
        method:'get',
        url:url+"/dates"
      });
}