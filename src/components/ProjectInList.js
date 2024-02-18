import React from "react";
import PropTypes from 'prop-types';

export default function ProjectInList(props) {
    let counter;
  
    if (props.taskList.filter(task =>task.taskProject === props.project.name).length > 0) {
       counter= props.taskList.filter(task =>task.taskProject === props.project.name).length;
    }
  
    else {
      counter = 0;
    }

    return (
        <React.Fragment>
            <div className="project-in-list" onClick={() => props.onProjectClick(props.project.id)}>
            <h4>{props.project.name}</h4>
            </div>
            <div className='counter'><h5>{counter}
    </h5></div>
        </React.Fragment>
    );
}

ProjectInList.propTypes = {
    project: PropTypes.object,
    onProjectClick: PropTypes.func,
    taskList: PropTypes.array
}