import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import VisitorForm from './components/VisitorForm'
import ListPage from './components/ListPage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Route exact path="/" component={VisitorForm} />
          <Route exact path="/listPage" component={ListPage} />
        </main>
      </div>
    </Router>
  );
}

export default App;
