import React from 'react';
import PropTypes from 'prop-types';
import Log from './Log';

export default function LogList(props) {
  return (
    <React.Fragment>
    <div className='log-title'>Logs</div>
    {
        props.loglist.map((log) => 
            (<Log log={log} />)
        )
    }
    </React.Fragment>
  )
}

LogList.propTypes = {
    loglist: PropTypes.array
}