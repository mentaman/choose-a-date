import { getDates } from './getDates';
import { getDateFormat } from './getDateFormat';
import dors from "./people/dors.jpg";
import orig from "./people/orig.jpg";
import denis from "./people/denis.jpg";
import itays from "./people/itays.png";

let hardcoded_users = [
    /*{
        picture: orig, 
        id: "1686313663",
        dates: getDates(new Date("2020-04-01"), new Date("2020-04-16")).filter(d => d.getDay() < 5).map(getDateFormat)
    },*/
    {
        picture: dors, 
        id: "dors",
        dates: [...getDates(new Date("2020-07-02"), new Date("2020-07-05")).map(getDateFormat)]
    },
    {
        picture: denis, 
        id: "denis",
        dates: [...getDates(new Date("2020-07-01"), new Date("2020-07-05")).map(getDateFormat)]
    },
    {
        picture: itays, 
        id: "itays",
        dates: [new Date("2020-06-25"), new Date("2020-07-02")].map(getDateFormat)
    }
]
console.log("hardcoded users", hardcoded_users)
let hardcoded_users_dates = {
}

for(let user of hardcoded_users) {
    for(let date of user.dates) {
        if(!hardcoded_users_dates[date])
        {
            hardcoded_users_dates[date] = [];
        }
        if(hardcoded_users_dates[date].find(cur => cur.id === user.id) === undefined)
        {
            hardcoded_users_dates[date].push({picture: user.picture, id: user.id});
        }
        
    }
    //
    //"28/3/2019": [{picture: "https://graph.facebook.com/1686313663/picture?type=square", id: "orig"}]
    //
}

export function formatUsers(users) {
    users = {...users};
    for(let datekey in users) {
        users[datekey] = users[datekey].map(user => ({picture: `https://graph.facebook.com/${user}/picture?type=square`, id: user}));
        if(hardcoded_users_dates[datekey]) {
            users[datekey].push(...hardcoded_users_dates[datekey]);
        }
    }
    return users;
}