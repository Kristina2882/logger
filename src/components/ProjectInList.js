import React from "react";
import PropTypes from 'prop-types';

export default function ProjectInList(props) {
    let counter;
  
    if (props.taskList.filter(task =>task.taskProject === props.project.id).length > 0) {
       counter= props.taskList.filter(task =>task.taskProject === props.project.id).length;
    }
  
    else {
      counter = 0;
    }

    return (
        <React.Fragment>
            <div className="project-in-list-gen" onClick={() => props.onProjectClick(props.project.id)}>
            <div className="project-in-list" >
            <h4>{props.project.name}</h4>
            </div>
            <div className='counter-div'>
            <div className='counter'><h5>{counter}
    </h5></div></div>
    </div>
        </React.Fragment>
    );
}

ProjectInList.propTypes = {
    project: PropTypes.object,
    onProjectClick: PropTypes.func,
    taskList: PropTypes.array
}