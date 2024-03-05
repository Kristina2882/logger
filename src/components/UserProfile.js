import React from "react";
import PropTypes from 'prop-types';

export default function UserProfile(props) {
const userName = props.activeUser;
const user = props.userList.filter(user => user.name === userName)[0];

    return (
      <React.Fragment>
        <div className="user-profile">
        <h2>{user.firstName} {user.surname}</h2>
        <h3><em>E-mail: </em> {user.name}</h3>
        <h3><em>D.O.B: </em> {user.dob}</h3>
        <h3>Status: {user.status}</h3>
        </div>
      </React.Fragment>
    );
}

UserProfile.propTypes = {
    activeUser: PropTypes.string,
    userList: PropTypes.array
}