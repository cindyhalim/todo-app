import React, { useState } from "react";
import moment from "moment";
import "date-fns";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { makeStyles } from "@material-ui/core/styles";

export default function NewToDo({ addTask, clickNew, setClickNew }) {
  const [date, setDate] = useState(moment(Date.now()).format("MMMM DD YYYY"));

  const handleDateChange = date => {
    setDate(moment(date).format("MMMM DD YYYY"));
  };

  const useStyles = makeStyles({
    root: {
      width: "75%",
      margin: "auto"
    },
    newToDo: {
      display: "flex",
      flexDirection: "column",
      padding: "2em"
    },
    cardActions: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    cardButtons: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#082e78",
      marginBottom: "2em"
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form
        onSubmit={event => {
          event.preventDefault();
          addTask(event, date);
          setClickNew(!clickNew);
        }}
      >
        <Card>
          <CardContent className={classes.newToDo}>
            <TextField
              id="standard-basic"
              label="Title"
              name="title"
              margin="normal"
              variant="outlined"
              required
            />
            <br></br>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              name="description"
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
                value={date}
                minDate={moment(Date.now()).format("MMMM DD YYYY")}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                required
              />
            </MuiPickersUtilsProvider>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button className={classes.cardButtons} type="submit">
              Create
            </Button>
            <Button
              className={classes.cardButtons}
              onClick={() => setClickNew(!clickNew)}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}
