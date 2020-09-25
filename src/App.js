import React, { Component } from 'react';
import logo from './logo.svg';
import { HashRouter, Route, Link } from "react-router-dom"; 
import Home from './Components/HomeComponent';
class App extends Component  {

	render(){
		return (
		    <HashRouter basename="/">
                <Route exact path="/" component={Home} />
		    </HashRouter>

		)
	}

}



export default App;
