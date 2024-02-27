import React from "react";
import PropTypes from 'prop-types';

export default function EditProjectForm(props) {

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
             />
             <input
             name='projectDescr'
             type='text'
             defaultValue={props.project.projectDescr}
             />
               <input
             name='projectStartDate'
             type='date'
             defaultValue={props.project.startDate}
             />
              <input
             name='projectDeadLine'
             type='date'
             defaultValue={props.project.deadLine}
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