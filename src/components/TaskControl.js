import React, { Component } from 'react';
import TaskList from './TaskList';
import Task from './Task';
import NewTaskForm from './NewTaskForm';

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
        showForm: false
    }
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
            selectedTask:null
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
  render() {
    let currentlyVisible = null;
    let buttonText = null;
    if (this.state.selectedTask != null) {
      currentlyVisible = <Task task={this.state.selectedTask} onClickDelete={this.handleDeleteTask}/>
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
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    )
  }
}

export default TaskControl