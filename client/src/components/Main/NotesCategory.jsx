import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loadCategoryNotes } from "../../redux/features/notes";
import Grid from "@material-ui/core/Grid";
import { NavLink, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Preloader from '../Preloader';

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
  paperCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardGrid: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(8),
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: "20px"
  },
  card: {
    padding: "5px",
    width: "300px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "5px",
  },
  cardComment: {
    padding: '5px',
    width: '300px',
    height: '350px',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: '5px',
    border: "5px solid green",
    backgroundColor: "lightgreen"
  },
  cardMedia: {
    paddingTop: "56.25%",
    borderRadius: "3px",
  },
  cardContent: {
    padding: "5px",
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
  BtnNote: {
    transition: "all .3s",
    color: "#fff",
    "&:hover": {
      color: "#000841",
    },
  },
  textTitle: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  textName: {
    fontSize: "14px",
    fontStyle: "italic"
  },
  gridCategory: {
    width: "100%",
    backgroundColor: "#000841",
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "5px"
  },
  category: {
    display: "flex",
    justifyContent: "space-between"
  },
  divCategory: {
    padding: "20px 30px"
  },
  cardH2: {
    fontWeight: 'bold',
    marginBottom: "20px"
  },
  linkCss: {
    textDecoration: 'none',
    color: "#fff",
    fontWeight: "bold"
  }
}));

function NotesCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items
    .sort(function(a,b){
      return new Date(b.createdAt) - new Date(a.createdAt)
    }));
  const category = useSelector((state) => state.categories.items);
  const classes = useStyles();
  const loading = useSelector((state) => state.notes.loading);

  useEffect(() => {
    dispatch(loadCategoryNotes(id));
  }, [dispatch, id]);

  useEffect(() => {
    document.title = "ВЦ 'Добро'";
  });
  if (loading) {
    return <Preloader />;
  }
  return (
    <Container className={classes.cardGrid} maxWidth="1440px">
      <h2 className={classes.cardH2}>
        Категории
      </h2>
      <Grid container spacing={4} className={classes.gridCategory}>
        <div className={classes.category}>
          {category?.map((item) => {
            return (
              <div className={classes.divCategory}>
                <NavLink
                  to={`/notes/category/${item._id}`}
                  className={classes.linkCss}
                >
                  {" "}
                  {item.title}{" "}
                </NavLink>
              </div>
            );
          })}
        </div>
      </Grid>
      <Grid container spacing={4} className={classes.grid}>
        {notes.map(item => {
            return item.lastComment !== undefined ? (
              <Grid className={classes.notesGrid} item key={item} xs={3}>
                <Card className={classes.cardComment}>
                  <CardMedia
                    className={classes.cardMedia}
                    title="Image title"
                    image={`/${item.pathToImage}`}
                  />
                  <CardContent className={classes.cardContent}>
                    <Box>
                      <Typography gutterBottom variant="h6" component="h5">
                        <div className={classes.textTitle}>{item.title}</div>
                      </Typography>
                      <Typography gutterBottom variant="h7" component="h5">
                        <div className={classes.textName}>Автор поста: {item.user.name}</div>
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <NavLink className={classes.BtnNoteId} to={`/notes/${item._id}`}>
                      <Button className={classes.BtnNote}>
                        Подробнее
                      </Button>
                    </NavLink>
                  </CardActions>
                </Card>
              </Grid>
            ) : (
              <Grid className={classes.notesGrid} item key={item} xs={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    title="Image title"
                    image={`/${item.pathToImage}`}
                  />
                  <CardContent className={classes.cardContent}>
                    <Box>
                      <Typography gutterBottom variant="h6" component="h5">
                        <div className={classes.textTitle}>{item.title}</div>
                      </Typography>
                      <Typography gutterBottom variant="h7" component="h5">
                        <div className={classes.textName}>Автор поста: {item.user.name}</div>
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <NavLink className={classes.BtnNoteId} to={`/notes/${item._id}`}>
                      <Button className={classes.BtnNote}>
                        Подробнее
                      </Button>
                    </NavLink>
                  </CardActions>
                </Card>
              </Grid>
            )
          }
        )}
      </Grid>
    </Container>
  );
}

export default NotesCategory;
