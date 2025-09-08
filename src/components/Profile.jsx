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

const Profile = () => {
  const [signUp, setSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const [profile,setProfile]=useState("")
  // const users = useSelector((store) => store.users);
  const { login, user, logout,localSet } = useContext(AuthContext);
  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
  }, [signUp]);
  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // check if user already exists
    const userExists = users.some((user) => user?.email === email);
    if (userExists) {
      alert("User already exists!");
      setSignUp(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      wishlist: [],
      bag: [],
      orders: [],
      profile:""
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    dispatch({ type: "ADD_USER", payload: newUser });
    setSignUp(false);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      login(user);
      navigate(from, { replace: true });
    } else {
      alert("wrong creds");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
        const existing=JSON.parse(localStorage.getItem('loggedInUser'))
        const profileUser={...existing,profile:reader.result}
        localSet(profileUser)
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
  }, []);

  console.log(user)

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
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              {signUp ? "Sign Up" : "Login"}
            </Typography>
            {signUp && (
              <TextField
                fullWidth
                label={"name"}
                sx={{ mb: 2 }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            )}
            <TextField
              fullWidth
              label={"email"}
              sx={{ mb: 2 }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              fullWidth
              label={"password"}
              sx={{ mb: 2 }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {signUp && (
              <TextField fullWidth label={"confirm password"} sx={{ mb: 2 }} />
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
              onClick={signUp ? handleSignup : handleLogin}
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
              <Box position={"absolute"} bottom={55} right={"calc(50% - 40px)"} onClick={handleClick}>
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
              disabled
            >
              Contact Us
            </Button>

            <Box sx={{ mt: "auto", mb: 2 }}>
              <Button
                onClick={logout}
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
      </Grid>
    </Grid>
  );
};

export default Profile;
