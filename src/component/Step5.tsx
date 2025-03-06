import { TextField } from "@mui/material";
import { useFormContext } from "../context/FormContext";

const Step1Name = () => {
  const { formData, setFormData } = useFormContext();

  return (
    <div>
      <h2 className="text-xl mb-4">What is your name?</h2>
      <TextField
        label="First Name"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        fullWidth
      />
      <TextField
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        fullWidth
        className="mt-3"
      />
    </div>
  );
};

export default Step1Name;
