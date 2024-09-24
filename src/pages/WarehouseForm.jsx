import React, { useState, useEffect } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
  import api from '../lib/helpers/api';
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  
];

const WarehouseForm = ( ) => {  
  const { id } = useParams();
     console.log("id =>",id)

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    City: '',
    Country: 'US',
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const validate = () => {
    const newErrors = {};
    if (!formData.Name) newErrors.Name = 'Warehouse name is required.';
    if (!formData.Address) newErrors.Address = 'Address is required.';
    if (!formData.City) newErrors.City = 'City is required.';
    if (!formData.Country) newErrors.Country = 'Country is required.';
    return newErrors;
  };
 
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        
        if (id) {
          formData.id=id
          await api.put(`https://localhost:7127/Warehouse/Edit`, formData);  
        } else {
         
          await api.post('https://localhost:7127/Warehouse/Add', formData);
        }
        console.log('Form Data:', formData);
        setErrors({});
        navigate('/Warehouse');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

 
  useEffect(() => {
    const fetchData = async () => {
      console.log("id =>",id)
      if (id) {
        try {
          const response = await api.get(`https://localhost:7127/Warehouse/Get?Id=${id}`);  
          setFormData(
            { 
               Name:response.data.name ,
              Address: response.data.address ,
              City: response.data.city ,
              Country: response.data.country 
            }
          ); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [id]);  

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Warehouse Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Warehouse Name"
              name="Name"
              fullWidth
              required
              value={formData.Name}
              onChange={handleChange}
              error={!!errors.Name}
              helperText={errors.Name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="Address"
              fullWidth
              multiline
              rows={4}
              required
              value={formData.Address}
              onChange={handleChange}
              error={!!errors.Address}
              helperText={errors.Address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              name="City"
              fullWidth
              required
              value={formData.City}
              onChange={handleChange}
              error={!!errors.City}
              helperText={errors.City}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Country"
              name="Country"
              fullWidth
              required
              value={formData.Country}
              onChange={handleChange}
              error={!!errors.Country}
              helperText={errors.Country}
            >
              {countries.map((Country) => (
                <MenuItem key={Country.code} value={Country.code}>
                  {Country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default WarehouseForm;