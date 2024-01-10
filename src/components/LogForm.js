import React from 'react';
import PropTypes from 'prop-types';

export default function LogForm(props) {
  const {task} = props

  function logSubmission(event) {
    event.preventDefault();
    console.log("Logging reached");
    console.log(event.target.work.value);
    console.log(event.target.hours.value);
    console.log(task.id);
  }
  return (
    <React.Fragment>
        <form className='log-form' onSubmit={logSubmission}>
         <input name="work"
                type='text'
                placeholder='Describe your work'
         />
         <input
         name="hours"
         type='text'
         placeholder='How much time did you spent?'
         />
         <button type='submit' className='log-btn'>Log hours</button>
        </form>
    </React.Fragment>
  )
}

LogForm.propTypes = {
    task: PropTypes.object
}
