import React from 'react';
import TaskInList from './TaskInList';
import PropTypes from 'prop-types';

export default function TaskList(props) {
  return (
    <React.Fragment>
      <h2>Tasks for {props.userName}</h2>
    {
        props.taskList.map((task) => (
            <TaskInList task={task} key={task.id} onTaskClick={props.onTaskSelection}
            />
        ))
    }
    </React.Fragment>
    
  )
}

TaskList.propTypes = {
    taskList: PropTypes.array,
    onTaskClick: PropTypes.func,
    userName: PropTypes.string
}