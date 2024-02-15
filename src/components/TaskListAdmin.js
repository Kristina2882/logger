import React, { useState } from "react";
import TaskInList from "./TaskInList";
import PropTypes from "prop-types";
import UserInList from "./UserInList";
import ProjectInList from "./ProjectInList";

export default function TaskListAdmin(props) {
  const [taskList, setTaskList] = useState(props.taskList);

  function filterByResponsible(event) {
    event.preventDefault();
    const filteredUser = event.target.filterUser.value;
    console.log(filteredUser);
    const filteredList = props.taskList.filter(
      (task) => task.taskResponsible === filteredUser
    );
    setTaskList(filteredList);
  }

  return (
    <React.Fragment>
      <div className="projects-list">
        <h2>All Projects</h2>
        {props.projects.map((project) => 
         (<ProjectInList project={project}/>) 
        )}
        <button className="add-project" onClick={() => props.onAddProjectClick()}>Add project</button>
      </div>
      <div className="admin-tasks">
      <h2>All Tasks</h2>
      <form className="filter-form" onSubmit={filterByResponsible}>
        <select name="filterUser">
         {props.userList.map((user) => (
          <option value={user.name}>{user.name}</option>

         ))}
        </select>
        <button className="btn-filter-form" type="submit">
          Show tasks
        </button>
      </form>
      {taskList.map((task) => (
        <TaskInList
          task={task}
          key={task.id}
          onTaskClick={props.onTaskSelection}
          loglist={props.loglist}
        />
        ))}
        </div>
         <div className="admin-user-list">
          <h2>All users</h2> 

          {
            props.userList.map((user) => (
              <UserInList 
              userProfile={user}
              onUserClick={props.onUserSelection}
              />
            ))
          }      
          
        </div> 
      
    </React.Fragment>
  );
}

TaskListAdmin.propTypes = {
  taskList: PropTypes.array,
  onTaskClick: PropTypes.func,
  userList: PropTypes.array,
  loglist: PropTypes.array,
  onUserSelection: PropTypes.func,
  projects: PropTypes.array,
  onAddProjectClick: PropTypes.func
};
