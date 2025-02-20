import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MdDone } from "react-icons/all";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Dialog,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {  addLastComment } from "../../redux/features/notes";

import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[9],
    padding: theme.spacing(2, 4, 3),
  },
  BtnNote: {
    transition: "all .3s",
    color: "#fff",
    "&:hover": {
      color: "#000841",
    },
  },
  BtnNoteId: {
    textDecoration: "none",
    position: "relative",
    padding: "0",
    background: "#000841",
    color: "#fff",
    borderRadius: "5px",
    transition: "all .3s",
    "&:hover": {
      background: "transparent",
      border: "2px solid #000841",
      color: "#000841",
      transform: "scale(1.02)",
    },
  },
  BtnNoteIdEdit: {
    textDecoration: "none",
    position: "relative",
    background: "#000841",
    color: "#fff",
    borderRadius: "5px",
    transition: "all .3s",
    "&:hover": {
      background: "transparent",
      border: "2px solid #000841",
      color: "#000841",
      transform: "scale(1.02)",
    },

    padding: 10,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cardMedia: {
    width: 600,
    objectFit: "cover",
  },
  cardContent: {
    flexGrow: 1,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    width: "95%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 900,
    height: 65,
    marginTop: 20,
  },
  textFieldModal: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 900,
    height: 65,
    marginTop: 20,
  },
  textFieldData: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    height: 45,
    marginTop: 60,
  },
  inputStyle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "98%",
    marginTop: 10,
  },
  mediaContainer: {
    display: "flex",
    marginTop: 30,
    justifyContent: "space-evenly",
  },
  editText: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    textAlign: "center",
    marginTop: 30,
  },
  selectEmpty: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 5,
    marginTop: 30,
  },
  selectEmptyCategory: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    height: 45,
    marginTop: 60,
  },
  AddressInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 900,
    height: 15,
    marginTop: 50,
  },
  fixedHeight: {
    height: 300,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompletedNote({ notes }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [lastComment, setLastComment] = React.useState("");
  
  const handleEdit = async () => {
    await dispatch(addLastComment(notes._id, { lastComment })).then(() => {
      handleClose();
    });
  };

  const handleChangeComment = (even) => {
    setLastComment(even.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.BtnNoteIdEdit}
        onClick={handleClickOpen}
      >
        <MdDone />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Добавить итоговый комментарий
            </Typography>
            <Button autoFocus color="inherit" onClick={handleEdit}>
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.mediaContainer}>
          <Grid item xs={12} md={8} lg={7}>
            <Paper elevation={3}>
              <div className={classes.editText}>
                <TextField
                  id="outlined-multiline-static"
                  className={classes.inputStyle}
                  label="Введите комментарий*"
                  multiline
                  rows={1}
                  variant="outlined"
                  value={lastComment}
                  onChange={handleChangeComment}
                />
              </div>
            </Paper>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
