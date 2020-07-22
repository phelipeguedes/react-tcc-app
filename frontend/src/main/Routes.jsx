import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import AlunoCrud from '../components/aluno/AlunoCrud';

export default props =>
    
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/alunos" component={AlunoCrud}></Route>
        <Redirect from="*" to="/"></Redirect>
    </Switch>

