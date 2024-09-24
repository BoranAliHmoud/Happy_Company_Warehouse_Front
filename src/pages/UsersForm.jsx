import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper
} from '@mui/material';
import api from '../lib/helpers/api';
import { useNavigate } from 'react-router-dom';
 
const UserForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const userData = {
        email,
        Password,
        fullName,
        role,
        isActive, 
    };

    try {
        var res= await api.post('https://localhost:7127/User/AddUser', userData); 

        if(res.data.isAuthenticated)
         {
          navigate(`/Users`);
        console.log('Success:');
      }
      else{
        console.error('Error:', res.data.message);
      }

        
    } catch (error) {
        console.error('Error:', error);
        
    }
};

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 4 }}>
    <Typography variant="h4" component="h2" gutterBottom>
     Users Forms
    </Typography>
    <form onSubmit={handleSubmit}>
    

     

      <TextField
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
 <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
  <TextField
        label="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Management">Management</MenuItem>
          <MenuItem value="Auditor">Auditor</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            color="primary"
          />
        }
        label="Active"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </Paper>
  );
};

export default UserForm;