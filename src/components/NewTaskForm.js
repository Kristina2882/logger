import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';

export default function NewTaskForm(props) {
    function handleNewTask(event) {
     event.preventDefault();
     console.log("Form reached");
     props.onNewTaskCreation({
        name: event.target.name.value,
        description: event.target.description.value,
        id: v4()
     })
    }
  return (
    <React.Fragment>
        <form onSubmit={handleNewTask}>
          <input
          name='name'
          type='text'
          placeholder='Enter task name'
          />
          <input
          name='description'
          type='text'
          placeholder='Enter task description'
          />
           <button type='submit'>Add task</button>
        </form>
    </React.Fragment>
  )
}

NewTaskForm.propTypes = {
    onNewTaskCreation: PropTypes.func
}
