import React, { useState } from "react";
import moment from "moment";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

import EditToDo from "./EditToDo";

export default function ToDoContainer({
  updateCompleted,
  removeTask,
  editTask,
  task,
  taskIndex
}) {
  const [editClicked, setEditClicked] = useState(false);

  const useStyles = makeStyles({
    toDoContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "1em",
      width: "100%"
    },
    toDo: {
      width: "70%"
    },
    toDoSummary: {
      fontSize: "20px",
      fontWeight: "bold",
      "& span": {
        fontSize: "20px",
        fontWeight: "bold"
      },
      "& div:first-child": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    },
    toDoDetails: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      "& p": {
        fontSize: "20px"
      },
      "& section": {
        textAlign: "right",
        color: "#082e78"
      }
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.toDoContainer}>
      {!editClicked && (
        <ExpansionPanel className={classes.toDo}>
          <ExpansionPanelSummary
            className={classes.toDoSummary}
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={event => {
                event.stopPropagation();
                const index = taskIndex(task);
                updateCompleted(index);
              }}
              onFocus={event => event.stopPropagation()}
              control={<Checkbox checked={task.completed ? true : false} />}
              label={task.title}
            />

            {task.completed ? "DONE" : "PENDING "}

            {task.dueDate >
              moment(new Date(Date.now())).format("MMMM DD YYYY") &&
              `(due
            ${moment(task.dueDate)
              .startOf("day")
              .fromNow()})`}
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={classes.toDoDetails}>
            <Typography color="textSecondary">{task.description}</Typography>
            <Typography color="textSecondary">
              Due date: {task.dueDate}
            </Typography>
            <section>
              <EditIcon onClick={() => setEditClicked(!editClicked)} />
              <DeleteIcon onClick={() => removeTask(task)} />
            </section>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}

      {editClicked && (
        <EditToDo
          editClicked={editClicked}
          setEditClicked={setEditClicked}
          editTask={editTask}
          task={task}
          taskIndex={taskIndex}
        />
      )}
    </div>
  );
}
