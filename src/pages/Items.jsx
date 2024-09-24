import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate,useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import api from '../lib/helpers/api';
 

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'itemName', label: 'Item Name', minWidth: 170 },
  { id: 'skuCode', label: 'SKU Code', minWidth: 100 },
  { id: 'qty', label: 'Quantity', minWidth: 100, align: 'right' },
  { id: 'costPrice', label: 'Cost Price ($)', minWidth: 100, align: 'right' },
  { id: 'msrpPrice', label: 'MSRP Price ($)', minWidth: 100, align: 'right' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];
const Items = ( ) => {  
 
  const { id } = useParams();
  console.log("id =>",id)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]); 
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`https://localhost:7127/Items/All?pageIndex=${page}&pageSize=${rowsPerPage}&WarehouseId=${id}`); // Replace with your API endpoint
        setRows(response.data); // Assuming response.data contains the array of items
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    navigate(`/editItems/${row.id}`);
    console.log('Edit row:', row);
  };

  const handleAdd = () => {
    navigate(`/editItems`);
    console.log('Add item');
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" component="h2">
        Items List
      </Typography>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="warning"
          onClick={handleAdd}
        >
          Add Item
        </Button>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.sku}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </Button>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default Items;