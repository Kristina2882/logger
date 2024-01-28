import React from 'react';
import TaskInList from './TaskInList';
import PropTypes from 'prop-types';

export default function TaskList(props) {

  const listForUser = props.taskList.filter(task => task.taskResponsible === props.userName);

  return (
    <React.Fragment>
      <h2>Tasks for {props.userName}</h2>
    {
        listForUser.map((task) => (
            <TaskInList task={task} key={task.id} onTaskClick={props.onTaskSelection} loglist={props.loglist}
            />
        ))
    }
    </React.Fragment>
    
  )
}

TaskList.propTypes = {
    taskList: PropTypes.array,
    onTaskClick: PropTypes.func,
    userName: PropTypes.string,
    loglist: PropTypes.array
}