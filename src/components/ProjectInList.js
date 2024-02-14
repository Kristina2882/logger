import React from "react";
import PropTypes from 'prop-types';

export default function ProjectInList(props) {
    return (
        <React.Fragment>
            <h4>{props.project.name}</h4>
        </React.Fragment>
    );
}

ProjectInList.propTypes = {
    project: PropTypes.object
}