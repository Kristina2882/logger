import React from 'react';
import PropTypes from 'prop-types';
import LogList from './LogList';

export default function Task(props) {
const {task} = props;
let hoursCounter = 0;

props.loglist.filter(log => log.taskId === task.id).forEach(log => {
  hoursCounter += log.hours;
});

const thisTaskProject = props.projects.filter(project => project.id === props.task.taskProject)[0];
console.log(thisTaskProject);

  return (
    <React.Fragment>
        <div className='task'>
        <h2>{task.name}</h2>
        <h3><em>{task.description}</em></h3>
        <h4>Responsible: {task.taskResponsible}</h4>
        <h5>Project: {thisTaskProject.name}</h5>
        <h5>Created on: {task.taskCreated} Deadline: {task.taskDeadline}</h5>
        
        <h5>Total hours: {hoursCounter} </h5>
        <h5>Number of logs: {props.loglist.filter(log => log.taskId === task.id).length}</h5>
        
        <button className='delete-btn' onClick={() => props.onClickDelete(task.id)}>Delete task</button>
        <button className='edit-btn' onClick={() => props.onClickEdit()}>Edit task</button>
        <button className='add-log-btn' onClick={() => props.onClickLog()}>Log</button>
        <LogList loglist={props.loglist.filter(log => log.taskId === task.id)} onLogDelete={props.onLogDelete}/>
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
    loglist: PropTypes.array, 
    onLogDelete: PropTypes.func,
    projects: PropTypes.array
}
