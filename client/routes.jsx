import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

// Layout Containers
import Marketing from './modules/core/components/Marketing.jsx';
import InnerAuth from './modules/core/components/InnerAuth.jsx';

// Marketing
import Main from './modules/marketing/components/Main.jsx';
import Register from './modules/marketing/components/Register.jsx';
import CheckDigits from './modules/dashboard/components/CheckDigits.jsx';
import FaxSomething from './modules/dashboard/components/FaxSomething';
import InstitutionInfoCont from './modules/dashboard/containers/InstitutionInfoCont';


// Dashboard
import Dashboard from './modules/dashboard/components/Dashboard.jsx';


const router = (

/* Logins */
    <Router history={browserHistory}>
      	<Route path="/" component={Marketing}>
        	<IndexRoute component={Main}></IndexRoute>
            <Route path="/register" component={Register}></Route>
    	</Route>

    	<Route path="/dashboard" component={InnerAuth}>
    		<IndexRoute component={Dashboard}></IndexRoute>
            <Route path="/check_digits" component={CheckDigits}></Route>
        	<Route path="/fax_something" component={FaxSomething}></Route>
            <Route path="/institution_info" component={InstitutionInfoCont}></Route>
        </Route>
    </Router>
  

)

Meteor.startup(() => {
  render(router, document.getElementById("app"));
});



