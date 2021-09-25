import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";

//PROGRESS
import { CircularProgress } from "@material-ui/core";

// Importing Header
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://media.istockphoto.com/vectors/online-education-vector-id960268208)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "60%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Assignments = ({ history, match }) => {
  const classes = useStyles();
  const [assignments, setAssignments] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:8080/assignment/getAssignmentsOfUser/${match.params.id}`,
      { method: "GET" }
    )
      .then((response) =>
        // console.log(response);
        // return response;
        response.json()
      )
      .then((response) => {
        setAssignments(response);
        setLoaded(true);
        return response;
      });
    console.log(assignments.data);
  }, [match, history]);

  const submitPdfButtonHandler = async (
    e,
    assignmentUserName,
    assignmentCourse,
    assignmentUserEmail
  ) => {
    e.preventDefault();
    console.log(assignmentUserName, assignmentCourse, assignmentUserEmail);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: assignmentUserName,
        email: assignmentUserEmail,
        course: assignmentCourse,
      }),
    };
    // await fetch(`http://localhost:8080/getCertificate`, requestOptions)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //     alert("Course certificate has been emailed to you");
    //   });
    fetch(`http://localhost:8080/getCertificate`, requestOptions)
      .then((response) =>
        // console.log(response);
        response.json()
      )
      .then((response) => {
        console.log(response);
        alert("Course certificate has been emailed to you");
      });
  };

  return (
    <div
      style={{
        padding: "5%",
        backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      }}
    >
      <Header />
      <h1 style={{ paddingTop: "30px" }}>Assignments</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h1>Course Name</h1>
              </TableCell>
              <TableCell align="center">
                <h1>Status</h1>
              </TableCell>
              <TableCell align="center">
                <h1>Instructor Feedbacks</h1>
              </TableCell>
              <TableCell align="center">
                <h1>Get Certificate</h1>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded === false ? (
              <CircularProgress />
            ) : assignments.data.length === 0 ? (
              <center>
                <p style={{ color: "red" }}>
                  You have not enrolled in any course yet
                </p>
              </center>
            ) : (
              assignments.data.map((row) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p style={{ paddingLeft: "20%" }}>{row.courseId.name}</p>
                  </TableCell>
                  <TableCell align="right">
                    <center>
                      {row.assignmentStatus === "unsubmit" ? (
                        <div>
                          <p>Pending</p>
                          {row.assignmentComment === "" ? (
                            <p style={{ color: "red" }}>
                              Assignment is not submitted yet
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      ) : row.assignmentStatus === "submit" ? (
                        "Submitted"
                      ) : (
                        "Completed"
                      )}
                    </center>
                    {/* {row.assignmentStatus} */}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.assignmentComment === "" ? (
                      <p style={{ color: "red", paddingLeft: "20%" }}>
                        No feedbacks yet.
                      </p>
                    ) : (
                      <p style={{ paddingLeft: "20%" }}>
                        {row.assignmentComment}
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <center>
                      <Button
                        id="submitPdfButton"
                        disabled={row.isCertified === false}
                        variant="contained"
                        color="primary"
                        onClick={(e) =>
                          submitPdfButtonHandler(
                            e,
                            row.userId.name,
                            row.courseId.name,
                            row.userId.email
                          )
                        }
                      >
                        Get Certificate <GetAppIcon />
                      </Button>
                      {row.isCertified === false ? (
                        <p style={{ color: "red" }}>
                          Assignment is not certified yet
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </center>
                  </TableCell>
                  {/* <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Assignments;
