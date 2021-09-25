import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Input } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Box from "@material-ui/core/Box";
import { Card } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

// Importing Header
import Header from "./Header";

import axios from "axios";
import { createCourse } from "../actions/courseActions";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    display: "block",
  },
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 100%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
  detailTitle: {
    textDecoration: "underline",
  },
}));

export default function CreateCourse() {
  const classes = useStyles();
  const [Title, setTitle] = useState("");
  const [tagline, settagline] = useState("");
  const [type, settype] = useState("");
  const [image, setImage] = useState("");
  const [description, setdescription] = useState("");
  const [TitleError, setTitleError] = useState(false);
  const [taglineError, settaglineError] = useState(false);
  const [typeError, settypeError] = useState(false);
  const [imgError, setimgError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [assignment, setAssignment] = useState("initialState");
  const [assignmentError, setassignmentError] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    settypeError(false);
    settaglineError(false);
    setdescriptionError(false);
    setimgError(false);
    setassignmentError(false);

    // if (Title == "") setTitleError(true);
    // if (tagline == "") settaglineError(true);
    // if (image == "") setimgError(true);
    // if (type == "") settypeError(true);
    // if (description == "") setdescriptionError(true);
    // if (assignment == "") setassignmentError(true);
  };

  const createCourseSubmitHandler = async () => {
    // console.log(image);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ude8cxll");

    await axios
      .post("https://api.cloudinary.com/v1_1/dizvyn9b5/image/upload", formData)
      .then((response) => {
        console.log(response.data.secure_url);
        // setPublicIdd(response.data.secure_url);
        dispatch(
          createCourse(
            userInfo.data._id,
            Title,
            tagline,
            type,
            description,
            assignment,
            response.data.secure_url
          )
          // createAssignment(
          //   userInfo.data._id,
          //   match.params.id,
          //   response.data.secure_url,
          //   githubLink,
          //   "submit"
          // )
        );
      });
  };

  return (
    <>
      <Header />
      <Container>
        <Box m={2} pt={9}>
          <Typography
            variant="h5"
            className={classes.detailTitle}
            gutterBottom
            color="secondary"
            align="center"
            component="h2"
          >
            Create a New Course{" "}
          </Typography>
        </Box>
        <Card style={{
            width: 800,
            padding: "25px",
            margin: "0 auto",
            // borderRadius:"30px",
            boxShadow: '5px 5px 5px 5px lightgrey'
          }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="outlined"
            colour="secondary"
            fullWidth
            required
            error={TitleError}
          />

          <TextField
            className={classes.field}
            onChange={(e) => settagline(e.target.value)}
            label="Tag Line"
            variant="outlined"
            colour="textSecondary"
            fullWidth
            required
            error={taglineError}
          />

          <TextField
            className={classes.field}
            onChange={(e) => settype(e.target.value)}
            label="Type"
            variant="outlined"
            colour="textSecondary"
            fullWidth
            required
            error={typeError}
          />

          <TextField
            className={classes.field}
            onChange={(e) => setAssignment(e.target.value)}
            label="Assignment Question"
            variant="outlined"
            colour="textSecondary"
            fullWidth
            required
            error={imgError}
          />

          <TextField
            className={classes.field}
            onChange={(e) => setdescription(e.target.value)}
            label="Description"
            variant="outlined"
            colour="textSecondary"
            multiline
            rows={15}
            fullWidth
            required
            error={descriptionError}
          />

          <Input
            variant="contained"
            size="large"
            type="file"
            classes={{
              root: classes.root,
            
            }}
            // variant="contained"
            color="primary"
            onChange={(event) => {
              setImage(event.target.files[0]);
            
            }}
           
            className="upload-btn"
          >
            Upload Image File
          </Input>
          <Box m={2} pt={3}></Box>

          <Button
            type="submit"
            size="large"
            classes={{
              root: classes.root,
              label: classes.label,
            }}
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={createCourseSubmitHandler}
          >
            Add Course
          </Button>
        </form>
        </Card>
      </Container>
    </>
  );
}
