import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom"; 
import Home from './Components/HomeComponent';
import Icon from './Components/IconComponent';

class App extends Component  {

	render(){
		return (
		    <HashRouter basename="/" className="fill-window">
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={Icon} />

		    </HashRouter>

		)
	}

}


export default App;
