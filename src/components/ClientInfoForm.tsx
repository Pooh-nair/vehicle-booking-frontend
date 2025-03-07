import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useFormContext } from "../context/FormContext";
import { ArrowForward } from "@mui/icons-material";

const ClientInfoForm = ({
  nextStep,
}: {
  nextStep?: () => void;
  prevStep?: () => void;
  reset?: () => void;
}) => {
  const { formData, setFormData } = useFormContext();
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName) {
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
        height: "100vh", // Full screen height
        backgroundColor: "#f4f4f4",
        padding: 2,
      }}
    >
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            What's your Name?
          </Typography>

          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            fullWidth
            variant="outlined"
            margin="normal"
            error={error && !formData.firstName}
            helperText={
              error && !formData.firstName ? "First name is required" : ""
            }
          />

          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            fullWidth
            variant="outlined"
            margin="normal"
            error={error && !formData.lastName}
            helperText={
              error && !formData.lastName ? "Last name is required" : ""
            }
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleNext}
            endIcon={<ArrowForward />}
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientInfoForm;
