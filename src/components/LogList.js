import React from 'react';
import PropTypes from 'prop-types';

export default function LogList(props) {
  return (
    <React.Fragment>
    <div>Logs</div>
    {
        props.loglist.map((log) => 
            (<h3>{log.work} - {log.hours} on {log.logDate}</h3>)
        )
    }
    </React.Fragment>
  )
}

LogList.propTypes = {
    loglist: PropTypes.array
}