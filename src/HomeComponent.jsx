import React from 'react';
import {Link} from "react-router-dom";

const HomeComponent = () => {
    return (
        <div>
            <h1>Click here to start the survey</h1>
            <Link to="/survey">
                <button>Start Survey</button>
            </Link>
        </div>
    )
}

export default HomeComponent;