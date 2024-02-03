import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import Task from './Task';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';
import LogForm from './LogForm';
import { db, auth } from './../firebase.js';
import { collection, addDoc,onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import UserTaskView from './UserTaskView.js';
import TaskListAdmin from './TaskListAdmin.js';
import { formatDistanceToNow } from 'date-fns';
import SignIn from './SignIn.js';
import SignOut from './SignOut.js';
import AdminUserView from './AdminUserView.js';


function TaskControl() {
  const [showForm, setShowForm] = useState(false);
  const [mainTaskList, setMainTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [logging, setLogging] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
   function updateLogElapsedWaitTime() {
    const newLogs = logs.map((log) => {
     const newFormattedWaitTime = formatDistanceToNow(log.logTime);
     return {...log, formattedWaitTime: newFormattedWaitTime}
    });
    setLogs(newLogs);
   }
   const waitTimeUpdateTimer = setInterval(() => 
   updateLogElapsedWaitTime(),
   60000
   );
   return function cleanUp() {
    clearInterval(waitTimeUpdateTimer);
   }

  }, [logs]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (collectionSnapShot) => {
        const users = [];
        collectionSnapShot.forEach((doc) => {
          users.push({
            name: doc.data().name,
            firstName: doc.data().firstName,
            surname: doc.data().surname,
            dob: doc.data().dob,
            id: doc.id
          })
        });
        setUserList(users);
      },
      (error) => {
        setError(error.message);
       });
  
    return () => unsubscribe();
  }, []);

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
          taskResponsible: doc.data().taskResponsible,
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
    const queryByTimestamp = query(
      collection(db, "logs"), 
      orderBy('logTime')
    );

    const unsubscribe = onSnapshot(
    queryByTimestamp,
    (collectionSnapShot) => {
    const logs = [];
    collectionSnapShot.forEach((doc) => {
    const logTime = doc.get('logTime', {serverTimestamps: 'estimate'}).toDate();
    const jsDate = new Date(logTime);
    logs.push({
      work: doc.data().work,
      hours: doc.data().hours,
      logTime: jsDate,
      formattedWaitTime: formatDistanceToNow(jsDate),
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
    else if (selectedUser != null) {
      setSelectedUser(null);
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

const handleLogDelete = async (id) => {
  await deleteDoc(doc(db, 'logs', id));
}

const handleSignIn = () => {
 setShowSignIn(false);
}

const handleSignOut = () => {
  setShowSignIn(true);
}

const handleUserSelection = (id) => {
  const selectedUserProfile = userList.filter(user => user.id === id)[0];
  setSelectedUser(selectedUserProfile);
}


if (auth.currentUser == null) {
  return (
    <React.Fragment>
     <h2>Please sign in to access the logger.</h2>
     <SignIn onSignIn={handleSignIn}/>
    </React.Fragment>
  );
}
else if (auth.currentUser != null) {
    let currentlyVisible = null;
    let buttonText = null;

    console.log(auth.currentUser.email);
    let testBool = auth.currentUser.email === 'admin@11.com';
    console.log(testBool);

    if (auth.currentUser.email === 'admin@11.com') {
      if (showSignIn) {
        <SignIn onSignIn={handleSignIn}/>
      }
      else if (selectedUser != null) {
        currentlyVisible=<AdminUserView userProfile={selectedUser}/>
        buttonText='Back to tasks';
      }
      else if (editing) {
       currentlyVisible = <EditTaskForm task = {selectedTask} onEditTask={handleEditTaskInList} userList={userList}/>
       buttonText='Back to tasks';
      }
      else if (showForm) {
       currentlyVisible = <NewTaskForm onNewTaskCreation={handleAddingNewTask} userList={userList}/>
       buttonText='Back to tasks';
      }
 
      else if (error) {
      currentlyVisible = <h4>There was an error: {error}!</h4>
      }
      else if (logging) {
      currentlyVisible= <LogForm task={selectedTask} onAddLog={handleAddLog} userName={auth.currentUser.email}/>
      buttonText='Back to tasks';
      }
      else if (selectedTask != null) {
        currentlyVisible = <Task task={selectedTask} onClickDelete={handleDeleteTask} onClickEdit={handleEditClick} onClickLog={handleLogClick} loglist={logs} onLogDelete={handleLogDelete}/>
        buttonText='Back to tasks';
      }
   
      else {
        currentlyVisible=<TaskListAdmin taskList={mainTaskList} onTaskSelection={handleChangeSelectedTask} userList={userList} loglist={logs} onUserSelection={handleUserSelection}/>
        buttonText='Add new task';
    }
  }
  else {
    if (showSignIn) {
      <SignIn onSignIn={handleSignIn}/>
    }
    else if (error) {
      currentlyVisible = <h4>There was an error: {error}!</h4>
      }
      else if (logging) {
      currentlyVisible= <LogForm task={selectedTask} onAddLog={handleAddLog} userName={auth.currentUser.email}/>
      buttonText='Back to tasks';
      }
      else if (selectedTask != null) {
        currentlyVisible = <UserTaskView task={selectedTask} onClickLog={handleLogClick} loglist={logs} onLogDelete={handleLogDelete}/>
        buttonText='Back to tasks';
      }
   
      else {
        currentlyVisible=<TaskList taskList={mainTaskList} onTaskSelection={handleChangeSelectedTask} userName={auth.currentUser.email} loglist={logs}/>
        buttonText='Add new task';
    }
  }
    return (
      <React.Fragment>
         <SignOut onSignOut={handleSignOut}/>
        {currentlyVisible}
       {error ? null : <button className='main-btn' onClick={handleClick}>{buttonText}</button>}
      </React.Fragment>
    );
}
}
  

export default TaskControl;