import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  styled,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/appSlice";
import { useLoginMutation, useRegisterMutation } from "../../api/UserApi";
import { Link } from "react-router-dom";
import { BaseRoutes } from "../helper/Routing";
import { useNavigate } from "react-router-dom";

const WelcomeMessage = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "1rem",
  textAlign: "center",
  color: "#1976d2", // Blue color
  "& .icon": {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
    color: "#1976d2", // Blue color
  },
});

export const Register = (props) => {
  const { nextPage } = props;
  const [cookies, setCookies] = useCookies();
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const [
    registerPost,
    {
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
    },
  ] = useRegisterMutation();

  // EventHandler
  const onRegisterClick = async (email, password, name, contact) => {
    await registerPost({ email, password, name, contact })
      .unwrap()
      .then((payload) => {
          console.log("Success Register");
      })
      .catch((error) => console.log("error"));
  };
  // Yup for form validation
  const registerSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    name: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(/^\d{8}$/, "Mobile number must be exactly 8 digits")
      .required("Required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobile: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      // make api call or perform other actions
      onRegisterClick(
        values.email,
        values.password,
        values.name,
        values.mobile
        );
        navigate(BaseRoutes.Login);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Box sx={{ width: "500px" }}>
        <WelcomeMessage variant="h6">
          Welcome to <span style={{ color: "#dc3545" }}>my</span>
          <span style={{ color: "#ffc107" }}>Fitness</span>!
          <FontAwesomeIcon className="icon" icon={faSmile} />
        </WelcomeMessage>
        <Divider sx={{ marginBottom: "1rem" }} />

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                type="name"
                placeholder="Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                type="mobile"
                placeholder="Mobile"
                variant="outlined"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  bgcolor: "#23418B",
                  "&:hover": { bgcolor: "#1a2e5d" },
                }}
                fullWidth
                
              >
                Register as user
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to={BaseRoutes.Login}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    bgcolor: "#23418B",
                    "&:hover": { bgcolor: "#1a2e5d" },
                  }}
                  fullWidth
                >
                  Back to Login
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
