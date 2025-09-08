import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { use, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Avatar from "@mui/material/Avatar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
const schema = Yup.object({
  name: Yup.string().min(3, "Minimum three letters required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password is required"),
});
const Profile = () => {
  const [signUp, setSignUp] = useState(true);
  const [wrongCred, setWrongCred] = useState(false);
  const [exists, setExists] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const [profile, setProfile] = useState("");
  // const users = useSelector((store) => store.users);
  const { login, user, logout, localSet } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUp ? schema : loginSchema),
  });

  const handleSignup = (data) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user) => user?.email === data.email);
    if (userExists) {
      setExists(true);
      setSignUp(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      wishlist: [],
      bag: [],
      orders: [],
      profile: "",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    dispatch({ type: "ADD_USER", payload: newUser });
    setSignUp(false);
  };

  const handleLogin = (data) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      login(user);
      navigate(from, { replace: true });
    } else {
      setWrongCred(true);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
        const existing = JSON.parse(localStorage.getItem("loggedInUser"));
        const profileUser = { ...existing, profile: reader.result };
        localSet(profileUser);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    document.getElementById("avatar-upload")?.click();
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || null
    );
    if (loggedInUser) {
      setSignUp(false);
    } else setSignUp(true);
  }, [user]);

  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 8 }}>
        {!user ? (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              m: 5,
              p: 3,
              boxShadow: 3,
            }}
          >
            <form
              onSubmit={handleSubmit(signUp ? handleSignup : handleLogin)}
              autoComplete="off"
            >
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                {signUp ? "Sign Up" : "Login to continue"}
              </Typography>
              {signUp && (
                <TextField
                  fullWidth
                  label={"name"}
                  sx={{ mb: 2 }}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
              <TextField
                fullWidth
                label={"email"}
                sx={{ mb: 2 }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                label={"password"}
                sx={{ mb: 2 }}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
              />
              {signUp && (
                <TextField
                  fullWidth
                  label={"confirm password"}
                  sx={{ mb: 2 }}
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  type="password"
                />
              )}
              <button
                style={{
                  width: "100%",
                  padding: 10,
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
                type="submit"
              >
                {signUp ? "Sign Up" : "Login"}
              </button>
              <Typography
                sx={{
                  mt: 2,
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
                onClick={() => setSignUp(!signUp)}
              >
                {signUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </Typography>
            </form>
          </Card>
        ) : (
          <Grid size={12} my={2}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              position={"relative"}
            >
              <Avatar
                alt="Remy Sharp"
                src={user.profile || ""}
                sx={{ width: "100px", height: "100px" }}
              />
              <Box
                position={"absolute"}
                bottom={55}
                right={"calc(50% - 40px)"}
                onClick={handleClick}
              >
                <AddAPhotoIcon sx={{ color: "grey", fontSize: 24 }} />
              </Box>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Typography variant="h6" m={2}>
                Hello, {user?.name}
              </Typography>
            </Box>

            <Link to="/wishlist">
              <Button
                fullWidth
                sx={{
                  textTransform: "none",
                  color: "black",

                  justifyContent: "flex-start",
                }}
                size="large"
              >
                Wishlist
              </Button>
            </Link>

            <Link to="/bag">
              <Button
                fullWidth
                sx={{
                  textTransform: "none",
                  color: "black",
                  justifyContent: "flex-start",
                }}
                size="large"
              >
                Bag
              </Button>
            </Link>

            <Button
              fullWidth
              sx={{
                textTransform: "none",
                color: "black",

                justifyContent: "flex-start",
              }}
              disabled
              size="large"
            >
              Orders
            </Button>

            <Button
              fullWidth
              sx={{
                textTransform: "none",
                color: "black",

                justifyContent: "flex-start",
              }}
              size="large"
              disabled
            >
              Contact Us
            </Button>

            <Box sx={{ mt: "auto", mb: 2 }}>
              <Button
                onClick={() => setLogoutDialog(true)}
                sx={{
                  textTransform: "none",
                  color: "black",

                  justifyContent: "flex-start",
                }}
              >
                <Typography>Logout</Typography>
              </Button>
            </Box>
          </Grid>
        )}
        <Snackbar
          open={wrongCred}
          autoHideDuration={3000}
          onClose={() => setWrongCred(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setWrongCred(false)}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            wrong credentials
          </Alert>
        </Snackbar>
        <Snackbar
          open={exists}
          autoHideDuration={3000}
          onClose={() => setExists(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setExists(false)}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Email already exists
          </Alert>
        </Snackbar>
        <Dialog
          open={logoutDialog}
          onClose={() => setLogoutDialog(false)}
          sx={{ p: 1, borderRadius: 5 }}
        >
          <DialogContent>Are you sure, you want to Logout?</DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                logout(), setLogoutDialog(false);
              }}
              sx={{
                textTransform: "none",
                color: "black",
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => setLogoutDialog(false)}
              sx={{
                textTransform: "none",
                color: "black",
              }}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default Profile;
