import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { useSelector  } from "react-redux";

const PaymentsTable = () => {

  const allPayments = useSelector((state)=> state.admin.allPayments)
  const [textVal, setTextVal] = useState('')
  const [fliteredPayments, setFilteredPayments] = useState([])

  useEffect(()=> {
    setFilteredPayments(allPayments)
  },[allPayments])
   
  const onChange = (value) => {
    const searchVal = value.toLowerCase();
    let regex = new RegExp(searchVal, "g");
    const byInstructorName = allPayments.filter((payment) => {
        if(payment.instructorId.name) {
            return payment.instructorId.name.toLowerCase().match(regex)
        }
    }
    );
    const byRazorpayId = allPayments.filter((payment) => {
        if(payment.razorpay_payment_id) {
          return payment.razorpay_payment_id.toLowerCase().match(regex)
        }
      }
      );
    setFilteredPayments([...new Set([...byInstructorName, ...byRazorpayId])]);
};

const columns = [
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString()
    },
    {
      name: "Instructor name",
      selector: (row)=> row.instructorId.name,
      sortable: true,
    },
    {
      name: "Instructor email",
      selector: (row)=> row.instructorId.email,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount
    },

    {
      name: "Razorpay Id",
      selector: (row) => row.razorpay_payment_id
    }
  ];

  return (
    <div className="listTable">
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          id="outlined-search"
          placeholder="Search by Course/Student/PaymentId"
          fullWidth
          size="small"
          type="search"
          variant="outlined"
          value={textVal}
          onChange={(e) => {
            setTextVal(e.target.value);
            onChange(e.target.value)
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchOutlinedIcon/></InputAdornment>,
          }}
        />
      </form>
      <DataTable
        title="Payments"
        columns={columns}
        data={fliteredPayments}
        highlightOnHover={true}
        pointerOnHover={true}
        pagination={true}
        paginationPerPage={8}
      />
    </div>
  );
};

export default PaymentsTable;
