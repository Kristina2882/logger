import React, { useState } from 'react';
import TaskList from './TaskList';
import Task from './Task';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';
import LogForm from './LogForm';
import db from './../firebase';
import { collection, addDoc } from 'firebase/firestore';

function TaskControl() {
  const [showForm, setShowForm] = useState(false);
  const [mainTaskList, setMainTaskList] = useState([
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
            ]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [logging, setLogging] = useState(false);
  const [logs, setLogs] = useState([]);

 const handleLogClick = () => {
  setLogging(true);
 }

 const handleEditTaskInList = (taskToEdit) => {
  const newTaskList = mainTaskList.filter(task => task.id !== selectedTask.id)
                      .concat(taskToEdit);
  setMainTaskList(newTaskList);
  setSelectedTask(null);
  setEditing(false);
 }

 const handleEditClick = () => {
  setEditing(true);
 }

 const handleChangeSelectedTask = (id) => {
    const task = mainTaskList.filter(task => task.id === id)[0];
    setSelectedTask(task);
 }

  const handleClick = () => {
    if (selectedTask != null) {
        setShowForm(false);
        setSelectedTask(null);
        setEditing(false);
        setLogging(false);
    }
    else {
      setShowForm(!showForm);
  }
}

const handleAddingNewTask = async (newTask) => {
await addDoc(collection(db, 'tasks'), newTask);
setShowForm(false);
}

const handleDeleteTask = (id) => {
  const newTaskList = mainTaskList.filter(task => task.id !== id);
  setMainTaskList(newTaskList);
  setSelectedTask(null);
}

const handleAddLog = (logToAdd) => {
  const updatedLogs = logs.concat(logToAdd);
  setLogging(false);
  setLogs(updatedLogs);
}
    let currentlyVisible = null;
    let buttonText = null;
    if (logging) {
    currentlyVisible= <LogForm task={selectedTask} onAddLog={handleAddLog}/>
    buttonText='Back to tasks';
    }
    else if (editing) {
     currentlyVisible = <EditTaskForm task = {selectedTask} onEditTask={handleEditTaskInList}/>
     buttonText='Back to tasks';
    }
    else if (selectedTask != null) {
      currentlyVisible = <Task task={selectedTask} onClickDelete={handleDeleteTask} onClickEdit={handleEditClick} onClickLog={handleLogClick} loglist={logs}/>
      buttonText='Back to tasks';
    }
    else if (showForm) {
     currentlyVisible = <NewTaskForm onNewTaskCreation={handleAddingNewTask}/>
     buttonText='Back to tasks';
    }
    else {
        currentlyVisible=<TaskList taskList={mainTaskList} onTaskSelection={handleChangeSelectedTask}/>
        buttonText='Add new task';
    }
    return (
      <React.Fragment>
        {currentlyVisible}
        <button className='main-btn' onClick={handleClick}>{buttonText}</button>
      </React.Fragment>
    );
}
  

export default TaskControl