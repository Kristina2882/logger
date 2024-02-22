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
import SignUp from './SignUp.js';
import AdminUserView from './AdminUserView.js';
import Header from './Header.js';
import HeaderSignIn from './HeaderSignIn.js';
import UserProfile from './UserProfile.js';
import NewProjectForm from './NewProjectForm.js';
import ProjectAdminView from './ProjectAdminView.js';

function TaskControl() {
  const [showForm, setShowForm] = useState(false);
  const [mainTaskList, setMainTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [logging, setLogging] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [showSignIn, setShowSignIn] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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
          taskProject: doc.data().taskProject,
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
      collection(db, 'projects'),
      (collectionSnapShot) => {
        const projects = [];
        collectionSnapShot.forEach((doc) => {
          projects.push({
            name: doc.data().name,
            deadLine: doc.data().deadLine,
            startDate: doc.data().startDate,
            projectDescr: doc.data().projectDescr,
            id: doc.id
          });
        });
        setProjectList(projects);
  
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
    setSelectedProject(null);
 }

  const handleClick = () => {
    if (selectedTask != null) {
        setShowForm(false);
        setSelectedTask(null);
        setEditing(false);
        setLogging(false);
        setSelectedProject(null);
    }
    else if (selectedProject != null) {
      setSelectedProject(null);
      setShowForm(false);
    }
    else if (selectedUser != null) {
      setSelectedUser(null);
    }
    else if (showProfile) {
      setShowProfile(false);
    }
    else if (showNewProjectForm) {
      setShowNewProjectForm(false);
    }
    else  {
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
 setActiveUser(auth.currentUser.email);
 console.log(activeUser);
}

const handleSignOut = () => {
  setShowSignIn(true);
  setActiveUser(null);
}

const handleUserSelection = (id) => {
  const selectedUserProfile = userList.filter(user => user.id === id)[0];
  setSelectedUser(selectedUserProfile);
}

const handleRegisterClick = () => {
 setShowSignUp(true);
 setShowSignIn(false);
 console.log('Register reached.');
}

const handleSignUp = async (newUser) => {
  await addDoc(collection(db, 'users'), newUser);
  setShowSignUp(false);
  setActiveUser(newUser.name);
  console.log(activeUser);
}

const handleShowProfile = () => {
  setShowProfile(true);
}

const handleAddProjectClick = () => {
  setShowNewProjectForm(true);
}

const handleAddingNewProject = async (newProject) => {
 await addDoc(collection(db, 'projects'), newProject);
 setShowNewProjectForm(false);
}

const handleChangeSelectedProject = (projectId) => {
const selectedProject = projectList.filter(project => project.id === projectId)[0];
setSelectedProject(selectedProject);
}

const handleAddTaskInProjectClick = () => {
  setShowForm(true);
  setSelectedProject(null);
}

if (!activeUser) {

  let currentUnsigned = null;

  if (showSignUp) {
    currentUnsigned = <SignUp onSignUp={handleSignUp}/>;
  }
  else if (showSignIn) {
    currentUnsigned = <SignIn onSignIn={handleSignIn} onRegisterClick={handleRegisterClick}/>
  }

  return (
    <React.Fragment>
      <Header/>
     <h2>Please sign in to access the logger.</h2>
     {currentUnsigned}
    </React.Fragment>
  );
}
else if (activeUser) {
    let currentlyVisible = null;
    let buttonText = null;
    let buttonVisible = true;

    if (auth.currentUser.email === 'admin@11.com') {

      if (selectedProject != null) {
        currentlyVisible= <ProjectAdminView project={selectedProject} onAddNewTaskClick={handleAddTaskInProjectClick} taskList={mainTaskList}
        onTaskSelection={handleChangeSelectedTask} loglist={logs} />
        buttonText='< Home';
      }

      else if (showNewProjectForm) {
        currentlyVisible= <NewProjectForm onNewProjectCreation={handleAddingNewProject}/>
        buttonText='Back to tasks';
      }
     
     else if (showProfile) {
        currentlyVisible = <UserProfile activeUser={activeUser} userList={userList}/>
        buttonText='Back to tasks';
      }

     else if (selectedUser != null) {
        currentlyVisible=<AdminUserView userProfile={selectedUser}/>
        buttonText='Back to tasks';
      }
      else if (editing) {
       currentlyVisible = <EditTaskForm task = {selectedTask} onEditTask={handleEditTaskInList} userList={userList} projectList={projectList}/>
       buttonText='Back to tasks';
      }
      else if (showForm) {
       currentlyVisible = <NewTaskForm onNewTaskCreation={handleAddingNewTask} userList={userList} projectList={projectList}/>
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
        currentlyVisible=<TaskListAdmin taskList={mainTaskList} onTaskSelection={handleChangeSelectedTask} userList={userList} loglist={logs} 
        onUserSelection={handleUserSelection} projects = {projectList} onAddProjectClick={handleAddProjectClick} onProjectSelection={handleChangeSelectedProject} />
        buttonText='Add new task';
    }
  }
  else {
    if (showProfile) {
      currentlyVisible = <UserProfile activeUser={activeUser} userList={userList}/>
      buttonText='Back to tasks';
    }
    else if (showSignUp) {
      <SignUp onSignUp={handleSignUp}/>
    }
   else if (showSignIn) {
      <SignIn onSignIn={handleSignIn} onRegisterClick={handleRegisterClick}/>
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
        currentlyVisible=<TaskList taskList={mainTaskList} onTaskSelection={handleChangeSelectedTask} userName={auth.currentUser.email} loglist={logs} 
        projects = {projectList} onProjectSelection={handleChangeSelectedProject}/>
        buttonText='Add new task';
        buttonVisible = false;
    }
  }
    return (
      <React.Fragment>
        <HeaderSignIn onSignOut={handleSignOut} activeUser={activeUser} userList={userList} onNameClick={handleShowProfile}/>
        {(error || !buttonVisible) ? null : <button className='main-btn' onClick={handleClick}>{buttonText}</button>}
        {currentlyVisible}
      </React.Fragment>
    );
}
}
  

export default TaskControl;