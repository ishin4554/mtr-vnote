import React, {Component} from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './containers/routes';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class App extends Component{
  render() {
    return(
      <Router>     
        <Routes />
      </Router>      
    )
  }
}

export default App;
