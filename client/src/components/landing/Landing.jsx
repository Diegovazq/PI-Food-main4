import React from "react";
import { Link }  from "react-router-dom";
import './Landing.css';

const Landing = () => {
    return(
        <div className="divContainer-landing">
            <div className="letters">
                <h1>We know what you like !</h1>
            </div>
            <div id="button">
                <Link to='/home'>
                    <button>Take a View</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;