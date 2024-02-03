import React from "react";
import PropTypes from 'prop-types';

export default function UserInList(props) {
    return (
        <React.Fragment>
        <div className="user-in-list" onClick={() => props.onUserClick(props.userProfile.id)}>
            <h4>{props.userProfile.firstName} {props.userProfile.surname}</h4>
        </div>
        </React.Fragment>
    );
}

UserInList.propTypes = {
    userProfile: PropTypes.object,
    onUserClick: PropTypes.func
}