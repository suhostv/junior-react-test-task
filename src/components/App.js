import React from 'react';
import '../styles/App.css';
import { Switch, Route } from 'react-router-dom'
import List from './List'
import Add from './Add'

function App() {
  return (
    <div className='content-container'>
      <Switch>
        <Route exact path='/' component={List}/>
        <Route path='/add' component={Add}/>
      </Switch>
    </div>
  );
}

export default App;
