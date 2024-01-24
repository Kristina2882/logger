import React from 'react';
import PropTypes from 'prop-types';

export default function TaskInList(props) {
  return (
    <React.Fragment>
    <div onClick={() => props.onTaskClick(props.task.id)} className='task-in-list'>
    <h3>{props.task.name}</h3>
    <h5><em>Responsible: </em>{props.task.taskResponsible}</h5>
    <h5><em>Created on: </em>{props.task.taskCreated}</h5>
    <h5><em>Deadline: </em>{props.task.taskDeadline}</h5>
    </div>
    </React.Fragment>
  )
}

TaskInList.propTypes = {
    task: PropTypes.object,
    onTaskClick: PropTypes.func
}
