import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Importing Header
import Header from "./Header";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  card: {
    maxWidth: 345,
    boxShadow:"5px 5px 5px 5px lightgray",
  },
  media: {
    height: 140,
  },
  button: {
    margin: theme.spacing(1),

    justifyContent: "center",
  },
}));

function MyCoursesUser() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const allUserCourses = useSelector((state) => state.allUserCourses);
  const { courses } = allUserCourses;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container spacing={8}>
          {courses.data.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
            <Link
                    to={`/course/${course.courseId._id}`}
                    style={{ textDecoration: "none" }}
                  >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={course.courseId.image}
                  title="MERN stack"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.courseId.name}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="body2" component="p">
                    {course.courseId.description}
                  </Typography>
                </CardContent>
                {/* </CardActionArea> */}
                <CardActions>
                 
                    {/* <Button size="large" color="primary">
                      Start Course
                    </Button> */}
                
                </CardActions>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}
export default MyCoursesUser;
