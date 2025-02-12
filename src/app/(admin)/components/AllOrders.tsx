'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { OrderProps } from '../../../../types';
import { db } from '../../../../pages/api/dpConfig';
import { Order } from '../../../../pages/api/schema';
import { desc, eq } from 'drizzle-orm';
import { MenuItem, Select, SelectChangeEvent, Button } from '@mui/material';
import OrderDetailsDialog from './OrderDetailsDialog';

const statusOptions = ['ordered', 'in production', 'shipped', 'delivered'];

const AllOrders = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const paginationModel = { page: 0, pageSize: 15 };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const result = await db.select().from(Order).orderBy(desc(Order.id));
      setOrders(result);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (event: SelectChangeEvent, id: number) => {
    const newStatus = event.target.value;

    try {
      await db.update(Order).set({ status: newStatus }).where(eq(Order.id, id));

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleOpenDialog = (order: OrderProps) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'street', headerName: 'Street', width: 130 },
    { field: 'city', headerName: 'City', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Select
          value={params.value ?? 'ordered'}
          onChange={(event) => handleStatusChange(event, params.row.id)}
          fullWidth
          size="small"
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: 'productsDetails',
      headerName: 'Product Details',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenDialog(params.row)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="m-8">
        <h1 className='text-2xl font-bold mb-4'>Orders</h1>
      <Paper sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[ 15, 20,25 ]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>


      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default AllOrders;
