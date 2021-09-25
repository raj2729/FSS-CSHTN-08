import React,  { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import { List, ListItem, Drawer } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserTable from "./AdminUsers";
import InstructorTable from "./AdminInstructors";
import OrdersTable from "./AdminOrders";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card"
import "./adminanalytics.css"
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
// actions
import { getAllUsers, getAllInstructors, getCoursesSummary, getAllOrders } from "../actions/adminActions";
import CourseTable from "./AdminCourses";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// var Component = React.Component;
import { useSelector  } from "react-redux";

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('ReactJS Course', 'frontend', 'adnan'),
  createData('HTML Course', 'frontend', 'adnan'),
  createData('AngularJS', 'frontend', 'adnan'),
];

const AdminAnalytics = () => {
    const dispatch = useDispatch()
    const [date, changeDate] = useState(new Date());

    const [open, setOpen] = useState(false)
    const [cOrders, setcOrders] = useState(0)

    const admin = useSelector((state)=> state.admin)
    useEffect(()=> {
      if(admin.allOrders) setcOrders(admin.allOrders.length)
      console.log("cOrders",cOrders)
      console.log("admin", admin)
    },[admin])

      const splineoptions = {
        animationEnabled: true,
        title:{
          text: "Monthly Sales"
        },
        axisX: {
          valueFormatString: "MMM"
        },
        axisY: {
          title: "No of couses sold",
        },
        data: [{
          yValueFormatString: "$#,###",
          xValueFormatString: "MMMM",
          type: "spline",
          dataPoints: [
            { x: new Date(2021, 9), y: 23 },
          ]
        }]
      }
      const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: "Purchased Courses Analytics"
        },
        data: [{
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            { y: 27, label: "Frontend" },
            { y: 18, label: "Backend" },
            { y: 13.5, label: "Database" },
            { y: 18, label: "Design" },
            { y: 13.5, label: "Other" }
          ]
        }]
      }
    return (
        <div>
         <h1 style={{paddingLeft:"40px", paddingTop:"20px", paddingBottom:"20px"}}>Admin Panel Analytics</h1>
            <br />
            <Grid container>
                <Grid item xs={12} sm={3} style={{padding: "20px", marginRight:"5%"}}>
                                            <TableContainer className="table" component={Paper}>
                                            <Table sx={{ minWidth: "300px" }} size="small" aria-label="a dense table">
                                            <TableHead>
                                            <h3 style={{paddingLeft:"40px"}}>Top&nbsp;Selling&nbsp;Courses</h3>
                                            <TableRow>
                                
                                            <TableCell><h4>Course</h4></TableCell>
                                            <TableCell><h4>Type</h4></TableCell>
                                            <TableCell><h4>Instructor</h4></TableCell>
                                    
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.calories}</TableCell>
                                            <TableCell>{row.fat}</TableCell>
                                            <TableCell>{row.carbs}</TableCell>
                                            <TableCell>{row.protein}</TableCell>
                                            </TableRow>
                                            ))}
                                            </TableBody>
                                            </Table>
                                            </TableContainer>
                </Grid>
                <Grid item xs={12} sm={4}>
                                            <div className="piechart">
                                            <CanvasJSChart options = {options} 
				                            //  onRef={ref => this.chart = ref}
			                                /></div>
                </Grid>
                <Grid item xs={12} sm={4}>
                                            <div className="piechart">
                                            <CanvasJSChart options = {splineoptions}
                                            /* onRef={ref => this.chart = ref} */
                                            /></div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminAnalytics
