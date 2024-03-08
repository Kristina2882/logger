import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { ThemeContext } from "../theme-context";

export default function EditProjectForm(props) {

    const theme = useContext(ThemeContext);

  const inputStyles = { 
    backgroundColor: theme.inputBackground
  }

    function editProjectSubmission(event)  {
        event.preventDefault();

        props.onEditingProject({
            name: event.target.projectName.value,
            deadLine: event.target.projectDeadLine.value,
            startDate: event.target.projectStartDate.value,
            projectDescr: event.target.projectDescr.value,
            id: props.project.id

        });
    }
    return (
        <React.Fragment>
            <form className="edit-project-form" onSubmit={editProjectSubmission}>
             <input
             name='projectName'
             type='text'
             defaultValue={props.project.name}
             style={inputStyles}
             />
             <input
             name='projectDescr'
             type='text'
             defaultValue={props.project.projectDescr}
             style={inputStyles}
             />
               <input
             name='projectStartDate'
             type='date'
             defaultValue={props.project.startDate}
             style={inputStyles}
             />
              <input
             name='projectDeadLine'
             type='date'
             defaultValue={props.project.deadLine}
             style={inputStyles}
             />
             <button type='submit' className='edit-project-btn'>Save changes</button>
            </form>
        </React.Fragment>
    );
}

EditProjectForm.propTypes = {
    project: PropTypes.object,
    onEditingProject: PropTypes.func
}