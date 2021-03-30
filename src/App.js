import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom"; 
import Home from './Components/HomeComponent';
import About from './Components/AboutComponent';

class App extends Component  {

	render(){
		return (
		    <HashRouter basename="/" className="fill-window">
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />

		    </HashRouter>

		)
	}

}


export default App;
