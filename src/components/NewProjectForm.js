import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../theme-context';

export default function NewProjectForm(props) {

    const theme = useContext(ThemeContext);

    const inputStyle = {
        backgroundColor: theme.inputBackground
    }

    function handleNewProjectSubmission(event) {
        event.preventDefault();

        props.onNewProjectCreation({
            name: event.target.projectName.value,
            deadLine: event.target.projectDeadLine.value,
            startDate: event.target.projectStartDate.value,
            projectDescr: event.target.projectDescr.value
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
             style={inputStyle}
             />
             <input
             name='projectDescr'
             type='text'
             placeholder='Enter project description'
             style={inputStyle}
             />
               <input
             name='projectStartDate'
             type='date'
             placeholder='Enter project start date'
             style={inputStyle}
             />
              <input
             name='projectDeadLine'
             type='date'
             placeholder='Enter project deadline'
             style={inputStyle}
             />
             <button type='submit' className='add-project-btn'>Add project</button>
            </form>
        </React.Fragment>
    );
}
NewProjectForm.propTypes = {
    onNewProjectCreation: PropTypes.func
}