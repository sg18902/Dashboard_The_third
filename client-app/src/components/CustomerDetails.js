import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableSortLabel, TableHead, TableRow, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';

const CustomerDetails = ({ month, isSales }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortDirection, setSortDirection] = useState(''); // Sorting direction
    const [orderBy, setOrderBy] = useState(''); // Column to sort by

    useEffect(() => {
        const fetchCustomerData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/customers?month=${month}`);
                if (!response.ok) throw new Error('Failed to fetch data. Kindly try again later.');
                const data = await response.json();
                setCustomers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [month]);

    // Determine the maximum sales value to set the width of the bars
    const maxSales = Math.max(...customers.map(customer => customer.sales), 0);
    const maxQuantities = Math.max(...customers.map(customer => customer.quantity), 0);

    // Handle sorting
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Sort data
    const sortedRows = [...customers].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return sortDirection === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <Paper sx={{ p: 2, height: '400px', borderRadius: '25px' }}>
            <Typography variant="h6">Customer Details</Typography>
            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '400px',
                        textAlign: 'center',
                    }}
                >
                    <CircularProgress sx={{ mb: 2 }} />
                    <Typography variant="body1" color="textSecondary">
                        Loading, please wait...
                    </Typography>
                </Box>)}
            {error && (
                <Box
                    sx={{
                        mb: 2, // margin-bottom to space from other components
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Alert
                        severity="error"
                        sx={{
                            width: '100%',
                            maxWidth: 600, // max-width for better readability
                            boxShadow: 1, // optional: adds a shadow for better contrast
                        }}
                    >
                        {error}
                    </Alert>
                </Box>
            )}
            {!loading && !error && (
                <TableContainer sx={{ maxHeight: 360 }}>
                    <Table stickyHeader>
                        <TableHead sx={{ background: 'blue' }}>
                            <TableRow>
                                <TableCell
                                    sx={{ px: 0, maxWidth: '17px', fontSize: '0.875rem' }}
                                    sortDirection={orderBy === 'id' ? sortDirection : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'id'}
                                        direction={orderBy === 'id' ? sortDirection : 'asc'}
                                        onClick={() => handleRequestSort('id')}
                                    >
                                        Cust ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0, maxWidth: '20px', fontSize: '0.875rem' }}
                                    sortDirection={orderBy === 'country' ? sortDirection : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'country'}
                                        direction={orderBy === 'country' ? sortDirection : 'asc'}
                                        onClick={() => handleRequestSort('country')}
                                    >
                                        Country
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0, maxWidth: '20px', fontSize: '0.875rem' }}
                                    sortDirection={orderBy === 'date' ? sortDirection : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'date'}
                                        direction={orderBy === 'date' ? sortDirection : 'asc'}
                                        onClick={() => handleRequestSort('date')}
                                    >
                                        Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0, maxWidth: '10px', fontSize: '0.875rem', borderRight: '1px solid #ccc' }}
                                    sortDirection={orderBy === 'purchases' ? sortDirection : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'purchases'}
                                        direction={orderBy === 'purchases' ? sortDirection : 'asc'}
                                        onClick={() => handleRequestSort('purchases')}
                                    >
                                        No.
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ px: 0 }} sortDirection={orderBy === (isSales ? 'sales' : 'quantity') ? sortDirection : false}>
                                    <TableSortLabel
                                        active={orderBy === (isSales ? 'sales' : 'quantity')}
                                        direction={orderBy === (isSales ? 'sales' : 'quantity') ? sortDirection : 'asc'}
                                        onClick={() => handleRequestSort(isSales ? 'sales' : 'quantity')}
                                    >
                                        {isSales ? "Sales" : "Quantity"}
                                    </TableSortLabel>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows?.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell sx={{ px: 0, maxWidth: '17px', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{customer.id}</TableCell>
                                    <TableCell sx={{ px: 0, maxWidth: '20px', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{customer.country}</TableCell>
                                    <TableCell sx={{ px: 0, maxWidth: '20px', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{customer.date}</TableCell>
                                    <TableCell
                                        sx={{
                                            px: 0,
                                            maxWidth: '10px',
                                            fontSize: '0.875rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            borderRight: '1px solid #ccc', // Add this line for a right border
                                            textAlign: 'center'
                                        }}
                                    >
                                        {customer.purchases}
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: isSales ? `${(customer.sales / maxSales) * 100}%` : `${(customer.quantity / maxQuantities) * 100}%`,
                                                    height: 16,
                                                    backgroundColor: isSales ? 'blue' : '#640D6B',
                                                    borderRadius: '0 2px 2px 0', // Border radius only on the right side
                                                    mr: 1,
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ marginLeft: 0 }}>
                                                {isSales ? `$${customer.sales.toFixed(1)}K` : `${customer.quantity.toFixed(1)}K`}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
}

export default CustomerDetails;
