import React, { useState } from "react";
import "date-fns";
import moment from "moment";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

export default function EditToDo({
  title,
  description,
  dueDate,
  editClicked,
  setEditClicked,
  editTask,
  task,
  taskIndex,
  completed
}) {
  const [editedTask, setEditedTask] = useState({
    title: title,
    description: description,
    dueDate: dueDate,
    completed: completed
  });

  const handleDateChange = date => {
    setEditedTask({
      ...editedTask,
      dueDate: moment(date).format("MMMM DD YYYY")
    });
  };

  const handleEditedChange = name => event => {
    setEditedTask({ ...editedTask, [name]: event.target.value });
  };

  const useStyles = makeStyles({
    edit: {
      width: "70%"
    },
    editDetails: {
      display: "flex",
      flexDirection: "column",
      "& section": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "2em"
      }
    },
    cardButtons: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#082e78"
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.edit}>
      <form
        onSubmit={event => {
          event.preventDefault();
          const index = taskIndex(task);
          editTask(index, editedTask);
          setEditClicked(!editClicked);
        }}
      >
        <ExpansionPanel className={classes.editPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Title"
              name="title"
              value={editedTask.title}
              onChange={handleEditedChange("title")}
              margin="normal"
              variant="outlined"
              required
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.editDetails}>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-static"
              label="Description"
              name="description"
              value={editedTask.description}
              onChange={handleEditedChange("description")}
              multiline
              rows="3"
              margin="normal"
              variant="outlined"
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Due Date"
                value={editedTask.dueDate}
                minDate={moment(Date.now()).format("MMMM DD YYYY")}
                onChange={event => handleDateChange(event)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                required
              />
            </MuiPickersUtilsProvider>

            <section className={classes.buttonContainer}>
              <Button className={classes.cardButtons} type="submit">
                Save
              </Button>
              <Button
                className={classes.cardButtons}
                onClick={() => setEditClicked(!editClicked)}
              >
                Cancel
              </Button>
            </section>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </form>
    </div>
  );
}
