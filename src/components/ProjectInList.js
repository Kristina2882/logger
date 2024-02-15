import React from "react";
import PropTypes from 'prop-types';

export default function ProjectInList(props) {
    return (
        <React.Fragment>
            <div className="project-in-list">
            <h4>{props.project.name}</h4>
            </div>
        </React.Fragment>
    );
}

ProjectInList.propTypes = {
    project: PropTypes.object
}