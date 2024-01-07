import React from "react";
import PropTypes from 'prop-types';
import ReusableForm from "./ReusableForm";

export default function EditTaskForm(props) {
   const {task} = props; 
    
    function handleEditTask(event) {
        event.preventDefault();
        props.onEditTask({
            name: event.target.name.value,
            description: event.target.description.value,
            id: task.id
        });

    }

    return (
        <React.Fragment>
            <ReusableForm
            buttonText='Edit task'
            handleFormSubmission={handleEditTask}
            />
        </React.Fragment>
    );
}

EditTaskForm.propTypes = {
    task: PropTypes.object,
    onEditTask: PropTypes.func
}