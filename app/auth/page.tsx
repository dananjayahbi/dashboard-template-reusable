"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoginFormData, RegisterFormData } from "@/types";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? 1 : 0;

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setError(null);
    router.push(`/auth?tab=${newValue === 0 ? "login" : "register"}`, {
      scroll: false,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!registerData.name || !registerData.email || !registerData.password) {
      setError("All fields are required");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Registration successful, switch to login tab
      setActiveTab(0);
      setError(null);
      // Show success message
      setLoginData({
        email: registerData.email,
        password: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Change to viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            width: "100%",
          }}
        >
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 1, fontWeight: "bold", width: "100%" }}
        >
          {activeTab === 0 ? "Welcome Back" : "Create Account"}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, width: "100%" }}
        >
          {activeTab === 0
            ? "Sign in to access your account"
            : "Sign up to start using Dashboard-Template"}
        </Typography>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
            width: "100%",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="auth tabs"
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#1976d2",
                height: 3,
              },
            }}
          >
            <Tab
              label="Sign In"
              sx={{
                fontWeight: "medium",
                "&.Mui-selected": {
                  color: "#1976d2",
                  fontWeight: "bold",
                },
              }}
            />
            <Tab
              label="Sign Up"
              sx={{
                fontWeight: "medium",
                "&.Mui-selected": {
                  color: "#1976d2",
                  fontWeight: "bold",
                },
              }}
            />
          </Tabs>
        </Box>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, width: "100%" }}
          >
            {error}
          </Alert>
        )}
        
        {/* Login Form */}
        {activeTab === 0 && (
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="login-email" shrink>
                Email Address
              </InputLabel>
              <OutlinedInput
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={loginData.email}
                onChange={handleLoginChange}
                notched
                label="Email Address"
                required
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: "#f5f8fa",
                  "&:hover": {
                    backgroundColor: "#f0f4f8",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="login-password" shrink>
                Password
              </InputLabel>
              <OutlinedInput
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={loginData.password}
                onChange={handleLoginChange}
                notched
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: "#f5f8fa",
                  "&:hover": {
                    backgroundColor: "#f0f4f8",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                borderRadius: 1.5,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>
        )}
        
        {/* Register Form */}
        {activeTab === 1 && (
          <Box
            component="form"
            onSubmit={handleRegisterSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register-name" shrink>
                Full Name
              </InputLabel>
              <OutlinedInput
                id="register-name"
                name="name"
                autoComplete="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                notched
                label="Full Name"
                required
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: "#f5f8fa",
                  "&:hover": {
                    backgroundColor: "#f0f4f8",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register-email" shrink>
                Email Address
              </InputLabel>
              <OutlinedInput
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                notched
                label="Email Address"
                required
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: "#f5f8fa",
                  "&:hover": {
                    backgroundColor: "#f0f4f8",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register-password" shrink>
                Password
              </InputLabel>
              <OutlinedInput
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={registerData.password}
                onChange={handleRegisterChange}
                notched
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: "#f5f8fa",
                  "&:hover": {
                    backgroundColor: "#f0f4f8",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
              <FormHelperText>
                Password must be at least 6 characters
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register-confirm-password" shrink>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="register-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                notched
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                required
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: "#f5f8fa",
                  "&:hover": {
                    backgroundColor: "#f0f4f8",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                borderRadius: 1.5,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
