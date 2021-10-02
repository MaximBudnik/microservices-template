import React from 'react';
import {HashRouter as Router, Switch, Route, NavLink} from 'react-router-dom';

import Service from 'service/Service';

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
                        <Service/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
