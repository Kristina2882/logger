import React from 'react';
import PropTypes from 'prop-types';

export default function TaskInList(props) {
  return (
    <React.Fragment>
    <div onClick={() => props.onTaskClick(props.task.id)}>
    <h3>{props.task.name}</h3>
    </div>
    </React.Fragment>
  )
}

TaskInList.propTypes = {
    task: PropTypes.object,
    onTaskClick: PropTypes.func
}
