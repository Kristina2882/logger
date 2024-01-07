import React from 'react';
import PropTypes from 'prop-types';

export default function Task(props) {
const {task} = props;

  return (
    <React.Fragment>
        
        <h2>{task.name}</h2>
        <h3><em>{task.description}</em></h3>
        
        <button onClick={() => props.onClickDelete(task.id)}>Delete task</button>
    </React.Fragment>
  )
}

Task.propTypes = {
    onTaskClick: PropTypes.func,
    task: PropTypes.object,
    onClickDelete: PropTypes.func
}
