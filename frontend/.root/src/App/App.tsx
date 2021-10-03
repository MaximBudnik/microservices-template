import React from 'react';
import {HashRouter as Router, Switch, Route, NavLink} from 'react-router-dom';

import {LazyService} from "../components/LazyService";
import {microservices} from "../microservices";

export const App = () => {
    return (
        <div>
            root app
            {/*<NavLink exact to='/'>*/}
            {/*    home*/}
            {/*</NavLink>*/}
            {/*<NavLink to='/gallery'>*/}
            {/*    camera*/}
            {/*</NavLink>*/}
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <LazyService microservice={microservices.service}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
