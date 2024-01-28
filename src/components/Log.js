import React from 'react';
import PropTypes from 'prop-types';

export default function Log(props) {

  const {log} = props;
  return (
    <React.Fragment>
    <div className='log-general'>
    <div className='logged'> <h4>{log.work}</h4> </div>
    <div className='log-hours'><h4> {log.userName}  {log.hours}h on {log.logDate}</h4><div className='log-delete' onClick={() =>props.onLogDelete(log.id)}><h4>X</h4></div> </div> 
    
    </div>
    </React.Fragment>
  )
}

Log.propTypes = {
  log: PropTypes.object,
  onLogDelete: PropTypes.func
}