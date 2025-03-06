import { useState } from "react";
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

const Step2Wheels = ({ nextStep }: { nextStep?: () => void }) => {
  const { formData, setFormData } = useFormContext();
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!formData.wheels) {
      setError(true);
    } else {
      setError(false);
      nextStep?.();
    }
  };

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
            Number of Wheels
          </Typography>

          <FormControl
            component="fieldset"
            error={error}
            sx={{ width: "100%" }}
          >
            <RadioGroup
              value={formData.wheels}
              onChange={(e) =>
                setFormData({ ...formData, wheels: e.target.value })
              }
            >
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="2 Wheeler"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="4 Wheeler"
              />
            </RadioGroup>
            {error && (
              <Typography
                color="error"
                sx={{ fontSize: "0.875rem", marginTop: 1 }}
              >
                Please select a wheel option.
              </Typography>
            )}
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={handleNext}
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Step2Wheels;
