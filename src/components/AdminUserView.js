import React from "react";
import PropTypes from 'prop-types';

export default function AdminUserView(props) {
    return (
      <React.Fragment>
        <div className="user-profile">
        <h2>{props.userProfile.firstName} {props.userProfile.surname}</h2>
        <h3><em>E-mail: </em> {props.userProfile.name}</h3>
        <h3><em>D.O.B: </em> {props.userProfile.dob}</h3>
        </div>
      </React.Fragment>
    );
}

AdminUserView.propTypes = {
    userProfile: PropTypes.object
}