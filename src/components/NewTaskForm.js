import React from 'react';
import PropTypes from 'prop-types';
import ReusableForm from './ReusableForm';

export default function NewTaskForm(props) {
    function handleNewTask(event) {
     event.preventDefault();
     console.log("Form reached");
     props.onNewTaskCreation({
        name: event.target.name.value,
        description: event.target.description.value,
        taskProject: event.target.taskProject.value,
        taskCreated: event.target.taskCreated.value,
        taskDeadline: event.target.taskDeadline.value,
        taskResponsible: event.target.taskResponsible.value
     })
    }
  return (
    <React.Fragment>
     <ReusableForm
     buttonText = 'Add new task'
     handleFormSubmission = {handleNewTask}
     userList={props.userList}
     projectList={props.projectList}
     />
    </React.Fragment>
  )
}

NewTaskForm.propTypes = {
    onNewTaskCreation: PropTypes.func,
    userList: PropTypes.array,
    projectList: PropTypes.array
}
