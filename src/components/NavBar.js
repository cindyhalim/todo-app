import React, { useState } from "react";

import NewToDo from "./NewToDo";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function NavBar({ addTask, setFilter }) {
  const [clickNew, setClickNew] = useState(false);

  const useStyles = makeStyles({
    root: {
      width: "100%",
      marginBottom: "2em"
    },
    button: {
      margin: "2em 1em",
      color: "white",
      fontSize: "18px",
      "&:hover": {
        fontWeight: "bold"
      }
    }
  });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button className={classes.button} onClick={() => setClickNew(!clickNew)}>
        New
      </Button>

      <Button className={classes.button} onClick={() => setFilter("all")}>
        All
      </Button>
      <Button className={classes.button} onClick={() => setFilter("completed")}>
        Completed
      </Button>
      <Button className={classes.button} onClick={() => setFilter("today")}>
        Today
      </Button>
      <Button className={classes.button} onClick={() => setFilter("upcoming")}>
        Upcoming
      </Button>

      {clickNew && (
        <NewToDo
          addTask={addTask}
          clickNew={clickNew}
          setClickNew={setClickNew}
        />
      )}
    </div>
  );
}
