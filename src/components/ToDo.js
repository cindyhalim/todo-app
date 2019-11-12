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
  index,
  title,
  description,
  dueDate,
  completed,
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
      {!editClicked ? (
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
                updateCompleted(index);
              }}
              onFocus={event => event.stopPropagation()}
              control={<Checkbox checked={completed ? true : false} />}
              label={title}
            />

            {dueDate > moment(Date.now()).format("MMMM DD YYYY")
              ? `Due
            ${moment(dueDate)
              .startOf("day")
              .fromNow()}`
              : ""}
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={classes.toDoDetails}>
            <Typography color="textSecondary">{description}</Typography>
            <Typography color="textSecondary">Due date: {dueDate}</Typography>
            <section>
              <EditIcon onClick={() => setEditClicked(!editClicked)} />
              <DeleteIcon onClick={() => removeTask(task)} />
            </section>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ) : (
        ""
      )}
      {editClicked ? (
        <EditToDo
          index={index}
          title={title}
          description={description}
          dueDate={dueDate}
          editClicked={editClicked}
          setEditClicked={setEditClicked}
          editTask={editTask}
          task={task}
          taskIndex={taskIndex}
          completed={completed}
        />
      ) : (
        ""
      )}
    </div>
  );
}
