import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { use, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Profile = () => {
  const [signUp, setSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  // const users = useSelector((store) => store.users);
  const { login, user, logout } = useContext(AuthContext);
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
    }else{
      alert('wrong creds')
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || null
    );
    if (loggedInUser) {
      setSignUp(false);
    } else setSignUp(true);
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={8} lg={4}>
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
              Welcome, {user?.name}!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Email: {user?.email}
            </Typography>
            <ButtonGroup
             
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              aria-label="outlined primary button group"
            >
              <Button
                style={{
                  width: "100%",
                  padding: 10,
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: 5, 
                  textTransform:'none',
                  cursor: "pointer",
                }}
                onClick={() => navigate("/wishlist")}
              >
                Go to wishlist
              </Button>

              <Button
                style={{
                  width: "100%",
                  padding: 10,
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  textTransform:'none'
                }}
                onClick={() => navigate("/bag")}
              >
                Go to Bag
              </Button>

            </ButtonGroup>
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: 1,
                  cursor: "pointer",
                  mt: 2,
                }}
                onClick={logout}
              
              >
                Logout
              </Button>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default Profile;
