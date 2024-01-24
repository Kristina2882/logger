import React from 'react';
import PropTypes from 'prop-types';
import LogList from './LogList';

export default function Task(props) {
const {task} = props;

  return (
    <React.Fragment>
        <div className='task'>
        <h2>{task.name}</h2>
        <h3><em>{task.description}</em></h3>
        <h4>Responsible: {task.taskResponsible}</h4>
        <h5>Created on: {task.taskCreated} Deadline: {task.taskDeadline}</h5>
        
        <button className='delete-btn' onClick={() => props.onClickDelete(task.id)}>Delete task</button>
        <button className='edit-btn' onClick={() => props.onClickEdit()}>Edit task</button>
        <button className='add-log-btn' onClick={() => props.onClickLog()}>Log</button>
        <LogList loglist={props.loglist.filter(log => log.taskId === task.id)}/>
        </div>
    </React.Fragment>
  )
}

Task.propTypes = {
    onTaskClick: PropTypes.func,
    task: PropTypes.object,
    onClickDelete: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickLog: PropTypes.func,
    loglist: PropTypes.array
}
