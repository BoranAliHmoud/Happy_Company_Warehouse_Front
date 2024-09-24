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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { Grid } from '@mui/material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Warehouse Name', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
  },
];

export default function Warehouse() {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]); 
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      console.log('localStorage.getItem(authToken)', localStorage.getItem('authToken'));
      try {
        const response = await axios.get(`https://localhost:7127/Warehouse/All?pageIndex=${page}&pageSize=${rowsPerPage}`,{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }); 
        setRows(response.data); 
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
    navigate(`/edit/${row.id}`);  
    console.log('Edit row:', row);
  };

  const handleItems = (row) => {
    navigate(`/Items/${row.id}`);
    localStorage.setItem('warehouseId', row.id);
    console.log('View items for row:', row);
  };

  const handleAdd = () => {
    navigate(`/edit`);
    console.log('Add row');
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" component="h2">
        Warehouse
      </Typography>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="warning"
          onClick={handleAdd}
        >
          Add Warehouse
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <div>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEdit(row)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleItems(row)}
                                style={{ marginLeft: '8px' }}
                              >
                                Items
                              </Button>
                            </div>
                          ) : (
                            column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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