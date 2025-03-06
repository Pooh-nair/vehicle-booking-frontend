import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import Step1Name from "./Step1";
import Step2Wheels from "./Step2";
import Step3VehicleType from "./Step3";

const MultiStepForm = () => {
  const steps = [Step1Name, Step2Wheels, Step3VehicleType];
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);

  const StepComponent = steps[step];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-lg">
        <CardContent className="p-6">
          <StepComponent nextStep={nextStep} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
