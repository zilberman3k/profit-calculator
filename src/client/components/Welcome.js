import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'

const Welcome = ({status}) => <div className="welcome">
    <h1>Welcome to Profit Calculator</h1>
   {status === 'LOGGED_OUT' && <Fragment>
        <p className="welcome-login-text">Please Login or Register</p>
        <p className="welcome-buttons"><Link to="/signin">Login</Link> <Link to="/signup">Register</Link></p>
    </Fragment>}
    {status === 'NO_ENTRIES' && <Fragment>
        <p className="welcome-login-text">You do not have any entries yet</p>
        <p className="welcome-login-text">Please add new entry</p>
        <p className="welcome-buttons"><Link to="/add-entry" className="add-entry">Add Entry</Link></p>
    </Fragment>}
</div>;

Welcome.propTypes = {
    status: PropTypes.oneOf(['LOGGED_OUT', 'NO_ENTRIES'])
};

export default Welcome;
