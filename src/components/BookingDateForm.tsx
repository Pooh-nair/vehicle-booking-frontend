import React, { useState } from "react";
import {
  FormControl,
  Button,
  Card,
  CardContent,
  Typography,
  FormLabel,
  Box,
} from "@mui/material";
import { useFormContext } from "../context/FormContext";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ArrowBack, CheckCircle } from "@mui/icons-material";

const BookingDateForm: React.FC = ({
  nextStep,
  prevStep,
  reset,
}: {
  nextStep?: () => void;
  prevStep?: () => void;
  reset?: () => void;
}) => {
  const { formData, setFormData } = useFormContext();
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const onBook = async () => {
    if (!formData.startDate) {
      setStartDateError(true);
    } else if (!formData.endDate) {
      setEndDateError(true);
    } else {
      setStartDateError(false);
      setEndDateError(false);
      try {
        const response = await axios.post(
          "http://localhost:3000/booking/save-booking",
          formData
        );
        console.log("Booking successful:", response);
        toast.success("Booking successful!");

        reset?.();
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        console.error("Error fetching categories:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: 400,
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          overflow: "visible",
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Enter Booking Date
          </Typography>

          <FormControl
            component="fieldset"
            error={startDateError}
            sx={{ width: "100%" }}
          >
            <FormLabel>Start Date</FormLabel>
            <DatePicker
              selected={formData.startDate}
              onChange={(date: Date | null) =>
                setFormData({ ...formData, startDate: date?.toISOString() })
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a start date"
              className="form-control"
              minDate={new Date()}
            />
            {startDateError && (
              <Typography
                color="error"
                sx={{ fontSize: "0.875rem", marginTop: 1 }}
              >
                Please select a start date.
              </Typography>
            )}
          </FormControl>
          <FormControl
            component="fieldset"
            error={startDateError}
            sx={{ width: "100%", marginY: 2 }}
          >
            <FormLabel>End Date</FormLabel>
            <DatePicker
              selected={formData.endDate}
              onChange={(date: Date | null) => {
                setFormData({ ...formData, endDate: date?.toISOString() });
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a end date"
              className="form-control"
              minDate={
                formData.startDate ? new Date(formData.startDate) : new Date()
              }
            />
            {endDateError && (
              <Typography
                color="error"
                sx={{ fontSize: "0.875rem", marginTop: 1 }}
              >
                Please select a end date.
              </Typography>
            )}
          </FormControl>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<ArrowBack />}
              sx={{ marginTop: 3 }}
              onClick={() => prevStep?.()}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ marginTop: 3 }}
              onClick={onBook}
              endIcon={<CheckCircle />}
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingDateForm;
