import React from "react";
import PropTypes from 'prop-types';
import TaskInList from "./TaskInList";

export default function ProjectAdminView(props) {
    const {project} = props;
    const tasks = props.taskList.filter(task => task.taskProject === project.id);

    return (
        <React.Fragment>
            <div className="project">
            <div className="project-info">  
           <h2>{project.name}</h2>
           <h3>{project.projectDescr}</h3>
           <h3>Start date: {project.startDate}</h3> 
           <h3>Project deadline: {project.deadLine}</h3> 
           <button className="delete-project-btn" onClick={()=> props.onDeleteProject(project.id)}>Delete</button>
           <button className="edit-project-btn" onClick={()=> props.onEditProject()}>Edit</button>
           <button className="add-task-btn" onClick={() => props.onAddNewTaskClick()}>Add new task</button>
           </div>  
           <div className="tasks-of-project">
           <h2>Tasks</h2>
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
           </div>
        </React.Fragment>

    );
}

ProjectAdminView.propTypes = {
    project: PropTypes.object,
    onAddNewTaskClick: PropTypes.func,
    taskList: PropTypes.array,
    onTaskSelection: PropTypes.func,
    loglist: PropTypes.array,
    onDeleteProject: PropTypes.func,
    onEditProject:PropTypes.func
}