import React, { Component } from 'react';
import TaskList from './TaskList';
import Task from './Task';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';
import LogForm from './LogForm';

export class TaskControl extends Component {
 
 constructor(props) {
    super(props);
    this.state = {
        mainTaskList: [
            {
                name: 'Admin task',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
                id:1
            },
            {
                name: 'Project-X',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
                id: 2
            },
            {
                name: 'Project-PP',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
                id: 3
            }
        ],
        selectedTask: null,
        showTask: false,
        showForm: false,
        editing: false,
        logging: false,
        logs: []
    }
 }

 handleLogClick = () => {
  this.setState({
    logging: true
  });
 }

 handleEditTaskInList = (taskToEdit) => {
  const newTaskList = this.state.mainTaskList.filter(task => task.id !== this.state.selectedTask.id)
                      .concat(taskToEdit);
  this.setState({
    mainTaskList: newTaskList,
    selectedTask: null,
    editing: false
  });
 }

 handleEditClick = () => {
  this.setState({
   editing:true
  });
 }

 handleChangeSelectedTask = (id) => {
    const task = this.state.mainTaskList.filter(task => task.id === id)[0];
  this.setState({
    selectedTask: task
  })
 }

  handleClick = () => {
    if (this.state.selectedTask != null) {
        this.setState({
            showForm: false,
            selectedTask:null,
            editing:false,
            logging: false
        })
    }
    else {
    this.setState(prevState => ({
        showForm: !prevState.showForm
    })
    )}
}

handleAddingNewTask = (newTask) => {
    const newTaskList = this.state.mainTaskList.concat(newTask);
    this.setState({
        mainTaskList: newTaskList,
        showForm:false
    })
}

handleDeleteTask = (id) => {
  const newTaskList = this.state.mainTaskList.filter(task => task.id !== id);
  this.setState({
   mainTaskList: newTaskList,
   selectedTask: null
  });
}

handleAddLog = (logToAdd) => {
  const updatedLogs = this.state.logs.concat(logToAdd);
  this.setState({
    logs: updatedLogs,
    logging: false
  });
}
  render() {
    let currentlyVisible = null;
    let buttonText = null;
    if (this.state.logging) {
    currentlyVisible= <LogForm task={this.state.selectedTask} onAddLog={this.handleAddLog}/>
    buttonText='Back to tasks';
    }
    else if (this.state.editing) {
     currentlyVisible = <EditTaskForm task = {this.state.selectedTask} onEditTask={this.handleEditTaskInList}/>
     buttonText='Back to tasks';
    }
    else if (this.state.selectedTask != null) {
      currentlyVisible = <Task task={this.state.selectedTask} onClickDelete={this.handleDeleteTask} onClickEdit={this.handleEditClick} onClickLog={this.handleLogClick} loglist={this.state.logs}/>
      buttonText='Back to tasks';
    }
    else if (this.state.showForm) {
     currentlyVisible = <NewTaskForm onNewTaskCreation={this.handleAddingNewTask}/>
     buttonText='Back to tasks';
    }
    else {
        currentlyVisible=<TaskList taskList={this.state.mainTaskList} onTaskSelection={this.handleChangeSelectedTask}/>
        buttonText='Add new task';
    }
    return (
      <React.Fragment>
        {currentlyVisible}
        <button className='main-btn' onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    )
  }
}

export default TaskControl