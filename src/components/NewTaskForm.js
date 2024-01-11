import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';
import ReusableForm from './ReusableForm';

export default function NewTaskForm(props) {
    function handleNewTask(event) {
     event.preventDefault();
     console.log("Form reached");
     props.onNewTaskCreation({
        name: event.target.name.value,
        description: event.target.description.value,
        taskCreated: event.target.taskCreated.value,
        taskDeadline: event.target.taskDeadline.value,
        id: v4()
     })
    }
  return (
    <React.Fragment>
     <ReusableForm
     buttonText = 'Add new task'
     handleFormSubmission = {handleNewTask}
     />
    </React.Fragment>
  )
}

NewTaskForm.propTypes = {
    onNewTaskCreation: PropTypes.func
}
