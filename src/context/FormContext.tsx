import { createContext, useContext, useState } from "react";

const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    categoryId: null,
    typeId: null,
    vehicleId: null,
    startDate: "",
    endDate: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
