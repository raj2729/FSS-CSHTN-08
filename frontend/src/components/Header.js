import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
// import Menu from "@material-ui/core/Menu";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";
// import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
// import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CodeIcon from '@mui/icons-material/Code';
// import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";
// import cover from "../assets/Cover.jpg";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   marginLeft: -drawerWidth,
  // },
  // contentShift: {
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // },
  title: {
    flexGrow: 1,
  },
  // heroContent: {
  //   backgroundColor: "#FEFFFF",
  //   padding: theme.spacing(4, 0, 4),
  // },
  // header: {
  //   height: "60vh",
  //   backgroundSize: "cover",
  //   backgroundPosition: "65% 50%",
  //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${cover})`,
  // },
  // heroText: {
  //   margin: "0 10% 0 10%",
  //   color: "white",
  // },
  // cardGrid: {
  //   backgroundColor: "#FEFFFF",
  //   paddingBottom: theme.spacing(8),
  // },
  // heading: {
  //   width: "100%",
  //   fontSize: 25,
  //   fontWeight: "1000",
  //   textDecoration: "underline",
  // },
  // card: {
  //   backgroundColor: "#E6E6E6",
  //   height: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  // },
  // cardMedia: {
  //   margin: "2%",
  //   paddingTop: "56.25%",
  // },
  // cardContent: {
  //   flexGrow: 1,
  // },
  // footer: {
  //   backgroundColor: theme.palette.secondary.main,
  //   padding: theme.spacing(6),
  // },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const logined = false;
  const [openslider, setOpenslider] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenslider(true);
  };

  const handleDrawerClose = () => {
    setOpenslider(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  let history = useHistory();

  //   useEffect(() => {
  // if (userInfo) {
  //   history.push("/");
  // }
  //   }, [userInfo]);

  const handleLogout = () => {
    if (userInfo) {
      history.push("/");
      dispatch(logout());
    }
  };

  return (
    <div>
      <AppBar
        style={{ background: "#F3FAFF" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openslider,
        })}
      >
        <Toolbar>
          <IconButton
            style={{ color: "black" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openslider && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Full Stack Simplified
            </Link>
          </Typography>
          {userInfo ? (
            // <div>
            //   <IconButton
            //     aria-label="account of current user"
            //     aria-controls="menu-appbar"
            //     aria-haspopup="true"
            //     onClick={handleMenu}
            //     color="inherit"
            //   >
            //     <AccountCircle />
            //   </IconButton>
            //   <Menu
            //     id="menu-appbar"
            //     anchorEl={anchorEl}
            //     anchorOrigin={{
            //       vertical: "top",
            //       horizontal: "right",
            //     }}
            //     keepMounted
            //     transformOrigin={{
            //       vertical: "top",
            //       horizontal: "right",
            //     }}
            //     open={open}
            //     onClose={handleClose}
            //   >
            //     <MenuItem onClick={handleClose}>Profile</MenuItem>
            //     <Divider />
            //     <MenuItem onClick={handleClose}>My account</MenuItem>
            //     <Divider />
            //     <Link
            //       to={`/assignments/${userInfo.data._id}`}
            //       style={{ textDecoration: "none", color: "black" }}
            //     >
            //       <MenuItem>My Assignments</MenuItem>
            //     </Link>
            //     <Divider />
            //     <Divider />
            //     {userInfo.data.isInstructor === true ? (
            //       <Link
            //         to={`/instructorcourses/${userInfo.data._id}`}
            //         style={{ textDecoration: "none", color: "black" }}
            //       >
            //         <MenuItem>My Courses</MenuItem>
            //       </Link>
            //     ) : (
            //       <Link
            //         to={`/mycourses/${userInfo.data._id}`}
            //         style={{ textDecoration: "none", color: "black" }}
            //       >
            //         <MenuItem>My Courses</MenuItem>
            //       </Link>
            //     )}
            //     <Divider />
            //     <Link
            //       to={`/contactForm`}
            //       style={{ textDecoration: "none", color: "black" }}
            //     >
            //       <MenuItem>Contact us</MenuItem>
            //     </Link>

            //     <Divider />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            //   </Menu>
            // </div>
            <div>
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="outlined" color="primary">
                  Sign Up
                </Button>
              </Link>
              &nbsp;
              <Link
                to={"/signin"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" color="primary">
                  Log In
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openslider}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          {/* <Button variant="contained" color="primary">
                  Sign Up
                </Button> */}
          <List>
            <ListItem button key="Home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Link>
        {userInfo ? (
          userInfo.data.isInstructor === true ? (
            <Link
              to={`/instructorcourses/${userInfo.data._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <List>
                <ListItem button disabled={userInfo === null} key="My Courses">
                  <ListItemIcon>
                    <CastForEducationIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Courses" />
                </ListItem>
              </List>
            </Link>
          ) : (
            <Link
              to={`/mycourses/${userInfo.data._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <List>
                <ListItem button disabled={userInfo === null} key="My Courses">
                  <ListItemIcon>
                    <CastForEducationIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Courses" />
                </ListItem>
              </List>
            </Link>
          )
        ) : (
          <List>
            <ListItem button disabled={userInfo === null} key="My Courses">
              <ListItemIcon>
                <CastForEducationIcon />
              </ListItemIcon>
              <ListItemText primary="My Courses" />
            </ListItem>
          </List>
        )}
        {userInfo ? (
          userInfo.data.isInstructor === true ? (
            <Link
              to={`/instructorAssignments/${userInfo.data._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <List>
                <ListItem
                  button
                  disabled={userInfo === null}
                  key="My Assignments"
                >
                  <ListItemIcon>
                    <CastForEducationIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Assignments" />
                </ListItem>
              </List>
            </Link>
          ) : (
            <Link
              to={`/assignments/${userInfo.data._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <List>
                <ListItem
                  button
                  disabled={userInfo === null}
                  key="My Assignments"
                >
                  <ListItemIcon>
                    <CastForEducationIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Assignments" />
                </ListItem>
              </List>
            </Link>
          )
        ) : (
          <List>
            <ListItem button disabled={userInfo === null} key="My Assignments">
              <ListItemIcon>
                <CastForEducationIcon />
              </ListItemIcon>
              <ListItemText primary="My Assignments" />
            </ListItem>
          </List>
          // </Link>
        )}
        {userInfo ? (
          userInfo.data.isInstructor === true ? (
            <Link
              to={`/myProfile`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <List>
                <ListItem button disabled={userInfo === null} key="My Profile">
                  <ListItemIcon>
                    <CastForEducationIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItem>
              </List>
            </Link>
          ) : (
            <Link
              to={`/myProfile`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <List>
                <ListItem button disabled={userInfo === null} key="My Profile">
                  <ListItemIcon>
                    <CastForEducationIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItem>
              </List>
            </Link>
          )
        ) : (
          <List>
            <ListItem button disabled={userInfo === null} key="My Profile">
              <ListItemIcon>
                <CastForEducationIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
          </List>
          // </Link>
        )}
        {/* <Link
          to={"/myProfile"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <List>
            <ListItem button disabled={userInfo === null} key="Profile">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Link> */}
        <Link
          to={"/codeEditor"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <List>
            <ListItem button key="Code Editor">
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Code Editor" />
            </ListItem>
          </List>
        </Link>
        <Link
          to={"/contactForm"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <List>
            <ListItem button key="Contact Us">
              <ListItemIcon>
                <PermPhoneMsgIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </List>
        </Link>
        <Link
          to={"/careerForm"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <List>
            <ListItem button key="Career Opportunities">
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Career Opportunities" />
            </ListItem>
          </List>
        </Link>
        <Divider />
        <Divider />
      </Drawer>
      {/* <div>
        <Button variant="outlined" color="primary">
          Sign Up
        </Button>
        &nbsp;
        <Button variant="contained" color="primary">
          Log In
        </Button>
      </div> */}
    </div>
  );
};

export default Header;
