import React from "react";
import PropTypes from 'prop-types';

export default function ReusableForm(props) {
    return (
      <React.Fragment>
        <form onSubmit={props.handleFormSubmission} className="reusable-form">
          <input name="name" type="text" placeholder="Enter task name" />
          <input
            name="description"
            type="text"
            placeholder="Enter task description"
          />
           <select name="taskProject">
            {props.projectList.map((project) => (
              <option value={project.id}>{project.name}</option>
            ))
            }
           </select>
          <input
            name="taskCreated"
            type="date"
            placeholder="Enter task description"
          />
           <input
            name="taskDeadline"
            type="date"
            placeholder="Enter task description"
          />
           <select name="taskResponsible">
            {props.userList.map((user) => (
              <option value={user.name}>{user.name}</option>
            ))
            }
           </select>


          <button className="form-btn" type="submit">{props.buttonText}</button>
        </form>
      </React.Fragment>
    );
}

ReusableForm.propTypes = {
    buttonText: PropTypes.string,
    handleFormSubmission: PropTypes.func,
    userList: PropTypes.array,
    projectList: PropTypes.array
}