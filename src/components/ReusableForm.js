import React from "react";
import PropTypes from 'prop-types';

export default function ReusableForm(props) {
    return (
      <React.Fragment>
        <form onSubmit={props.handleFormSubmission} className="reusable-form">
          <input name="name" type="text" placeholder="Enter task name" />
          <input
            name="description"
            type="text"
            placeholder="Enter task description"
          />
          <button className="form-btn" type="submit">{props.buttonText}</button>
        </form>
      </React.Fragment>
    );
}

ReusableForm.propTypes = {
    buttonText: PropTypes.string,
    handleFormSubmission: PropTypes.func
}