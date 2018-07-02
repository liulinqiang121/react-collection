import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import RouterList from './router/index' 
//import {BrowserRouter as Router,Route,Link,NavLink,Prompt,Switch} from 'react-router-dom'
console.log(RouterList)
ReactDOM.render((<RouterList/>), document.getElementById('app'));  

// ReactDOM.render((  
//     <Router>  
//         <div>  
//             <Route exact path="/login" component={App}/>  
//             <Route path="/manage" component={Manage}/>  
//         </div>  
//     </Router>  
// ), document.getElementById('app'));  