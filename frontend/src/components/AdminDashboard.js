import React,  { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import { List, ListItem, Drawer } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserTable from "./AdminUsers";
import InstructorTable from "./AdminInstructors";
import OrdersTable from "./AdminOrders";
import PaymentsTable from "./AdminPayments";
import RequestTable from "./AdminRequests";
import AdminAnalytics from "./AdminAnalytics";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card"
import "./admindashboard.css"
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// actions
import { getAllUsers, getAllInstructors, getCoursesSummary, getAllOrders, getAllPayments, getAllRequests } from "../actions/adminActions";
import CourseTable from "./AdminCourses";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useHistory } from "react-router-dom";
import { useSelector  } from "react-redux";



function AdminDashboard() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = useState(false)
    useEffect(() => {
      dispatch(getAllUsers());
      dispatch(getAllInstructors())
      dispatch(getCoursesSummary())
      dispatch(getAllOrders())
      dispatch(getAllPayments())
      dispatch(getAllRequests())
    }, [])
    const [mode, setMode] = useState("dashboard")

    const admin = useSelector((state)=> state.admin)

    useEffect(()=> {
      if(admin.allUsers) setcStudents(admin.allUsers.length)
      if(admin.allInstructors) setcInstructors(admin.allInstructors.length)
      if(admin.allOrders) setcOrders(admin.allOrders.length)
      setcCourses(admin.allCourses.length)
      let sum = 0;
      for(const each of admin.allOrders) {
        sum += each.courseId.price
      }
      setcRevenue(sum)
      sum = 0;
      for(const each of admin.allPayments) {
        sum += each.amount
      }
      setcPayments(sum)
    },[admin])
      const [cStudents, setcStudents] = useState(0)
      const [cInstructors, setcInstructors] = useState(0)
      const [cOrders, setcOrders] = useState(0)
      const [cPayments, setcPayments] = useState(0)
      const [cRevenue, setcRevenue] = useState(0)
      const [cCourses, setcCourses] = useState(0)

  
    

    const list = ()=> (
        <div onClick={()=>{setOpen(false)}}>
          <List>
            <ListItem><Button onClick = {()=>setMode("dashboard")}><h4><i className="fa fa-th-large"></i> Dashboard</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("courses")}><h4><i className="fa fa-play-circle"></i> Courses</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("users")}><h4><i className="fa fa-users"></i> Students</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("instructors")}><h4><i className="fa fa-bar-chart"></i> Instructors</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("orders")}><h4><i className="fa fa-money"></i> Orders</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("payments")}><h4><i className="fa fa-money"></i> Payments</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("requests")}><h4><i className="fa fa-bar-chart"></i> Requests</h4></Button></ListItem>
            <ListItem><Button onClick = {()=>setMode("analytics")}><h4><i className="fa fa-money"></i> Analytics</h4></Button></ListItem>
           
          </List>
        </div>
      )
    return (
        <div>
            <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"black", height:"50px"}}>
                <Button  style={{ textDecoration: "none", color: "white" }} onClick={()=>{setOpen(true)}}><MenuIcon/>Admin Panel</Button>
                <Button  style={{ textDecoration: "none", color: "white" }} onClick={()=>{alert("Logout")}}>Logout<ExitToAppIcon/></Button>
            </div>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={()=>{setOpen(false)}}
            >
                {list()}
            </Drawer>
            {mode==="dashboard" && 


            <div>
            <h1 style={{textAlign:"center"}}>Admin Panel Dashboard</h1>
            <br />
            {/* if you want 3 cards in a line */}
            <Grid container alignItems="center" justify="center">
            
              <Grid item xs={12} sm={4}>
              <Card className="userscard">
                  <h2 style={{textAlign:"center"}}>Students</h2>
                  <GroupIcon className="groupicon" />
                  <h2 style={{textAlign:"center"}}>{cStudents}</h2>
                </Card>
             
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="userscard">
                  <h2 style={{textAlign:"center"}}>Instructors</h2>
                  <GroupIcon className="groupicon" />
                  <h2 style={{textAlign:"center"}}>{cInstructors}</h2>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
              <Card className="userscard">
                  <h2 style={{textAlign:"center"}}>Courses</h2>
                  <ComputerIcon fontSize="large" className="courseicon" />
                  <h2 style={{textAlign:"center"}}>{cCourses}</h2>
                </Card>
              </Grid> 
              <Grid item xs={12} sm={4}>
              <br />
              <Card className="userscard">
                  <h2 style={{textAlign:"center"}}>Revenue(Rs.)</h2>
                  <MonetizationOnIcon className="courseicon" />
                  <h2 style={{textAlign:"center"}}>{cRevenue}</h2>
              </Card>                                                   
              </Grid>
              <Grid item xs={12} sm={4}>
              <br />
                      <Card className="userscard">
                        <h2 style={{textAlign:"center"}}>orders</h2>
                        <AccessTimeFilledIcon className="courseicon" />
                        <h2 style={{textAlign:"center"}}>{cOrders}</h2>
                      </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
              <br />
                      <Card className="userscard">
                        <h2 style={{textAlign:"center"}}>Payments(Rs)</h2>
                        <AccessTimeFilledIcon className="courseicon" />
                        <h2 style={{textAlign:"center"}}>{cPayments}</h2>
                      </Card>
              </Grid>
            </Grid>


                                                                
          
            </div>

            }
            {mode==="courses" && <CourseTable/>}
            {mode==="users" && <UserTable/>}
            {mode==="instructors" && <InstructorTable/>}
            {mode==="orders" && <OrdersTable/>}
            {mode==="payments" && <PaymentsTable/>}
            {mode==="analytics" && <AdminAnalytics/>}
            {mode==="requests" && <RequestTable/>}
        </div>
     );
}

export default AdminDashboard;
