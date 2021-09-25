import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
// import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const loadRazorPay = async () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    // script.onload = displayRazorPay;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const bearerToken = localStorage.getItem("token");

// to handle headers
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
};

const InstructorTable = () => {
  const allInstructors = useSelector((state) => state.admin.allInstructors);
  const admin = useSelector((state) => state.admin);
  const { adminDetails } = admin;
  const [textVal, setTextVal] = useState("");
  const [filteredInstructors, setFilteredInstructors] = useState([]);

  const [enteredAmount, setenteredAmount] = useState("");

  useEffect(() => {
    setFilteredInstructors(allInstructors);
  }, [allInstructors]);

  const handlePayment = () => {
    alert("Payment");
  };

  const onChange = (value) => {
    const searchVal = value.toLowerCase();
    let regex = new RegExp(searchVal, "g");
    const byInstructorName = allInstructors.filter((instructor) => {
      if (instructor.teacher.name) {
        return instructor.teacher.name.toLowerCase().match(regex);
      }
    });
    const byEmail = allInstructors.filter((instructor) => {
      if (instructor.teacher.email) {
        return instructor.teacher.email.toLowerCase().match(regex);
      }
    });
    setFilteredInstructors([...new Set([...byInstructorName, ...byEmail])]);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.teacher.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.teacher.email,
      sortable: true,
    },
    {
      name: "Number of courses",
      selector: (row) => row.count,
    },
    {
      name: "Enter Amount",
      cell: (row) => (
        <Button
          variant="contained"
          // onClick={() => handlePayment()}
          onClick={() => setenteredAmount(prompt("Enter amount"))}
          style={{ backgroundColor: "#7CFC00" }}
        >
          {" "}
          Enter Amount
        </Button>
      ),
    },
    {
      name: "Pay",
      cell: (row) => (
        <Button
          variant="contained"
          // onClick={() => handlePayment()}
          onClick={() => displayRazorPay(row.teacher._id, row.count)}
          style={{ backgroundColor: "#7CFC00" }}
        >
          {" "}
          Pay
        </Button>
      ),
    },
  ];

  const handleRazorpayResponse = async (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    id,
    count
  ) => {
    const paymentToInstructorData = await axios.post(
      "/instructorPayments/performPayment",
      {
        date: Date.now(),
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        instructorId: id,
        amount: count,
        // courseId: course.data._id,
      },
      config
    );
    if (paymentToInstructorData.data.success === true) {
      alert("Paid to instructor successfully");
    } else {
      alert("Could not complete payments");
    }
  };

  const displayRazorPay = async (id, count) => {
    console.log(enteredAmount);
    const res = await loadRazorPay();

    if (!res) {
      alert("Razorpay SDK Failed. Please check your connection.");
      return;
    }

    const { data } = await axios.post("/instructorPayments/razorpayy", {
      count: Number(enteredAmount),
    });

    // console.log(data);

    const options = {
      key: "rzp_test_tOsI14GHZSP3U8", // Enter the Key ID generated from the Dashboard
      // amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // currency: "INR",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "Full Stack Simplified",
      description: "Test Transaction",
      // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        handleRazorpayResponse(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature,
          id,
          count
        );
      },
      prefill: {
        // name: "Gaurav Kumar",
        name: adminDetails.data.name,
        // email: "gaurav.kumar@example.com",
        email: adminDetails.data.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#DC143C",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="listTable">
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          id="outlined-search"
          placeholder="Search by Name/Email"
          fullWidth
          size="small"
          type="search"
          variant="outlined"
          value={textVal}
          onChange={(e) => {
            setTextVal(e.target.value);
            onChange(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <DataTable
        title="Instructors"
        columns={columns}
        data={filteredInstructors}
        highlightOnHover={true}
        pointerOnHover={true}
        pagination={true}
        paginationPerPage={8}
      />
    </div>
  );
};

export default InstructorTable;
