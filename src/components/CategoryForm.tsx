import { useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useFormContext } from "../context/FormContext";
import axios from "axios";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IVehicleCategory } from "../interface/vehicleInterface";

const CategoryForm = ({
  nextStep,
  prevStep,
}: {
  nextStep?: () => void;
  prevStep?: () => void;
}) => {
  const { formData, setFormData } = useFormContext();
  const [error, setError] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const handleNext = () => {
    if (!formData.categoryId) {
      setError(true);
    } else {
      setError(false);
      nextStep?.();
    }
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/vehicle/get-all-categories"
        );
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategories();
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
            Select Category of Vehicle
          </Typography>

          <FormControl
            component="fieldset"
            error={error}
            sx={{ width: "100%" }}
          >
            <RadioGroup
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              {categoryData.map((category: IVehicleCategory) => (
                <FormControlLabel
                  key={category.id}
                  value={category.id}
                  control={<Radio />}
                  label={category.categoryName}
                />
              ))}
            </RadioGroup>
            {error && (
              <Typography
                color="error"
                sx={{ fontSize: "0.875rem", marginTop: 1 }}
              >
                Please select a vehicle category.
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
              color="primary"
              fullWidth
              endIcon={<ArrowForward />}
              sx={{ marginTop: 3 }}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CategoryForm;
