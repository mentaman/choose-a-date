import React, {Component} from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FacebookAuth from 'react-facebook-auth';
import {DatePicker} from "./datepicker.js";
import {getDates, sendDates} from "../../api/dates-api.js"
import {toast} from "react-toastify";
import FacebookLogin from 'react-facebook-login';

import {
  setUser
} from '../../modules/counter'
const MyFacebookButton = ({ onClick }) => (
  <button onClick={onClick}>
    תתחבר יא קקי
  </button>
);

export class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      sending: false
    }
    this.datepicker = React.createRef();
    this.updateDates();
  }

  updateDates = async () => {
    try {
      this.setState({loading: true});
      let users = (await getDates()).data;
      this.setState({users, loading: false});
    } catch(e) {
      toast.error("לא מצליח לטעון תאריכים");
    }
    
  }

  choseDates = async () => {
    try {
      this.setState({sending: true});
      await sendDates(this.props.user, this.datepicker.current.getDates());
      await this.updateDates();
      this.setState({sending: false});
      toast.success("עדכנת תאריכים בהצלחה");
    } catch(e) {
      toast.error("לא מצליח לעדכן תאריכים");
    }
  }

  onFacebookFailure = (failure) => {
    toast.error("ההתחברות לפייסבוק נכשלה..");
  }

  onFacebookResponse = (response) => {
    toast.success(`הי ${response.name}, התחברת בהצלחה!`)
    this.props.setUser(response);
  }
  render() {
    console.log(this.state.users);
    return <div>
      {this.props.user ? 
        (
          <div>
            היי {this.props.user.name}
            <img src={this.props.user.picture.data.url} />
            {this.state.users ? 
            (<div>
              <div style={{textAlign: "center"}}>
                {this.state.sending ? (<span>שולח..</span>) : <button onClick={this.choseDates} style={{width: "100px", height: "100px"}}>שלח!</button>}
                {this.state.loading ? (<span>טוען..</span>) : <button onClick={this.updateDates} style={{width: "100px", height: "30px", marginRight: "50px"}}>רענן</button>}
              </div> 
                <DatePicker
                    ref={this.datepicker}
                    fromDate={new Date("2018-09-19")}
                    toDate={new Date("2018-10-5")}
                    users={this.state.users}
                    user={this.props.user}
                />
              </div>) : 
                <div>
                  <div>חכה שיטען משתמשים</div>
                </div>}
          </div> 
        ) : (
        <div>
          
            <FacebookLogin
            appId="337671556778608"
            autoLoad={true}
            fields="name,email,picture"
            onFailure={this.onFacebookFailure}
            render={MyFacebookButton}
            callback={this.onFacebookResponse} />,
          </div>
        )}
    </div>
  }
  
}

const mapStateToProps = ({ counter }) => ({
  user: counter.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
