import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import {ToastContainer} from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div>
    <header>
      <div className="inside-app">
        <h1>תבחר זמן</h1>
        <h4>תמיד רציתם לבחור זמן ולא ידעתם איך?<br/>
        בחירת זמן, האפליקציה היחידה שנותנת לכם לבחור זמן</h4>
        <a target="_blank" href="http://hey.pbme.co/pEQkEL">אל תשכח לשלם בפייבוקס. לחץ כאן</a>
      </div>
    </header>
    <main>
      <div className="inside-app route">
        <Route exact path="/" component={Home} />
      </div>
    </main>
    <ToastContainer rtl />
  </div>
)

export default App
