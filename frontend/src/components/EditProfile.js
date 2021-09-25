import Box from "@material-ui/core/Box";
import React, { useState } from "react";
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
import Input from "@material-ui/core/Input";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// Importing Header
import Header from "./Header";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";

const useStyles = makeStyles({
  profileCard: {
    width: "85% !important",

    /* display: flex !important; */
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "30px auto !important",
    margin: "2% !important",
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
    margin: "50px auto !important",
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function EditProfilePage({ history }) {
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [names, setName] = useState(userInfo.data.name);
  // const [email, setEmail] = useState(userInfo.data.email);
  // const [password, setPassword] = useState(userInfo.data.password);
  const [github, setGithub] = useState(userInfo.data.githubLink);
  const [fb, setFb] = useState(userInfo.data.linkedInLink);
  const [phone, setPhone] = useState(userInfo.data.mobileNumber);
  const [skills, setSkills] = useState(userInfo.data.domains);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState(userInfo.data.description);
  const dispatch = useDispatch();
  const rows = [
    +createData(
      <p className={classes.tableText}>Name</p>,

      <Input value={names} />
    ),
    createData(
      <p className={classes.tableText}>Name</p>,
      //   <Input value={names} />
      <Input
        type="text"
        value={names}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    ),
    createData(
      <p className={classes.tableText}>Description</p>,
      <Input
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
    ),
    // createData(
    //   <p className={classes.tableText}>Email</p>,
    //   <Input
    //     value={email}
    //     onChange={(e) => {
    //       setEmail(e.target.value);
    //     }}
    //   />
    // ),
    // createData(
    //   <p className={classes.tableText}>Password</p>,
    //   <Input
    //     type="password"
    //     value={password}
    //     onChange={(e) => {
    //       setPassword(e.target.value);
    //     }}
    //   />
    // ),
    createData(
      <p className={classes.tableText}>LinkedIn Link</p>,
      <Input
        type="text"
        value={fb}
        onChange={(e) => {
          setFb(e.target.value);
        }}
      />
    ),
    createData(
      <p className={classes.tableText}>Github Link</p>,
      <Input
        type="text"
        value={github}
        onChange={(e) => {
          setGithub(e.target.value);
        }}
      />
    ),
    createData(
      <p className={classes.tableText}>Mobile No.</p>,
      <Input
        type="text"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
    ),
    createData(
      <p className={classes.tableText}>Skills/ Domains</p>,
      <Input
        type="text"
        value={skills}
        onChange={(e) => {
          setSkills(e.target.value);
        }}
      />
    ),
    createData(
      <p className={classes.tableText}>Update Profile Picture</p>,
      <Input
        type="file"
        // value={image}
        onChange={(event) => {
          setImage(event.target.files[0]);
          // console.log(image);
        }}
      />
    ),
  ];

  const editProfileSubmitHandler = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ude8cxll");

    if (image !== "") {
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dizvyn9b5/image/upload",
          formData
        )
        .then((response) => {
          userInfo.data.linkedInLink = fb;
          userInfo.data.name = names;
          userInfo.data.githubLink = github;
          userInfo.data.mobileNumber = phone;
          userInfo.data.description = description;
          userInfo.data.profilePicture = response.data.secure_url;
          userInfo.data.domains = skills;
          console.log(response.data.secure_url);
          // console.log(userInfo.data.linkedInLink);
          // console.log(email);
          console.log(userInfo.data.linkedInLink);
          console.log(userInfo.data.name);
          console.log(userInfo.data.githubLink);
          console.log(userInfo.data.mobileNumber);
          console.log(userInfo.data.description);
          console.log(userInfo.data.domains);
          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              // courseId: match.params.id,
              name: names,
              // email: email,
              profilePicture: response.data.secure_url,
              githubLink: github,
              linkedInLink: fb,
              mobileNumber: phone,
              domains: skills.toString(),
              description: description,
            }),
          };

          fetch(
            `http://localhost:8080/user/userUpdate/${userInfo.data._id}`,
            requestOptions
          )
            .then((response) => {
              // console.log(response);
              // return response;

              response.json();
              console.log(response);
            })
            .then((response) => {
              console.log(response);
              // setAssignments(response.data);
              // numOfAssignments();
              // setLoaded(true);
              return response;
            });

          history.push("/myProfile");
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: userInfo,
          });
        });
      // dispatch(login(userInfo.data.email, password));
    } else {
      // await axios
      //   .post(
      //     "https://api.cloudinary.com/v1_1/dizvyn9b5/image/upload",
      //     formData
      //   )
      //   .then((response) => {
      userInfo.data.linkedInLink = fb;
      userInfo.data.name = names;
      userInfo.data.githubLink = github;
      userInfo.data.mobileNumber = phone;
      userInfo.data.description = description;
      // userInfo.data.profilePicture = response.data.secure_url;
      userInfo.data.domains = skills;
      // console.log(response.data.secure_url);
      // console.log(userInfo.data.linkedInLink);
      // console.log(email);
      console.log(userInfo.data.linkedInLink);
      console.log(userInfo.data.name);
      console.log(userInfo.data.githubLink);
      console.log(userInfo.data.mobileNumber);
      console.log(userInfo.data.description);
      console.log(userInfo.data.domains);
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          // courseId: match.params.id,
          name: names,
          // email: email,
          profilePicture: "",
          githubLink: github,
          linkedInLink: fb,
          mobileNumber: phone,
          domains: skills.toString(),
          description: description,
        }),
      };

      fetch(
        `http://localhost:8080/user/userUpdate/${userInfo.data._id}`,
        requestOptions
      )
        .then((response) => {
          // console.log(response);
          // return response;

          response.json();
          console.log(response);
        })
        .then((response) => {
          console.log(response);
          // setAssignments(response.data);
          // numOfAssignments();
          // setLoaded(true);
          return response;
        });

      history.push("/myProfile");
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userInfo,
      });
      // };
      // dispatch(login(userInfo.data.email, password));
    }
  };

  return (
    <>
      <Header />
      <Box m={2} pt={9} />
      <Card className={classes.profileCard}>
        <Grid container>
          <h1 style={{ marginLeft: "100px" }}>Edit Profile</h1>
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper} className={classes.table}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Q</TableCell>
            <TableCell>A</TableCell> */}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              className={classes.editBtn}
              onClick={editProfileSubmitHandler}
            >
              Save Details
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default EditProfilePage;
