import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FacebookAuth from 'react-facebook-auth';
import {DatePicker} from "./datepicker.js";
import {
  setUser
} from '../../modules/counter'
const MyFacebookButton = ({ onClick }) => (
  <button onClick={onClick}>
    תתחבר יא קקי
  </button>
);

const Home = props => (
  <div>
    {props.user ? 
      (
        <div>
          היי {props.user.name}
          <img src={props.user.picture.data.url} />
          <DatePicker
            fromDate={new Date("2018-09-19")}
            toDate={new Date("2018-10-5")}
           />
          <button>שלח!</button>
        </div> 
      ) : (
      <div>
        
      <FacebookAuth
          appId="337671556778608"
          callback={props.setUser}
          component={MyFacebookButton}
        />
        </div>
      )}
  </div>
)

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
