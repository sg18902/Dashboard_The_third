import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Alert, TableContainer, TableRow, Paper, Typography, Box, CircularProgress } from '@mui/material';

const TopSoldProducts = ({ month, isSales }) => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/product-data?month=${encodeURIComponent(month)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProductData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [month]);

    if (loading) return (
        <Box
            sx={{
                p: 2, borderRadius: '25px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px',
                textAlign: 'center',backgroundColor: "#fff"
            }}
        >
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body1" color="textSecondary">
                Loading, please wait...
            </Typography>
        </Box>
    );
if (error) return (
    <Paper sx={{ p: 2, borderRadius: '25px', backgroundColor: "#fff", height: '400px' }}>
    <Box
        sx={{
            mb: 2, // margin-bottom to space from other components
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
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
    </Paper>
);
    const maxSales = Math.max(...productData.map(product => product.sales), 1);
    const maxQuantities = Math.max(...productData.map(product => product.quantity), 1);

    return (
        <Paper sx={{ p: 2, height: '400px', borderRadius: '25px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Top Sold Products
            </Typography>
            <TableContainer sx={{ maxHeight: 350 }}>
                <Table stickyHeader>
                    <TableBody>
                        {productData.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell sx={{ fontSize: '0.875rem', maxWidth: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {product.name}
                                </TableCell>
                                <TableCell sx={{ p: 1, textAlign: 'right', fontSize: '0.875rem', maxWidth: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', borderRight: '1px solid #ccc' }}>
                                    {isSales ? product.percentage.sales : product.percentage.quantity}
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.875rem', p: 0, minWidth: '60%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: isSales ? `${(product.sales / maxSales) * 100}%` : `${(product.quantity / maxQuantities) * 100}%`,
                                                height: 16,
                                                backgroundColor: isSales ? 'blue' : '#640D6B',
                                                borderRadius: 1,
                                                mr: 1,
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                            {isSales ? `${product.sales.toFixed(1)}K` : `${product.quantity.toFixed(1)}K`}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TopSoldProducts;
