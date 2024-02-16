import React from 'react';
import TaskInList from './TaskInList';
import PropTypes from 'prop-types';
import ProjectInList from './ProjectInList';

export default function TaskList(props) {

  const listForUser = props.taskList.filter(task => task.taskResponsible === props.userName);

  return (
    <React.Fragment>
       <div className="projects-list">
        <h2>All Projects</h2>
        {props.projects.map((project) => 
         (<ProjectInList project={project}/>) 
        )}
      </div>
      <div className='user-tasks'>
      <h2>Tasks for {props.userName}</h2>
    {
        listForUser.map((task) => (
            <TaskInList task={task} key={task.id} onTaskClick={props.onTaskSelection} loglist={props.loglist}
            />
        ))
    }
    </div>
    </React.Fragment>
    
  )
}

TaskList.propTypes = {
    taskList: PropTypes.array,
    onTaskClick: PropTypes.func,
    userName: PropTypes.string,
    loglist: PropTypes.array,
    projects: PropTypes.array
}