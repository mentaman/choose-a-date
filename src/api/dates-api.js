import axios from 'axios';

let url = "http://localhost:3003";
export function getDates() {
    return axios({
        method:'get',
        url:url+"/dates"
      });
}

export function getMyDates(user, dates) {
    return axios({
        method:'post',
        url:url+"/dates",
        params: {
            userId: user.id,
            accessToken: user.accessToken
        }
      });
}

export function sendDates(user, dates) {
    return axios({
        method:'post',
        url:url+"/dates",
        data: {
            user,
            dates
        }
      });
}