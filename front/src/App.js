import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Navbar from './components/Navbar'
import Add from './components/Add'
import Edit from './components/Edit'
import List from './components/List'
import Notfound from './components/Notfound'
import{ BrowserRouter as Router, Route , Switch } from 'react-router-dom'
import View from './components/View';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
      <Switch>
      <Route path="/add"  component={Add}/>
      <Route path="/list"  component={List}/>
      <Route path="/edit/:_id"  component={Edit}/>
      <Route path="/view/:_id" component={View}/>
      <Route component={Notfound}/>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
