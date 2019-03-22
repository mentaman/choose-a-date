import React, {Component} from 'react';
import { Icon, Label, Statistic, Button } from 'semantic-ui-react'
import _ from "lodash";
import { getDates } from './getDates';
import { getDateFormat } from './getDateFormat';


 let weekday = new Array(7);
 weekday[0] =  "ראשון";
 weekday[1] = "שני";
 weekday[2] = "שלישי";
 weekday[3] = "רביעי";
 weekday[4] = "חמישי";
 weekday[5] = "שישי";
 weekday[6] = "שבת";
 export class DayDate extends Component {
     getUsers() {
        let {users, date} = this.props;
        return (users && users[getDateFormat(date)]) || [];
     }
     renderRank(rank) {
         switch(rank) {
             case 1:
                return <span>מקום ראשון <Icon name='star' /></span>
            case 2:
                return <span>מקום שני <Icon name='star outline' /></span>
             default:
                return <span>מקום {rank}</span>
         }
        
     }
     render() {
         let {date, choosed, rank, usersCount} = this.props;
         let users = this.getUsers();
         let perctange = Math.floor((users.length/usersCount)*100);
        return (
            <div key={getDateFormat(date)} 
                onMouseDown={this.props.onMouseDown} 
                onMouseEnter={this.props.onMouseEnter}
                
                 className={`day ${choosed ? "choosed" : "not-choosed"}`}>
                    <div className="day-title">
                        <div className={"day-name"}>
                            יום {weekday[date.getDay()]}
                        </div>
                        <div className={"day-date"}>
                            {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}
                        </div>
                        <div style={{display: "inline-block"}}>
                            <div style={{background: "#DB2828", color: "#fff", borderRadius: "3px 3px 0 0", fontWeight: "bold", padding: "0 9px 2px 9px"}}>
                                {users.length}&nbsp;איש
                            </div>
                            <div style={{border: "1px solid #DB2828", position: "relative", color: "#DB2828", borderRadius: "0 0 3px 3px", padding: "0 9px"}}>
                                <div style={{background: "#fff", position: "absolute", right: 0, left: 0, margin: "auto", top: "-3px", transform: "rotate(45deg)", width: "7px", height: "7px"}}></div>
                                {perctange}%
                            </div>
                        </div>
                        <div className={"day-date-count-title"}>
                            {this.renderRank(rank)}
                        </div>
                    </div>
                    <div className={"day-users"}>
                        {users.map((user, idx) => (
                            <div key={idx} className="day-users-user">
                                <img src={user.picture} style={{maxWidth: "50px"}} />
                            </div>
                        ))}
                    </div>
                 </div>
        )
     }
 }

 function sortNumber(a,b) {
    return b - a;
}
export class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: {},
            dragging: false,
            cleaning: false
        };
    }

    isChosen = (formateddate) => {
        return this.state.dates[formateddate]
        || (this.state.dates[formateddate] !== false && this.props.users && this.props.users[formateddate] && this.props.users[formateddate].map(user => user.id).includes(this.props.user.id));
    }
    getDates = () => {
        return getDates(this.props.fromDate, this.props.toDate).map(getDateFormat).filter(date => this.isChosen((date)));
    }
    
    getDateRanks = () => {
        let usersLength = Object.values(this.props.users).map(u => u.length);
        usersLength = _.uniq(usersLength);
        usersLength = usersLength.sort(sortNumber);
        return usersLength;
    }

    getAllUsers = () => {
        return _.uniq(_.flatten(Object.values(this.props.users)).map(u => u.id));
    }

    render() {
        let ranks = this.getDateRanks();
        let allUsers = this.getAllUsers();
        console.log(ranks);
        return <div onMouseUp={() => {
            if(this.state.dragging) {
                this.setState({dragging: false})
            }
            
        }} >
            {getDates(this.props.fromDate, this.props.toDate).map((date) => {
                let formatDate = getDateFormat(date);
                let choosed = this.isChosen(getDateFormat(date));
                return <DayDate choosed={choosed} 
                                usersCount={allUsers.length}
                                rank={ranks.indexOf((this.props.users && this.props.users[formatDate] && this.props.users[formatDate].length))+1}
                                onMouseEnter={() => {
                                    if(this.state.dragging) {
                                        let newDates = {...this.state.dates};
                                        if(this.state.cleaning) {
                                            newDates[getDateFormat(date)] = false;
                                        } else {
                                            newDates[getDateFormat(date)] = true;
                                        }
                                        this.setState({dates: newDates})
                                        console.log("hover", date);
                                    }
                                }}
                                onMouseDown={() => {
                                    console.log("down", date);
                                    let cleaning = false;
                                    let newDates = {...this.state.dates};
                                    if(choosed) {
                                        cleaning = true;
                                    }
                                    if(cleaning) {
                                        newDates[getDateFormat(date)] = false;
                                    } else {
                                        newDates[getDateFormat(date)] = true;
                                    }
                                    
                                    this.setState({dragging: true, cleaning, dates: newDates})
                                }}
                                users={this.props.users}
                                date={date} />
                })}
        </div>
    }
}