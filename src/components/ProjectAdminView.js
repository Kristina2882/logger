import React from "react";
import PropTypes from 'prop-types';

export default function ProjectAdminView(props) {
    const {project} = props;
    console.log(project.deadLine);

    return (
        <React.Fragment>
           <h2>{project.name}</h2> 
           <h4>Project deadline: {project.deadLine}</h4> 
        </React.Fragment>

    );
}

ProjectAdminView.propTypes = {
    project: PropTypes.object
}