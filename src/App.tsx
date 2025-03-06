import React from "react";
import { FormProvider } from "./context/FormContext";
import MultiStepForm from "./component/multiStepForm";

const App: React.FC = () => {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
};

export default App;
