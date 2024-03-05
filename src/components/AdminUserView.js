import React from "react";
import PropTypes from 'prop-types';

export default function AdminUserView(props) {
    return (
      <React.Fragment>
        <div className="user-profile">
        <h2>{props.userProfile.firstName} {props.userProfile.surname}</h2>
        <h3><em>E-mail: </em> {props.userProfile.name}</h3>
        <h3><em>D.O.B: </em> {props.userProfile.dob}</h3>
        <h3>Status: {props.userProfile.status}</h3>
        <button className="make-admin-btn" onClick={() => props.adminButtonClick()}>Admin</button>
        <button className="make-regular-btn" onClick={() => props.regularButtonClick()}>Regular</button>
        </div>
      </React.Fragment>
    );
}

AdminUserView.propTypes = {
    userProfile: PropTypes.object,
    adminButtonClick: PropTypes.func,
    regularButtonClick: PropTypes.func
}