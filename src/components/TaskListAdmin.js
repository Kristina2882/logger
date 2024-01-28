import React, { useState } from "react";
import TaskInList from "./TaskInList";
import PropTypes from "prop-types";

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
          <ul className="user-list">
          {
            props.userList.map((user) => (
              <li>{user.name}</li>
            ))
          }      
          </ul>
        </div> 
      
    </React.Fragment>
  );
}

TaskListAdmin.propTypes = {
  taskList: PropTypes.array,
  onTaskClick: PropTypes.func,
  userList: PropTypes.array,
  loglist: PropTypes.array
};
