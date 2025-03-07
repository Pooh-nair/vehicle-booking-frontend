import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext } from "../context/FormContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IVehicle } from "../interface/vehicleInterface";

const VehicleForm = ({
  nextStep,
  prevStep,
}: {
  nextStep?: () => void;
  prevStep?: () => void;
}) => {
  const { formData, setFormData } = useFormContext();
  const [error, setError] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);

  const handleNext = () => {
    if (!formData.vehicleId) {
      setError(true);
    } else {
      setError(false);
      nextStep?.();
    }
  };

  useEffect(() => {
    const fetchAllVehicleByType = async (typeId: number) => {
      try {
        const response = await axios.get(
          "http://localhost:3000/vehicle/get-type-wise-vehicles/" + typeId
        );
        setVehicleData(response.data);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };
    fetchAllVehicleByType(formData.typeId);
  }, []);
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
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Select Vehicle
          </Typography>

          <FormControl
            component="fieldset"
            error={error}
            sx={{ width: "100%" }}
          >
            <RadioGroup
              value={formData.vehicleId}
              onChange={(e) =>
                setFormData({ ...formData, vehicleId: e.target.value })
              }
            >
              {vehicleData.map((vehicle: IVehicle) => (
                <FormControlLabel
                  key={vehicle.id}
                  value={vehicle.id}
                  control={<Radio />}
                  label={vehicle.vehicleName}
                />
              ))}
            </RadioGroup>
            {error && (
              <Typography
                color="error"
                sx={{ fontSize: "0.875rem", marginTop: 1 }}
              >
                Please select a vehicle.
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
              sx={{ marginTop: 3 }}
              onClick={() => prevStep?.()}
              startIcon={<ArrowBack />}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 3 }}
              onClick={handleNext}
              endIcon={<ArrowForward />}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VehicleForm;
