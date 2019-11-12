import React, { useState } from "react";
import moment from "moment";
import isEqual from "lodash/isEqual";

import NavBar from "./components/NavBar";
import ToDo from "./components/ToDo";

import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Complete ToDo Challenge",
      description: "use React and complete in less than 3 hours",
      dueDate: "November 11, 2019",
      completed: false
    },
    {
      title: "Buy Groceries",
      description: "milk, spinach, bread",
      dueDate: moment(Date.now()).format("MMMM DD YYYY"),
      completed: false
    }
  ]);
  const [filter, setFilter] = useState("all");

  const updateCompleted = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = !tasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = index => {
    const newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
  };

  const editTask = (index, editedTask) => {
    const newTask = [...tasks];
    newTask.splice(index, 1);
    newTask.splice(index, 0, editedTask);

    setTasks(newTask);
  };

  const findIndexOfTask = task => {
    for (let i = 0; i < tasks.length; i++) {
      if (isEqual(tasks[i], task)) {
        return i;
      }
    }
  };

  const filterByCompleted = tasks => {
    const completedTasks = tasks.filter(task => task.completed === true);
    return completedTasks.map((task, index) => (
      <ToDo
        key={index}
        updateCompleted={updateCompleted}
        removeTask={removeTask}
        editTask={editTask}
        task={task}
        taskIndex={findIndexOfTask}
      />
    ));
  };

  const filterByUpcoming = tasks => {
    const upcomingTasks = tasks.filter(
      task => task.dueDate > moment(Date.now()).format("MMMM DD YYYY")
    );

    return upcomingTasks.map((task, index) => (
      <ToDo
        key={index}
        updateCompleted={updateCompleted}
        removeTask={removeTask}
        editTask={editTask}
        task={task}
        taskIndex={findIndexOfTask}
      />
    ));
  };

  const filterByToday = tasks => {
    const todayTasks = tasks.filter(
      task => task.dueDate === moment(Date.now()).format("MMMM DD YYYY")
    );

    return todayTasks.map((task, index) => (
      <ToDo
        key={index}
        updateCompleted={updateCompleted}
        removeTask={removeTask}
        editTask={editTask}
        task={task}
        taskIndex={findIndexOfTask}
      />
    ));
  };

  const useStyles = makeStyles({
    mainContainer: {
      textAlign: "center",
      marginBottom: "2em",
      "& h3": {
        fontSize: "40px",
        marginBottom: "1em"
      }
    },
    title: {
      fontSize: "60px",
      textAlign: "center",
      paddingTop: "1em"
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <h1 className={classes.title}>ToDo App</h1>
      <NavBar
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
        setFilter={setFilter}
      />

      {filter === "all" && (
        <div>
          <h3>All</h3>
          {tasks.map((task, index) => (
            <ToDo
              key={index}
              updateCompleted={updateCompleted}
              removeTask={removeTask}
              editTask={editTask}
              task={task}
              taskIndex={findIndexOfTask}
            />
          ))}
        </div>
      )}

      {filter === "completed" && (
        <div>
          <h3>Completed</h3>
          {filterByCompleted(tasks)}
        </div>
      )}
      {filter === "today" && (
        <div>
          <h3>Today</h3>
          {filterByToday(tasks)}
        </div>
      )}
      {filter === "upcoming" && (
        <div>
          <h3>Upcoming</h3>
          {filterByUpcoming(tasks)}
        </div>
      )}
    </div>
  );
}
