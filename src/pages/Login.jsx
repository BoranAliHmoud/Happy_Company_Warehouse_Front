import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // لاستخدام التوجيه بعد تسجيل الدخول

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    tenantId: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // لعمل التوجيه بعد تسجيل الدخول

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.tenantId) newErrors.tenantId = 'Tenant is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // إرسال الطلب إلى API لتسجيل الدخول
        const response = await axios.post('https://localhost:7127/User/Login', formData);

        // حفظ التوكن في LocalStorage
        const token = response.data.token;
        localStorage.setItem('authToken', token);
		localStorage.setItem('isAuthenticated',response.data.isAuthenticated);
		localStorage.setItem('username',response.data.username);
		localStorage.setItem('role',response.data.roles[0]);


		console.log('authToken=>', token);
		console.log('isAuthenticated=>',response.data.isAuthenticated);
		console.log('username=>',response.data.username);
		console.log('role=>',response.data.roles[0]);





console.log("token =>",token)
       
       navigate('/');
       setIsAuthenticated(true);
      } catch (error) {
        setErrors({ apiError: 'Login failed. Please check your credentials.' });
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2b2b2b 40%, #3a3a3a)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          backgroundColor: '#202020',
          boxShadow: 3,
          borderRadius: 2,
          color: '#fff',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Tenant"
            name="tenantId"
            value={formData.tenantId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff', borderColor: '#fff' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#fff',
                },
                '&:hover fieldset': {
                  borderColor: '#4caf50',
                },
              },
            }}
            error={!!errors.tenantId}
            helperText={errors.tenantId}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff', borderColor: '#fff' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#fff',
                },
                '&:hover fieldset': {
                  borderColor: '#4caf50',
                },
              },
            }}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff', borderColor: '#fff' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#fff',
                },
                '&:hover fieldset': {
                  borderColor: '#4caf50',
                },
              },
            }}
            error={!!errors.password}
            helperText={errors.password}
          />

          {errors.apiError && (
            <Typography color="error" align="center">
              {errors.apiError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#4caf50',
              color: '#202020',
              marginTop: 2,
              '&:hover': {
                backgroundColor: '#43a047',
              },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
