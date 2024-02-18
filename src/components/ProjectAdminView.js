import React from "react";
import PropTypes from 'prop-types';
import TaskInList from "./TaskInList";

export default function ProjectAdminView(props) {
    const {project} = props;
    const tasks = props.taskList.filter(task => task.taskProject === project.name);

    return (
        <React.Fragment>
            <div className="project">
           <h2>{project.name}</h2> 
           <h3>Project deadline: {project.deadLine}</h3> 
           <button className="add-task-btn" onClick={() => props.onAddNewTaskClick()}>Add new task</button>
           <h3>Tasks</h3>
            {
                tasks.map((task) => (
                    <TaskInList
                    task={task}
                    key={task.id}
                    onTaskClick={props.onTaskSelection}
                    loglist={props.loglist}
                  />
                ))
            }
           </div>
        </React.Fragment>

    );
}

ProjectAdminView.propTypes = {
    project: PropTypes.object,
    onAddNewTaskClick: PropTypes.func,
    taskList: PropTypes.array,
    onTaskSelection: PropTypes.func,
    loglist: PropTypes.array
}