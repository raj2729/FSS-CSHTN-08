import React, { useState } from "react";
// import "../App.css";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { createTheme, ThemeProvider } from "@material-ui/core";

// Importing Header
import Header from "./Header";

const useStyles = makeStyles({
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
});

function ContactForm() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [description, setDescription] = useState("");

  const contacFormSubmitHandler = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // courseId: match.params.id,
        name: name,
        email: email,
        number: number,
        description: description,
      }),
    };
    // setPublicIdd(response.data.secure_url);
    fetch(`http://localhost:8080/contact/contacForm`, requestOptions)
      .then((response) => {
        // console.log(response);

        response.json();
      })
      .then((response) => {
        console.log(response);
      });
    alert("Query sent successfully");
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
        style={{margin: '80px 0px 10px' }}
      >
        <Card
          style={{
            maxWidth: 450,
            padding: "5px",
            margin: "0 auto",
            boxShadow: '5px 5px 5px 5px lightgrey'
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
              Contact Us
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Enter first name"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Enter phone number"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setNumber(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    multiline
                    rows={6}
                    placeholder="Type your message here"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    size="large"
                    // classes={{
                    //   root: classes.root,
                    //   label: classes.label,
                    // }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={contacFormSubmitHandler}
                  >
                    Submit
                  </Button>
                  {/* <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button> */}
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default ContactForm;
