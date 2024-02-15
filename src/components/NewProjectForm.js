import React from 'react';

export default function NewProjectForm() {

    function handleNewProjectSubmission(event) {
        event.preventDefault();

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