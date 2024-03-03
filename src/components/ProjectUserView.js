import React from "react";
import PropTypes from 'prop-types';

export default function ProjectUserView(props) {
    const {project} = props;
    return (
        <React.Fragment>
         <div className="user-project-info"> 
          <div className="user-project-name">
          <h2>{project.name}</h2>
            </div> 
           <h3>{project.projectDescr}</h3>
           <h3>Start date: {project.startDate}</h3> 
           <h3>Project deadline: {project.deadLine}</h3> 
           </div>
        </React.Fragment>
    );
}

ProjectUserView.propTypes = {
    project: PropTypes.object
}