import { Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';



const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        // <div className ='header'>
        //     <img src={logo} alt=""/>
        //     <nav>
        //         <Link to="/shop">Shop</Link>
        //         <Link to="/review">Review</Link>
        //         <Link to="/orders">Order History</Link>
        //         <Link to="/"><span style={{ color: 'pink'}}>Welcome to {loggedInUser.name}</span></Link>
        //         <Button onClick={() => setLoggedInUser({})} variant="contained" color="primary">
        //             Sign Out
        //         </Button>
        //     </nav>
        // </div>

        <nav class="navbar ema_navbar navbar-expand-lg navbar-light bg-light">
            {/* <a class="navbar-brand" href="#"><img src={logo} alt=""/> </a> */}

            <Link class="navbar-brand" to='/'><img src={logo} alt=""/> </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <Link className='nav-link' to="/shop">Shop</Link>
                    </li>
                    <li class="nav-item">
                    <Link className='nav-link'  to="/review">Review</Link>
                    </li>
                    <li class="nav-item">
                    <Link className='nav-link' to="/orders">Order History</Link>
                    </li>
                    <li class="nav-item">
                    <Link className='nav-link' to="/"><span style={{ color: 'pink'}}>Welcome to {loggedInUser.name}</span></Link>
                    </li>
                  
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <button  onClick={() => setLoggedInUser({})} class="btn btn-outline-success my-2 my-sm-0" type="submit"> Sign Out</button>
                </form>
            </div>
        </nav>
    );
};

export default Header;