import { useEffect, useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Typography,
} from "@mui/material";
import { error } from "console";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IVehicleType } from "../interface/vehicleInterface";

const VehicleTypeForm = ({
  nextStep,
  prevStep,
}: {
  nextStep?: () => void;
  prevStep?: () => void;
}) => {
  const { formData, setFormData } = useFormContext();
  const [error, setError] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const handleNext = () => {
    if (!formData.typeId) {
      setError(true);
    } else {
      setError(false);
      nextStep?.();
    }
  };

  useEffect(() => {
    const fetchAllTypesByCategory = async (categoryId: number) => {
      try {
        const response = await axios.get(
          "http://localhost:3000/vehicle/get-category-wise-types/" + categoryId
        );
        setVehicleTypes(response.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchAllTypesByCategory(formData.categoryId);
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
            Select Vehicle Type
          </Typography>

          <FormControl
            component="fieldset"
            error={error}
            sx={{ width: "100%" }}
          >
            <RadioGroup
              value={formData.typeId}
              onChange={(e) =>
                setFormData({ ...formData, typeId: e.target.value })
              }
            >
              {vehicleTypes.map((type: IVehicleType) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={<Radio />}
                  label={type.typeName}
                />
              ))}
            </RadioGroup>
            {error && (
              <Typography
                color="error"
                sx={{ fontSize: "0.875rem", marginTop: 1 }}
              >
                Please select a vehicle type.
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

export default VehicleTypeForm;
