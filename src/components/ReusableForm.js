import React, {useContext} from "react";
import PropTypes from 'prop-types';
import { ThemeContext } from "../theme-context";


export default function ReusableForm(props) {

  const theme = useContext(ThemeContext);

  const inputStyles = { 
    backgroundColor: theme.inputBackground
  }

    return (
      <React.Fragment>
        <form onSubmit={props.handleFormSubmission} className="reusable-form">
          <input name="name" type="text" placeholder="Enter task name" style={inputStyles} />
          <input
            name="description"
            type="text"
            placeholder="Enter task description"
            style={inputStyles}
          />
           <select name="taskProject" style={inputStyles}>
            {props.projectList.map((project) => (
              <option value={project.id}>{project.name}</option>
            ))
            }
           </select>
          <input
            name="taskCreated"
            type="date"
            placeholder="Enter task description"
            style={inputStyles}
          />
           <input
            name="taskDeadline"
            type="date"
            placeholder="Enter task description"
            style={inputStyles}
          />
           <select name="taskResponsible"  style={inputStyles}>
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