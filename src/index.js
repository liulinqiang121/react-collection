import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Manage from './components/managePage'
import {BrowserRouter as Router,Route,Link,NavLink,Prompt,Switch} from 'react-router-dom'

ReactDOM.render((  
    <Router>  
        <div>  
            <Route exact path="/" component={App}/>  
            <Route path="/manage" component={Manage}/>  
        </div>  
    </Router>  
), document.getElementById('root'));  
ReactDOM.render(<div><Router /></div>, document.getElementById('app'));
