import './App.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Logo from '../components/templates/Logo';
import Nav from '../components/templates/Nav';
import Footer from '../components/templates/Footer';

import {HashRouter} from 'react-router-dom';
import Routes from './Routes';

export default props =>
    <HashRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes/>
            <Footer />
        </div>
    </HashRouter>
