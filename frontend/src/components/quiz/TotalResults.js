import { Button, Typography } from "@material-ui/core";
import AnswersReview from "./AnswersReview";
import { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TotalResults = ({
    classes,
    resetQuiz,
    currentQuizStep,
    processedAnswers,
    setCurrentQuizStep,
}) => {
    useEffect(() => {
        window.scrollTo(0, "20px");
    }, []);

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: "Result Analytics"
        },
        data: [{
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}marks",
          dataPoints: [
            { y: processedAnswers.filter(({ isCorrect }) => isCorrect).length, label: "Correct", color:"lightgreen" },
            { y: 4-processedAnswers.filter(({ isCorrect }) => isCorrect).length, label: "Wrong" },
            // { y: 9, label: "Database" },
            // { y: 5, label: "Data Science" },
            // { y: 19, label: "Cyber Security" }
          ]
        }]
      }

    return currentQuizStep === "results" ? (
        <div className={classes.results}>
            <Typography variant="h1" className={classes.mainTitle}>
                Results
            </Typography>
            <Typography variant="h4">
                {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out of{" "}
                {processedAnswers.length}
            </Typography>
            <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={6} style={{ marginRight:"300px"}}>
                <Button
                onClick={(e) => {
                    setCurrentQuizStep("review");
                }}
                className={classes.submitButton}
                variant="contained"
                color="primary"
            >
                Review
            </Button>{" "}
            <Button
                onClick={resetQuiz}
                className={classes.submitButton}
                variant="contained"
                color="primary"
            >
                Reset
            </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div style={{ width:"500px", position:"relative", bottom:"100px"}}>
                                <CanvasJSChart options = {options} 
				                //  onRef={ref => this.chart = ref}
			                    /></div>
                </Grid>
            </Grid>
           
            
        </div>
    ) : (
        <AnswersReview
            classes={classes}
            resetQuiz={resetQuiz}
            processedAnswers={processedAnswers}
        />
    );
};

export default TotalResults;