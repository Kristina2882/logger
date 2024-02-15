import React from 'react';
import PropTypes from 'prop-types';

export default function NewProjectForm(props) {

    function handleNewProjectSubmission(event) {
        event.preventDefault();

        props.onNewProjectCreation({
            name: event.target.projectName.value,
            deadLine: event.target.projectDeadLine.value
        })

    }
    return (
        <React.Fragment>
            <h2 className='new-project-h2'>New Project Form</h2>
            <form className='new-project-form' onSubmit={handleNewProjectSubmission}>
             <input
             name='projectName'
             type='text'
             placeholder='Enter project name'
             />
              <input
             name='projectDeadLine'
             type='date'
             placeholder='Enter project deadline'
             />
             <button type='submit' className='add-project-btn'>Add project</button>
            </form>
        </React.Fragment>
    );
}
NewProjectForm.propTypes = {
    onNewProjectCreation: PropTypes.func
}