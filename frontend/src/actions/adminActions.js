import axios from "axios";
import {
    ADMIN_ERROR,
    ADMIN_LOADING,
    ADMIN_LOGIN,
    ADMIN_USERS,
    ADMIN_INSTRUCTORS,
    ADMIN_COURSES,
    ADMIN_ORDERS,
    ADMIN_PAYMENTS,
    ADMIN_REQUESTS
} from "../constants/adminConstants";

export const adminLogin = (email,password) => async (dispatch) => {
  try {
    dispatch({
        type:ADMIN_LOADING,
        payload:{}
    })
    const { data } = await axios.post(`/admin/adminLogin/`,{email,password});
    if(!data.data) {
        dispatch({
            type: ADMIN_ERROR,
            payload: {}
        })
        return;
    } else {
        dispatch({
            type: ADMIN_LOGIN,
            payload: data,
          });
    }
  } catch (error) {
      dispatch({
        type: ADMIN_ERROR,
        payload: error
      })
  }
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({type:ADMIN_LOADING,payload:{}})
    const token = getState().admin.adminDetails.token
    // console.log(token)
    const headers = {authorization: `Bearer ${token}`}
    const  {data} = await axios.get('/admin/getAllStudents',{headers});
    if(data.data) {
      dispatch({
        type: ADMIN_USERS,
        payload: data.data
      })
    } else {
      console.log("Error in getallUsers")
    }
  } catch(error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error
    })
  }
}

export const getAllInstructors = ()=> async(dispatch, getState) => {
  try {
    dispatch({type:ADMIN_LOADING,payload:{}})
    const token = getState().admin.adminDetails.token
    const headers = {authorization: `Bearer ${token}`}
    const  {data} = await axios.get('/admin/getAllInstructors',{headers});
    if(data.data) {
      dispatch({
        type: ADMIN_INSTRUCTORS,
        payload: data.data
      })
    } else {
      console.log("Error in getallUsers")
    }
  } catch(err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: err
    })
  }
}

export const getCoursesSummary = ()=> async(dispatch, getState) => {
  try {
    dispatch({type:ADMIN_LOADING,payload:{}})
    const token = getState().admin.adminDetails.token
    const headers = {authorization: `Bearer ${token}`}
    const  {data} = await axios.get('/admin/getCoursesSummary',{headers});
    if(data.data) {
      dispatch({
        type: ADMIN_COURSES,
        payload: data.data
      })
    } else {
      console.log("Error in getallUsers")
    }
  } catch(err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: err
    })
  }
}

export const getAllOrders = ()=> async(dispatch, getState)=> {
  try {
    dispatch({type:ADMIN_LOADING,payload:{}})
    const token = getState().admin.adminDetails.token
    const headers = {authorization: `Bearer ${token}`}
    const  {data} = await axios.get('/order/getAllOrders',{headers});
    console.log(data.data[0])
    if(data.data) {
      dispatch({
        type: ADMIN_ORDERS,
        payload: data.data
      })
    } else {
      console.log("Error in getAllOrders")
    }
  } catch(err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: err
    })
  }
}

export const getAllPayments = ()=> async(dispatch, getState)=> {
  try{
    dispatch({type:ADMIN_LOADING,payload:{}})
    const token = getState().admin.adminDetails.token
    const headers = {authorization: `Bearer ${token}`}
    const  {data} = await axios.get('/instructorPayments/paymentsToInstructors',{headers});
    if(data.data) {
      dispatch({
        type: ADMIN_PAYMENTS,
        payload: data.data
      })
    } else {
      console.log("Error in getAllPayments")
    }
  } catch(err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: err
    })  
  }
}


export const getAllRequests = ()=> async(dispatch, getState)=> {
  try{
    dispatch({type:ADMIN_LOADING,payload:{}})
    const  {data} = await axios.get('/admin/userRequests');
    if(data.data) {
      dispatch({
        type: ADMIN_REQUESTS,
        payload: data.data
      })
    } else {
      console.log("Error in getAllPayments")
    }
  } catch(err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: err
    })  
  }
}