import React, {Component} from 'react'
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
   var dateArray = new Array();
   var currentDate = startDate;
   while (currentDate <= stopDate) {
     dateArray.push(currentDate)
     currentDate = currentDate.addDays(1);
   }
   return dateArray;
 }


 let weekday = new Array(7);
 weekday[0] =  "ראשון";
 weekday[1] = "שני";
 weekday[2] = "שלישי";
 weekday[3] = "רביעי";
 weekday[4] = "חמישי";
 weekday[5] = "שישי";
 weekday[6] = "שבת";
 export function getDateFormat(date) {
     return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
 }

 export class DayDate extends Component {
     getUsers() {
        let {users, date} = this.props;
        return (users && users[getDateFormat(date)]) || [];
     }
     render() {
         let {date, choosed} = this.props;
         let users = this.getUsers();
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
                    </div>
                    <div className={"day-users"}>
                        {users.map((user, idx) => (
                            <div key={idx} className="day-users-user">
                                <img src={`http://graph.facebook.com/${user}/picture?type=square`} />
                            </div>
                        ))}
                    </div>
                 </div>
        )
     }
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
        || (this.state.dates[formateddate] !== false && this.props.users && this.props.users[formateddate] && this.props.users[formateddate].includes(this.props.user.id));
    }
    getDates = () => {
        return getDates(this.props.fromDate, this.props.toDate).map(getDateFormat).filter(date => this.isChosen((date)));
    }
    

    render() {
        return <div onMouseUp={() => {
            if(this.state.dragging) {
                this.setState({dragging: false})
            }
            
        }} >
            {getDates(this.props.fromDate, this.props.toDate).map((date) => {
                let choosed = this.isChosen(getDateFormat(date));
                return <DayDate choosed={choosed} 
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