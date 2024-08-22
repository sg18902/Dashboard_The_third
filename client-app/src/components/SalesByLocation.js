import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer,Alert, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const SalesByLocation = ({ month, isSales }) => {
    const [cityData, setCityData] = useState([]);
    const [activeCity, setActiveCity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/city-data?month=${month}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCityData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCityData();
    }, [month]);

    // Calculate the center of the map (average location)
    const centerLat = cityData.reduce((sum, city) => sum + city.lat, 0) / cityData.length || 0;
    const centerLng = cityData.reduce((sum, city) => sum + city.lng, 0) / cityData.length || 0;

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

    return (
        <Paper sx={{ p: 2, borderRadius: '25px', backgroundColor: "#fff", height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{isSales ? "Sales by Location" : "Quantity by Location"}</Typography>
            <Box sx={{ height: '360px', display: 'flex' }}>

                {/* Map Section */}
                <Box sx={{ flex: 1, height: '100%', position: 'relative', minWidth: {xs: '60%', md: '40%'} }}>
                    <MapContainer
                        center={[centerLat, centerLng]} // Center the map on average location of cities
                        zoom={6}
                        style={{ height: '100%', width: '100%', borderRadius: '10px' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {cityData.map((city) => (
                            <Marker
                                key={city.city}
                                position={[city.lat, city.lng]}
                                eventHandlers={{
                                    mouseover: () => {
                                        setActiveCity(city);
                                    },
                                    mouseout: () => {
                                        setActiveCity(null);
                                    },
                                }}
                                icon={L.divIcon({
                                    className: 'custom-icon',
                                    html: `<div style="background-color: ${isSales ? "blue" : "#640D6B"}; width: ${isSales ? city.sales / 100 : city.quantity / 100}px; height: ${isSales ? city.sales / 100 : city.quantity / 100}px; border-radius: 50%;"></div>`,
                                    iconSize: [isSales ? city.sales / 100 : city.quantity / 100, isSales ? city.sales / 100 : city.quantity / 100],
                                })}
                            >
                                {activeCity === city && (
                                    <Popup>
                                        <Typography variant="body2"><strong>{city.city}</strong></Typography>
                                        <Typography variant="body2">{isSales ? `Sales: ${city.sales}` : `Quantity: ${city.quantity}`}</Typography>
                                    </Popup>
                                )}
                            </Marker>
                        ))}
                    </MapContainer>
                </Box>

                {/* Table Section */}
                <Box sx={{ flex: 1, height: '100%', paddingLeft: '20px', maxWidth: {xs: '28%', md: '40%'} }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: {xs: '12px', md: '20px'} }}>Top locations</Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: '91%' }}>
                        <Table stickyHeader>
                            <TableBody>
                                {cityData.map((city, index) => (
                                    <TableRow key={city.city}>
                                        <TableCell sx={{ fontSize: '0.875rem' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {city.city}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: index === 0 ? (isSales ? "#D2E0FB" : "#AF7AB3") : "#f5f5f5" }}>
                                            {isSales ? `$${city.sales}K` : `${city.quantity}K`}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Paper>
    );
};

export default SalesByLocation;
