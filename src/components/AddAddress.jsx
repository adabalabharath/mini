import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { AuthContext } from "./AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";

const schema = Yup.object({
  name: Yup.string().min(3, "Minimum three letters required"),
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^\+?[1-9]\d{9,14}$/, "Invalid phone"),
  pincode: Yup.string()
    .required("Pin code is required")
    .min(6, "Pin code must be at least 6 digits"),
  houseNumber: Yup.string().required("House Number is required"),
  locality: Yup.string().required("Locality is required"),
  town: Yup.string().required("Town/City is required"),
  district: Yup.string().required("District is required"),
  state: Yup.string().required("State is required"),
});

const AddAddress = () => {
  const [defaultAddress, setDefaultAddress] = useState(true);
  const [path, setPath] = useState("");
  const { user, localSet } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const addressToEdit = location.state?.address;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: addressToEdit || {},
  });

  const onSubmit = (data) => {
    const finalData = { ...data, id: addressToEdit ? data.id : Date.now() };
    const newAddress = {
      ...user,
      address: user.address.some((x) => x.id === finalData.id)
        ? user.address.map((x) => (x.id === finalData.id ? finalData : x))
        : [...user.address, finalData],
      defaultAddress: defaultAddress ? finalData : user.defaultAddress,
    };
    localSet(newAddress);
    navigate(path);
  };

  useEffect(() => {
    setPath(location.state?.path);
  }, [location.state?.path]);

  return (
    <Box
      mt={12}
      display="flex"
      flexDirection="column"
      gap={3}
      pb={{ xs: 12, md: 0 }}
    >
      <Box display="flex" alignItems="center">
        <PlaceIcon fontSize="small" sx={{ color: "black" }} />
        <Typography variant="subtitle1" fontWeight="bold">
          {addressToEdit ? "Edit Address" : "Add New Address"}
        </Typography>
      </Box>

      {/* Contact Details */}
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Typography>Contact Details</Typography>

        <FormControl error={!!errors.name}>
          <InputLabel htmlFor="name">Name*</InputLabel>
          <OutlinedInput {...register("name")} />
          <FormHelperText>{errors.name?.message}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors.mobileNumber}>
          <InputLabel htmlFor="mobileNumber">Mobile No*</InputLabel>
          <OutlinedInput {...register("mobileNumber")} />
          <FormHelperText>{errors.mobileNumber?.message}</FormHelperText>
        </FormControl>
      </Card>

      {/* Address */}
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Typography>Address</Typography>

        <FormControl error={!!errors.pincode}>
          <InputLabel htmlFor="pincode">Pin Code*</InputLabel>
          <OutlinedInput {...register("pincode")} />
          <FormHelperText>{errors.pincode?.message}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors.houseNumber}>
          <InputLabel htmlFor="houseNumber">
            House Number/Tower/Block*
          </InputLabel>
          <OutlinedInput {...register("houseNumber")} />
          <FormHelperText>{errors.houseNumber?.message}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors.locality}>
          <InputLabel htmlFor="locality">
            Address (locality, building, street)*
          </InputLabel>
          <OutlinedInput {...register("locality")} />
          <FormHelperText>{errors.locality?.message}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors.town}>
          <InputLabel htmlFor="town">City/Town*</InputLabel>
          <OutlinedInput {...register("town")} />
          <FormHelperText>{errors.town?.message}</FormHelperText>
        </FormControl>

        <Box display="flex" gap={2}>
          <FormControl error={!!errors.district} sx={{ flex: 1 }}>
            <InputLabel htmlFor="district">District*</InputLabel>
            <OutlinedInput {...register("district")} />
            <FormHelperText>{errors.district?.message}</FormHelperText>
          </FormControl>

          <FormControl error={!!errors.state} sx={{ flex: 1 }}>
            <InputLabel htmlFor="state">State*</InputLabel>
            <OutlinedInput {...register("state")} />
            <FormHelperText>{errors.state?.message}</FormHelperText>
          </FormControl>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={defaultAddress}
              onChange={() => setDefaultAddress((prev) => !prev)}
              color="black"
            />
          }
          label="Mark this as my default address"
        />
      </Card>

      {/* Mobile Save/Cancel buttons */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "white",
          zIndex: 1000,
          boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
          p: 1,
          display: { xs: "flex", md: "none" },
        }}
      >
        <Box display="flex" px={1} justifyContent="center" gap={1} flex={1}>
          <Button
            sx={{ textTransform: "none", borderColor: "black", color: "black" }}
            variant="outlined"
            fullWidth
            onClick={() => navigate(path)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "black",
              color: "white",
            }}
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            {addressToEdit ? "Save changes" : "Save"}
          </Button>
        </Box>
      </Box>

      {/* Desktop Save/Cancel buttons */}
      <Box
        display={{ md: "flex", xs: "none" }}
        px={1}
        justifyContent="center"
        gap={1}
      >
        <Button
          sx={{ textTransform: "none", borderColor: "black", color: "black" }}
          variant="outlined"
          onClick={() => navigate(path)}
        >
          Cancel
        </Button>
        <Button
          sx={{
            textTransform: "none",
            backgroundColor: "black",
            color: "white",
          }}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          {addressToEdit ? "Save changes" : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddAddress;
