import React from "react";
import PropTypes from 'prop-types';

export default function ProjectAdminView(props) {
    const {project} = props;
    console.log(project.deadLine);

    return (
        <React.Fragment>
            <div className="project">
           <h2>{project.name}</h2> 
           <h3>Project deadline: {project.deadLine}</h3> 
           <button className="add-task-btn" onClick={() => props.onAddNewTaskClick()}>Add new task</button>
           </div>
        </React.Fragment>

    );
}

ProjectAdminView.propTypes = {
    project: PropTypes.object,
    onAddNewTaskClick: PropTypes.func
}