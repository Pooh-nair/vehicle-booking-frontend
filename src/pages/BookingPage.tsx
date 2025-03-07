import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import ClientInfoForm from "../components/ClientInfoForm";
import CategoryForm from "../components/CategoryForm";
import VehicleTypeForm from "../components/VehicleTypeForm";
import VehicleForm from "../components/VehicleForm";
import BookingDateForm from "../components/BookingDateForm";
import { useFormContext } from "../context/FormContext";

const BookingPage: React.FC = () => {
  const { setFormData } = useFormContext();

  const steps = [
    ClientInfoForm,
    CategoryForm,
    VehicleTypeForm,
    VehicleForm,
    BookingDateForm,
  ];
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const reset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      categoryId: null,
      typeId: null,
      vehicleId: null,
      startDate: "",
      endDate: "",
    });
    setStep(0);
  };

  const StepComponent = steps[step];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-lg">
        <CardContent className="p-6">
          <StepComponent
            nextStep={nextStep}
            prevStep={prevStep}
            reset={reset}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
