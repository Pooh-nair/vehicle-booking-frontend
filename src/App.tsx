import React from "react";
import { FormProvider } from "./context/FormContext";
import BookingPage from "./pages/BookingPage";
import "./App.css";
import { ToastContainer } from 'react-toastify';


const App: React.FC = () => {
  return (
    <FormProvider>
      <BookingPage />
      <ToastContainer />
    </FormProvider>
  );
};

export default App;
