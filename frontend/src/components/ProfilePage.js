import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import coursesEnrolled from "../assets/courses-enrolled.svg";
import coursesCompleted from "../assets/courses-completed.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";

const useStyles = makeStyles({
  profileCard: {
    width: "85% !important",

    /* display: flex !important; */
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "30px auto !important",
    // margin: "2% !important",
    boxShadow: "5px 5px 5px 5px lightgrey !important",
    borderRadius: "30px !important",
    zIndex: "0",
    marginLeft: "8% !important",
  },
  profilePic: {
    borderRadius: "999px",
    width: "150px",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "70px auto !important",
    position: "relative",
    bottom: "10px",
    padding: "1%",
    border: "5px solid gray",
    zIndex: "1",
  },
  name: {
    textAlign: "center",
    position: "relative",
    bottom: "30px",
  },
  description: {
    padding: "5%",
    marginTop: "-50px",
    marginLeft: "20px",
  },
  table: {
    minWidth: "400 !important",
    width: "70% !important",
    padding: "4% !important",
    /* margin: 5%; */
    boxShadow: "5px 5px 5px 5px lightgrey !important",
    borderRadius: "30px !important",
    display: "flex !important",
    /* justify-content: center !important; */
    /* align-items: center !important; */
    margin: "5% auto !important",
    /* height: 400px; */
  },
  tableText: {
    fontWeight: "bold",
    color: "rgb(0, 153, 255)",
    /* line-height: -10px; */
  },
  editBtn: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "5px auto !important",
    borderRadius: "999px",
  },
  smallCard: {
    width: "70%",
    /* display: flex !important; */
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "10px auto !important",
    boxShadow: " 5px 5px 5px 5px lightgrey !important",
    borderRadius: "30px !important",
    padding: "3%",
    height: "50%",
    paddingLeft: "50px",
    /* margin-bottom: 100px; */
  },
  numOfCourses: {
    fontSize: "60px",
    position: "relative",
    bottom: "80px",
  },
  smallCardImg: {
    width: "200px",
    /* z-index: 100;
     */
    position: "relative",
    bottom: "200px",
    right: "-100px",
    margin: "5%",
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   //   const s = typeof name;
//   // console.log(name);
//   return { name, calories, fat, carbs, protein };
// }

function ProfilePage({ history }) {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const allUserCourses = useSelector((state) => state.allUserCourses);
  const { courses } = allUserCourses;

  const [assignments, setAssignments] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // console.log(courses.data.length);
    fetch(
      `http://localhost:8080/assignment/getAssignmentsOfUser/${userInfo.data._id}`,
      { method: "GET" }
    )
      .then(
        (response) =>
          // console.log(response);
          // return response;
          response.json()
        // console.log(response);
      )
      .then((response) => {
        // console.log(response);
        setAssignments(response.data);
        numOfAssignments();
        setLoaded(true);
        return response;
      });

    fetch(`http://localhost:8080/user/userDetails/${userInfo.data._id}`, {
      method: "GET",
    })
      .then(
        (response) =>
          // console.log(response);
          // return response;
          response.json()
        // console.log(response);
      )
      .then((response) => {
        // console.log(response);
        // setAssignments(response.data);
        userInfo = response.data;
        // numOfAssignments();
        // setLoaded(true);
        return response;
      });

    // console.log(assignments.data);
  }, []);

  const numOfAssignments = () => {
    let count = 0;
    // console.log(assignments);
    assignments.map((assign) => {
      if (assign.isCertified === true) count++;
    });
    console.log(count);
    return count;
  };

  return (
    <>
      <Header />
      <Box m={2} pt={9} />
      <Card className={classes.profileCard}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <img
              // src="https://res.cloudinary.com/dizvyn9b5/image/upload/v1632215752/mtxpeyrrjcbmmuygtj5z.jpg"
              src={userInfo.data.profilePicture}
              // src="https://res.cloudinary.com/dizvyn9b5/image/upload/v1632241300/oxndm5wvrwbmgoortsbs.jpg"
              alt="pic"
              className={classes.profilePic}
            />
            <h1 className={classes.name}>{userInfo.data.name}</h1>
            <p className={classes.description}>{userInfo.data.description}</p>
            <Link
              to={"/editProfile"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.editBtn}
              >
                Edit Profile
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TableContainer component={Paper} className={classes.table}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Q</TableCell>
            <TableCell>A</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key="Name">
                    <TableCell component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell align="right">{userInfo.data.name}</TableCell>
                  </TableRow>
                  <TableRow key="Email">
                    <TableCell component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell align="right">{userInfo.data.email}</TableCell>
                  </TableRow>
                  <TableRow key="Mobile Number">
                    <TableCell component="th" scope="row">
                      Mobile Number
                    </TableCell>
                    {userInfo.data.mobileNumber === 0 ? (
                      <TableCell align="right">----</TableCell>
                    ) : (
                      <TableCell align="right">
                        {userInfo.data.mobileNumber}
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow key="LinkedIn Profile">
                    <TableCell component="th" scope="row">
                      LinkedIn Profile
                    </TableCell>
                    {userInfo.data.linkedInLink === "" ? (
                      <TableCell align="right">----</TableCell>
                    ) : (
                      <TableCell align="right">
                        {userInfo.data.linkedInLink}
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow key="Github Profile">
                    <TableCell component="th" scope="row">
                      Github Profile
                    </TableCell>
                    {userInfo.data.githubLink === "" ? (
                      <TableCell align="right">----</TableCell>
                    ) : (
                      <TableCell align="right">
                        {userInfo.data.githubLink}
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow key="Skills/Domains Interested">
                    <TableCell component="th" scope="row">
                      Skills/Domains Interested
                    </TableCell>
                    {userInfo.data.domains === "" ? (
                      <TableCell align="right">----</TableCell>
                    ) : (
                      <TableCell align="right">
                        {userInfo.data.domains}
                      </TableCell>
                    )}
                  </TableRow>
                  {/* {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      {/* {row.protein.map((prot) => (
                        <TableCell align="right">{prot.skill}</TableCell>
                      ))}
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow> */}
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Card className={classes.smallCard}>
            <h3 style={{ color: "gray" }}>Courses Enrolled</h3>
            <br />
            <p className={classes.numOfCourses}>{courses.data.length}</p>
            <img
              src={coursesEnrolled}
              className={classes.smallCardImg}
              alt="Courses enrolled"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.smallCard}>
            <h3 style={{ color: "gray" }}>Courses Completed</h3>
            <br />
            <p className={classes.numOfCourses}>{numOfAssignments()}</p>
            <img
              src={coursesCompleted}
              className={classes.smallCardImg}
              alt="Courses Completed"
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePage;
