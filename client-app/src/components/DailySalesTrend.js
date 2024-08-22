import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const DailySalesTrend = ({ month, isSales }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/customers?month=${month}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setData(result);
            } catch (error) {
                setData([])
                // setError(error.message);
            }
        };
        fetchData();
    }, [month]);

    if (error) return <div>Error: {error}</div>;

    const change = {
        'January 2024': { sales: '13.6', quantity: '33.9' },
        'February 2024': { sales: '80.9', quantity: '72.5' },
        'March 2024': { sales: '25.0', quantity: '11.11' }
    };

    const categories = data.map(entry => entry.date);
    const purchases = data.map(entry => entry.purchases);
    const columnData = data.map(entry => (isSales ? entry.sales : entry.quantity));

    const chartOptions = {
        chart: {
            type: 'column',
            height: isSmallScreen   ? '230px' : '350px',
            width: null, 
            zoomType: 'xy' ,
            style: {
                cursor: 'crosshair' // Ensures crosshair cursor throughout the chart
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories,
            crosshair: true,
        },
        yAxis: [
            {
                title: {
                    text: 'Purchases'
                },
                opposite: true
            },
            {
                title: {
                    text: isSales ? 'Sales' : 'Quantity'
                }
            }
        ],
        series: [
            {
                name: 'No of Purchases',
                type: 'line',
                data: purchases,
                color: isSales ? 'blue' : '#640D6B',
                yAxis: 0,
                zIndex: 2,
                dataLabels: {
                    enabled: false
                }
            },
            {
                name: isSales ? 'Sales' : 'Quantity',
                type: 'column',
                data: columnData,
                color: isSales ? 'lightblue' : '#AF7AB3',
                yAxis: 1,
                zIndex: 1,
                dataLabels: {
                    enabled: false
                }
            }
        ],
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: false
                }
            },
            line: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        lang: {
            noData: 'No data available'
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#303030'
            }
        }
    };
    

    return (
        <Box
            sx={{
                pr: isSmallScreen ? 1 : 3,
                pl: isSmallScreen ? 1 : 3,
                pt: isSmallScreen ? 1 : 3,
                p: isSmallScreen ? 1 : 2.1,
                borderRadius: '25px',
                backgroundColor: '#fff',
                boxShadow: 1,
                height: isSmallScreen ? '300px' : '400px'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography
                    variant={isSmallScreen ? 'body1' : 'h6'}
                    sx={{ flexGrow: 1 }}
                >
                    {isSales ? 'Daily Sales Trend' : 'Daily Quantities Sold Trend'}
                </Typography>
                <Typography
                    variant={isSmallScreen ? 'h6' : 'h5'}
                    sx={{ color: 'red', mr: 1 }}
                >
                    {isSales ? `▼${change[month].sales}%` : `▼${change[month].quantity}%`}
                </Typography>
                <Typography
                    variant={isSmallScreen ? 'caption' : 'body1'}
                    sx={{ color: '#555555' }}
                >
                    vs. previous day
                </Typography>
            </Box>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </Box>
    );
};

export default DailySalesTrend;
