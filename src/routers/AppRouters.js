import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBars from '../components/NavBars';
import Estudiantes from '../containers/Estudiantes';


class AppRouters extends Component {
    render() {
        return (
       <BrowserRouter>
         <NavBars/>
            <Routes>
                <Route path="/" element={<Estudiantes/>}/>
            </Routes>
       </BrowserRouter>
        );
    }
}

export default AppRouters;