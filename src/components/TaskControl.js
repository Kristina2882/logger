import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import Task from './Task';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';
import LogForm from './LogForm';
import { db } from './../firebase.js';
import { collection, addDoc,onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

function TaskControl() {
  const [showForm, setShowForm] = useState(false);
  const [mainTaskList, setMainTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [logging, setLogging] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, 'tasks'),
    (collectionSnapShot) => {
      const tasks = [];
      collectionSnapShot.forEach((doc) => {
        tasks.push({
          name: doc.data().name,
          description: doc.data().description,
          taskCreated: doc.data().taskCreated,
          taskDeadline: doc.data().taskDeadline,
          id: doc.id
        });
      });
      setMainTaskList(tasks);

    },
    (error) => {
     setError(error.message);
    });
    return () => unsubscribe();
  },[]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
    collection(db, 'logs'),
    (collectionSnapShot) => {
    const logs = [];
    collectionSnapShot.forEach((doc) => {
    logs.push({
      work: doc.data().work,
      hours: doc.data().hours,
      logDate: doc.data().logDate,
      taskId: doc.data().taskId,
      userName: doc.data().userName,
      id: doc.id
    });
  
    });
    setLogs(logs);
    },
    (error) => {
    setError(error.message);
    });
    return ()=> unsubscribe();
  }, []);

 const handleLogClick = () => {
  setLogging(true);
 }

 const handleEditTaskInList = async (taskToEdit) => {
  const taskRef = doc(db, 'tasks',taskToEdit.id);
  await updateDoc(taskRef, taskToEdit);
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

const handleDeleteTask = async (id) => {
  await deleteDoc(doc(db, 'tasks', id));
  const logsToDelete = logs.filter(log=> log.taskId === id);
  logsToDelete.forEach((log) => {
   deleteDoc(doc(db, 'logs',log.id));
  });
  setSelectedTask(null);
}

const handleAddLog = async (logToAdd) => {
  await addDoc(collection(db, 'logs'), logToAdd);
  setLogging(false);
}
    let currentlyVisible = null;
    let buttonText = null;
    if (error) {
    currentlyVisible = <h4>There was an error: {error}!</h4>
    }
    else if (logging) {
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
       {error ? null : <button className='main-btn' onClick={handleClick}>{buttonText}</button>}
      </React.Fragment>
    );
}
  

export default TaskControl