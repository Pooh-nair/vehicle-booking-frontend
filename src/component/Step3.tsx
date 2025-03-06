import { useEffect, useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const Step3VehicleType = () => {
  const { formData, setFormData } = useFormContext();
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    axios.get("/api/vehicle-types").then((res) => setVehicleTypes(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Type of vehicle?</h2>
      <RadioGroup
        value={formData.vehicleType}
        onChange={(e) =>
          setFormData({ ...formData, vehicleType: e.target.value })
        }
      >
        {vehicleTypes.map((type) => (
          <FormControlLabel
            key={type}
            value={type}
            control={<Radio />}
            label={type}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default Step3VehicleType;
