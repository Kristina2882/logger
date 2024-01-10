import React from 'react';
import PropTypes from 'prop-types';

export default function Task(props) {
const {task} = props;

  return (
    <React.Fragment>
        <div className='task'>
        <h2>{task.name}</h2>
        <h3><em>{task.description}</em></h3>
        
        <button className='delete-btn' onClick={() => props.onClickDelete(task.id)}>Delete task</button>
        <button className='edit-btn' onClick={() => props.onClickEdit()}>Edit task</button>
        <button className='add-log-btn' onClick={() => props.onClickLog()}>Log</button>
        </div>
    </React.Fragment>
  )
}

Task.propTypes = {
    onTaskClick: PropTypes.func,
    task: PropTypes.object,
    onClickDelete: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickLog: PropTypes.func
}
