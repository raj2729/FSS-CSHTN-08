import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Card, CardContent, Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
// import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@mui/material/FormControl";
<<<<<<< HEAD
import Select from "@material-ui/core/Select";
import { createTheme, ThemeProvider } from "@material-ui/core";
import TouchAppIcon from '@mui/icons-material/TouchApp';
=======
import axios from "axios"
import { useSelector } from "react-redux";
>>>>>>> master

// Importing Header
import Header from "./Header";

const useStyles = makeStyles({
  field: {
    margin: "20px 10px",
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
});

const CareerForm = ({ history, match }) => {
  const classes = useStyles();
  const [jobType, setjobType] = useState("");
  const [jobTypeError, setjobTypeError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [ySelected, setYSelected] = useState("");
  const [linkedInProfile, setlinkedInProfile] = useState("");
  const [githubProfile, setgithubProfile] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [jobList, setJobList] = useState([]);
  // const [chapterStudyMaterial, setChapterStudyMaterial] = useState("");
  const [nameError, setnameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [ySelectedError, setYSelectedError] = useState("");
  const [linkedInProfileError, setlinkedInProfileError] = useState(false);
  const [resumeLinkError, setResumeLinkError] = useState("");

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success === true) {
      history.push(`/careerForm`);
    }
  }, [success]);

  const userLogin = useSelector((state) => state.userLogin);

  const [USERINFO, SETUSERINFO] = useState(null)

  useEffect(()=> {
  
    SETUSERINFO(userLogin.userInfo)
  },[userLogin])

  useEffect(() => {
    console.log(jobList);
  }, [jobList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setnameError(false);
    setMobileNumberError(false);
    setDescriptionError(false);
    setjobTypeError(false);
    setlinkedInProfileError(false);
    setYSelectedError(false);
    setResumeLinkError(false);
    setEmailError(false);

    if (jobType === "") setjobTypeError(true);
    if (name === "") setnameError(true);
    if (mobileNumber === 0) setMobileNumberError(true);
    if (description === "") setDescriptionError(true);
    if (ySelected === "") setYSelectedError(true);
    if (linkedInProfile === "") setlinkedInProfileError(true);
    if (resumeLink === "") setResumeLinkError(true);
    if (email === "") setEmailError(true);
  };

  const careerSubmitHandler = async () => {

    console.log("in submit")
    if(!USERINFO) {
      alert("Log in")
    } else {
      console.log(USERINFO)
      const headers = {"authorization": `Bearer ${USERINFO.token}`}
      const {data} = await axios.get("user/applyForInstructor",{headers})
      console.log("data", data)
      if(!data.success) {
        alert("Follow Instructions")
      } else {
        alert("Thanks for applying, will contact you shortly")
      }
    }
    // console.log("hello");
    // console.log(match.params.id);
    // const formData = new FormData();
    // formData.append("file", chapterVideoLink);
    // formData.append("upload_preset", "ude8cxll");

    // await axios
    //       .post("https://api.cloudinary.com/v1_1/dizvyn9b5/video/upload", formData)
    //       .then((response) => {
    //         console.log(response.data.secure_url);
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     // courseId: match.params.id,
    //     name: name,
    //     email: email,
    //     mobileNumber: mobileNumber,
    //     jobType: jobType,
    //     description: description,
    //     ySelected: ySelected,
    //     linkedInProfile: linkedInProfile,
    //     githubProfile: githubProfile,
    //     resumeLink: resumeLink,
    //     jobList: jobList,
    //   }),
    // };
    // // setPublicIdd(response.data.secure_url);
    // fetch(`http://localhost:8080/career/careerForm`, requestOptions)
    //   .then((response) => {
    //     // console.log(response);
    //     response.json();
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
    // alert("You will be contacted sortly if you are shortlisted");
    // setSuccess(true);
  };

  const jobsList = [
    "Backend Developer",
    "Frontend Developer",
    "UI/UX Developer",
    "Sales and Marketing",
    "Content Writing",
  ];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobList(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Header />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ margin: "80px 0px 10px" }}
      >
        <Card
          style={{
            width: 800,
            padding: "25px",
            margin: "0 auto",
            boxShadow: "5px 5px 5px 5px lightgrey",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
              Career Form
            </Typography>
            <FormControl component="fieldset" className={classes.field}>
              <FormLabel component="legend">Job Type</FormLabel>
              <RadioGroup
                row
                aria-label="jobType"
                name="row-radio-buttons-group"
                onChange={(event) => setjobType(event.target.value)}
                error={jobTypeError}
              >
                <FormControlLabel
                  value="internship"
                  control={<Radio />}
                  label="Internship"
                />
                <FormControlLabel value="job" control={<Radio />} label="Job" />
                <FormControlLabel
                  value="instructor"
                  control={<Radio />}
                  label="Instructor"
                />
              </RadioGroup>
            </FormControl>
<<<<<<< HEAD
            {jobType === 'instructor' ? <><h3 className={classes.field}>Complete your Profile</h3>
            <Button
                  type="submit"
                  size="large"
                  style={{marginTop:"30px !important"}}
                  // classes={{
                  //   root: classes.root,
                  //   label: classes.label,
                  // }}
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: "100px" }}
                  startIcon={<TouchAppIcon />}
                  // onClick={careerSubmitHandler}
                >
                
                  Apply Now
                </Button>
            </> : (
=======
            {jobType === "instructor" ? (
              <>
              <h3 className={classes.field}>Make sure you have completed your profile & Logged In</h3>
              <Button
                  type="submit"
                  size="large"
                  classes={{
                    root: classes.root,
                    label: classes.label,
                  }}
                  style={{ marginBottom: "100px" }}
                  startIcon={<AddCircleIcon />}
                  onClick={()=>careerSubmitHandler()}
                >
                  Submit
                </Button>
              </>
            ) : (
>>>>>>> master
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  className={classes.field}
                  label="Full Name"
                  variant="outlined"
                  colour="secondary"
                  fullWidth
                  required
                  error={nameError}
                />
                <TextField
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className={classes.field}
                  label="Mobile Number"
                  variant="outlined"
                  colour="secondary"
                  fullWidth
                  required
                  error={mobileNumberError}
                />
                <TextField
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.field}
                  label="Email"
                  variant="outlined"
                  colour="secondary"
                  fullWidth
                  required
                  error={emailError}
                />
                <TextField
                  id="standard-select-currency"
                  className={classes.field}
                  select
                  variant="outlined"
                  label="Select"
                  value={jobList}
                  fullWidth
                  onChange={handleChange}
                >
                  {jobsList.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  className={classes.field}
                  label="Tell us something about yourself"
                  variant="outlined"
                  colour="secondary"
                  multiline
                  rows={15}
                  fullWidth
                  required
                  error={descriptionError}
                />
                <TextField
                  onChange={(e) => setYSelected(e.target.value)}
                  className={classes.field}
                  label="Why do you think you should be selected"
                  variant="outlined"
                  colour="secondary"
                  multiline
                  rows={15}
                  fullWidth
                  required
                  error={ySelectedError}
                />
                <TextField
                  onChange={(e) => setlinkedInProfile(e.target.value)}
                  className={classes.field}
                  label="LinkedIn Profile"
                  variant="outlined"
                  colour="secondary"
                  fullWidth
                  required
                  error={linkedInProfileError}
                />
                <TextField
                  onChange={(e) => setgithubProfile(e.target.value)}
                  className={classes.field}
                  label="Github Profile"
                  variant="outlined"
                  colour="secondary"
                  fullWidth
                />
                <TextField
                  onChange={(e) => setResumeLink(e.target.value)}
                  className={classes.field}
                  label="Resume Link"
                  variant="outlined"
                  colour="secondary"
                  required
                  fullWidth
                  error={resumeLinkError}
                />
                <Button
                  type="submit"
                  size="large"
                  // classes={{
                  //   root: classes.root,
                  //   label: classes.label,
                  // }}
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: "100px" }}
                  startIcon={<AddCircleIcon />}
                  onClick={careerSubmitHandler}
                >
                  Submit
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default CareerForm;
