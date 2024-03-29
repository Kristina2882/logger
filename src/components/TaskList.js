import React from 'react';
import TaskInList from './TaskInList';
import PropTypes from 'prop-types';
import ProjectInList from './ProjectInList';

export default function TaskList(props) {

  const listForUser = props.taskList.filter(task => task.taskResponsible === props.userName);
  const userInfo = props.userList.filter(user => user.name === props.userName)[0];
  console.log(userInfo);

  return (
    <React.Fragment>
      <div className="user-main">
        <div className="projects-list">
          <h2>All Projects</h2>
          {props.projects.map((project) => (
            <ProjectInList
              project={project}
              onProjectClick={props.onProjectSelection}
              taskList={props.taskList}
            />
          ))}
        </div>
        <div className="user-tasks">
          <h2>Tasks for {userInfo.firstName} {userInfo.surname}</h2>
          {listForUser.map((task) => (
            <TaskInList
              task={task}
              key={task.id}
              onTaskClick={props.onTaskSelection}
              loglist={props.loglist}
              projects={props.projects}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

TaskList.propTypes = {
    taskList: PropTypes.array,
    onTaskClick: PropTypes.func,
    userName: PropTypes.string,
    loglist: PropTypes.array,
    projects: PropTypes.array,
    onProjectSelection: PropTypes.func,
    userList: PropTypes.array
}