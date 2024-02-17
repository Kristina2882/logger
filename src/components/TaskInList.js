import React from 'react';
import PropTypes from 'prop-types';

export default function TaskInList(props) {
  let counter;
  let logUpd;

  if (props.loglist.filter(log =>log.taskId === props.task.id).length > 0) {
     counter= props.loglist.filter(log =>log.taskId === props.task.id).length;
     logUpd = props.loglist.filter(log =>log.taskId === props.task.id)[counter-1].formattedWaitTime;
  }

  else {
    counter = 0;
    logUpd = ''
  }

  return (
    <React.Fragment>
    <div className='task-in-list-gen'>
    <div onClick={() => props.onTaskClick(props.task.id)} className='task-in-list'>
    <h3>{props.task.name}</h3>
    <h5><em>Responsible: </em>{props.task.taskResponsible}</h5>
    <h5><em>Project:</em> {props.task.taskProject}</h5>
    <h5><em>Created on: </em>{props.task.taskCreated}</h5>
    <h5><em>Deadline: </em>{props.task.taskDeadline}</h5>
    <h5><em>Log updated: </em>{logUpd} </h5>
    </div>
    <div className='counter'><h5>{counter}
    </h5></div>
    </div>
    </React.Fragment>
  )
}

TaskInList.propTypes = {
    task: PropTypes.object,
    onTaskClick: PropTypes.func,
    loglist: PropTypes.array
}
