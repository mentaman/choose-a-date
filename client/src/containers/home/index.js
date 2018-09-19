import React, {Component} from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FacebookAuth from 'react-facebook-auth';
import {DatePicker} from "./datepicker.js";
import {getDates, sendDates} from "../../api/dates-api.js"
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
      users: {}
    }
    this.datepicker = React.createRef();
    this.updateDates();
  }

  updateDates = async () => {
    console.log("asking for users");
    let users = (await getDates()).data;
    this.setState({users});
  }

  choseDates = () => {
    sendDates(this.props.user, this.datepicker.current.getDates());
  }

  render() {
    return <div>
      {this.props.user ? 
        (
          <div>
            היי {this.props.user.name}
            <img src={this.props.user.picture.data.url} />
            <div style={{textAlign: "center"}}>
              <button onClick={this.choseDates} style={{width: "100px", height: "100px"}}>שלח!</button>
            </div>
            <DatePicker
              ref={this.datepicker}
              fromDate={new Date("2018-09-19")}
              toDate={new Date("2018-10-5")}
              users={this.state.users}
            />
          </div> 
        ) : (
        <div>
          
        <FacebookAuth
            appId="337671556778608"
            callback={this.props.setUser}
            component={MyFacebookButton}
          />
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
