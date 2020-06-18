import React, {Component} from 'react'
import {formatUsers} from "./hardcodedusers";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FacebookAuth from 'react-facebook-auth';
import {DatePicker} from "./datepicker.js";
import {getDates, sendDates} from "../../api/dates-api.js"
import {toast} from "react-toastify";
import FacebookLogin from 'react-facebook-login';
import {Button, Icon} from "semantic-ui-react";

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
            <div style={{textAlign: "center", marginTop: "15px", marginBottom: "15px"}}>
              <div style={{boxShadow: "0 0 3px 0px rgba(0, 0, 0, 0.4)",  borderRadius: "6px", display: "inline-block", paddingLeft: "10px"}}>
                <img style={{padding: "1px", verticalAlign: "middle", marginLeft: "15px", height: "100%", borderRadius: "0 6px 6px 0"}} src={this.props.user.picture.data.url} />
              היי {this.props.user.name}
              </div>
            </div>
            {this.state.users ? 
            (<div>
              <div style={{textAlign: "center", marginBottom: "30px", marginTop: "5px"}}>
                {this.state.sending ? (<span>שולח..</span>) : 
                <Button positive icon labelPosition='left' onClick={this.choseDates}>
                  שמור!
                  <Icon name="save" />
                </Button>}
                {this.state.loading ? (<span>טוען..</span>) : 
                  <Button icon labelPosition='left' onClick={this.updateDates} style={{marginRight: "50px"}}>
                  רענן
                  <Icon name="refresh" />
                  </Button>}
              </div> 
                <DatePicker
                    ref={this.datepicker}
                    fromDate={new Date("2019-06-21")}
                    toDate={new Date("2019-07-05")}
                    users={formatUsers(this.state.users)}
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
