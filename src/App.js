import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom"; 
import Home from './Components/HomeComponent';
class App extends Component  {

	render(){
		return (
		    <HashRouter basename="/" className="fill-window">
                <Route exact path="/" component={Home} />
		    </HashRouter>

		)
	}

}


export default App;
