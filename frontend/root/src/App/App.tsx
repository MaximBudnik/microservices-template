import React from 'react';
import {HashRouter as Router, Switch, Route, NavLink} from 'react-router-dom';

import {LazyService} from "../components/LazyService";
import {microservices} from "../microservices";
import {config} from "../config";
export const App = () => {
    return (
        <div>
            root app aboba
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
