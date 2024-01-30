import React from 'react';
import PropTypes from 'prop-types';
import {serverTimestamp} from 'firebase/firestore';

export default function LogForm(props) {
  const {task} = props

  function logSubmission(event) {
    event.preventDefault();
    props.onAddLog({
      work: event.target.work.value,
      hours: parseInt(event.target.hours.value),
      logTime: serverTimestamp(),
      userName: props.userName,
      taskId: task.id 
    })
  }
  return (
    <React.Fragment>
        <form className='log-form' onSubmit={logSubmission}>
        <input name="userName"
                type='text'
                placeholder= {props.userName} readOnly
         />

         <input name="work"
                type='text'
                placeholder='Describe your work'
         />
         <input
         name="hours"
         type='number'
         placeholder='How much time did you spent?'
         />
         <button type='submit' className='log-btn'>Log hours</button>
        </form>
    </React.Fragment>
  )
}

LogForm.propTypes = {
    task: PropTypes.object,
    onAddLog: PropTypes.func,
    userName: PropTypes.string
}
