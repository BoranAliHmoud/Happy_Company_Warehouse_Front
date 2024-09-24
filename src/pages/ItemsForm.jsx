import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
   
  Typography,
  Paper,
  Grid,
   
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
  
import api from '../lib/helpers/api';
 
 

const ItemsForm = () => {
  const   WarehouseId  = localStorage.getItem('warehouseId');
  console.log("WarehouseId =>", localStorage.getItem('warehouseId'))
  const { id } = useParams();
  console.log("id Items=>",id)
  const [formData, setFormData] = useState({
    itemName: '',
    skuCode: '',
    qty: '',
    costPrice: '',
    msrpPrice: '',
    warehouseId: WarehouseId,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   
  const validate = () => {
    const newErrors = {};
    if (!formData.itemName) newErrors.itemName = 'اسم العنصر مطلوب.';
    if (!formData.qty) newErrors.qty = 'الكمية مطلوبة.';
    else if (!Number.isInteger(Number(formData.qty)) || Number(formData.qty) < 1) {
      newErrors.qty = 'الكمية يجب أن تكون عددًا صحيحًا أكبر من أو يساوي 1.';
    }
    if (!formData.costPrice) newErrors.costPrice = 'سعر التكلفة مطلوب.';
    else if (isNaN(Number(formData.costPrice)) || Number(formData.costPrice) < 0) {
      newErrors.costPrice = 'سعر التكلفة يجب أن يكون رقمًا صالحًا.';
    }
    if (formData.msrpPrice && (isNaN(Number(formData.msrpPrice)) || Number(formData.msrpPrice) < 0)) {
      newErrors.msrpPrice = 'سعر MSRP يجب أن يكون رقمًا صالحًا.';
    }
     
    return newErrors;
  };

  // دالة لمعالجة إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        if (id) {
        
          await api.put(`https://localhost:7127/Items/Edit`, formData);  
        } else {
          
          await api.post('https://localhost:7127/Items/Add', formData);  
        }
        console.log('Data submitted successfully:', formData);
        setErrors({});
        navigate(`/items/${formData.warehouseId}`); // إعادة التوجيه إلى قائمة العناصر
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  // دالة لجلب البيانات عند وجود ID
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`https://localhost:7127/Items/Get?Id=${id}`);  
          setFormData(response.data);  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [id]);

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Items Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Item Name"
              name="itemName"
              fullWidth
              required
              value={formData.itemName}
              onChange={handleChange}
              error={!!errors.itemName}
              helperText={errors.itemName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="SKU Code"
              name="skuCode"
              fullWidth
              value={formData.skuCode}
              onChange={handleChange}
              error={!!errors.skuCode}
              helperText={errors.skuCode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Qty"
              name="qty"
              type="number"
              fullWidth
              required
              value={formData.qty}
              onChange={handleChange}
              error={!!errors.qty}
              helperText={errors.qty}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cost Price"
              name="costPrice"
              type="number"
              fullWidth
              required
              value={formData.costPrice}
              onChange={handleChange}
              error={!!errors.costPrice}
              helperText={errors.costPrice}
              InputProps={{ step: '0.01', min: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="MSRP Price"
              name="msrpPrice"
              type="number"
              fullWidth
              value={formData.msrpPrice}
              onChange={handleChange}
              error={!!errors.msrpPrice}
              helperText={errors.msrpPrice}
              InputProps={{ step: '0.01', min: 0 }}
            />
          </Grid>
        
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ItemsForm;
