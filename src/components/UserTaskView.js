import React from 'react';
import PropTypes from 'prop-types';
import LogList from './LogList';

export default function UserTaskView(props) {
const {task} = props;

  return (
    <React.Fragment>
        <div className='task'>
        <h2>{task.name}</h2>
        <h3><em>{task.description}</em></h3>
        <h5>Created on: {task.taskCreated} Deadline: {task.taskDeadline}</h5>
        <button className='add-log-btn' onClick={() => props.onClickLog()}>Log</button>
        <LogList loglist={props.loglist.filter(log => log.taskId === task.id)}/>
        </div>
    </React.Fragment>
  )
}

UserTaskView.propTypes = {
    onTaskClick: PropTypes.func,
    task: PropTypes.object,
    onClickLog: PropTypes.func,
    loglist: PropTypes.array
}
