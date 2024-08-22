import { Box, Grid, IconButton, Typography, FormControl, MenuItem, Select, FormControlLabel, Switch, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import SalesByLocation from '../components/SalesByLocation';
import TopSoldProducts from '../components/TopSoldProducts';
import CustomerDetails from '../components/CustomerDetails';
import DailySalesTrend from '../components/DailySalesTrend';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import blueBackground from '../assets/blue3.jpg';
import purpleBackground from '../assets/purple5.jpg';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function Dashboard() {
    const [selectedMonth, setSelectedMonth] = useState('March 2024');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false); // State for switch
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/dashboard_data?month=${selectedMonth}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [selectedMonth]);


    const handleTuneClick = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setIsDropdownVisible(false); // Close dropdown after selection
    };

    const handleSwitchChange = (event) => {
        setIsSwitchChecked(event.target.checked);
    };

    const QuantitySwitch = styled((props) => (
        <Switch
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
            {...props}
            onChange={handleSwitchChange}
        />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: 'blue',
                '& + .MuiSwitch-track': {
                    backgroundColor: '#6082B6',
                    opacity: 0.8,
                    border: 1,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.3,
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#987D9A',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    const round = (number, precision) => {
        if (number) {
            return Number(number.toFixed(precision));
        }
    };

    return (
        <Box
            sx={{
                background: '#E3E1D9',
                width: '100%',
                top: 0,
                left: 0,
                position: 'absolute',
                zIndex: -100
            }}
        >
            <Box
                sx={{
                    backgroundImage: `url(${isSwitchChecked ? blueBackground : purpleBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '70vh',
                    top: 0,
                    left: 0,
                    position: 'absolute'
                }}
            />

            <Box sx={{ padding: { xs: '20px', md: '40px' }, marginBottom: '20px', position: 'relative' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h3" sx={{ mb: 3, ml: 3, color: 'white', fontWeight: 'bold', fontSize: { xs: 'h4.fontSize', md: 'h3.fontSize' } }}>
                            {isSwitchChecked ? 'Online Retail Sales Dashboard' : 'Online Retail Quantity Dashboard'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: isSwitchChecked? 'rgba(0, 0, 0, 0.4)':'rgba(255, 255, 255, 0.2)',
                                padding: '8px',
                                borderRadius: '15px',
                                marginLeft: { xs: 0, md: '100px' },
                                justifyContent: 'space-between',
                                height: '40px',
                                mb: '10px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    color: 'white',
                                }}
                            >
                                <Typography
                                    sx={{
                                        width: '80px',
                                        mr: 3,
                                        fontSize: { xs: '16px', md: '20px' },
                                        fontWeight: isSwitchChecked ? 'medium' : 'bold',
                                        color: !isSwitchChecked ? 'white' : '#E6E7E5',
                                    }}
                                >
                                    Quantity
                                </Typography>
                                <FormControlLabel
                                    control={<QuantitySwitch sx={{ ml: 1 }} checked={isSwitchChecked} />}
                                    label=""
                                    sx={{
                                        '& .MuiSwitch-switchBase': {
                                            color: 'purple', // Switch thumb color
                                        },
                                        '& .MuiSwitch-track': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Track color
                                        },
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: { xs: '16px', md: '20px' },
                                        fontWeight: 'bold',
                                        fontWeight: !isSwitchChecked ? 'medium' : 'bold',
                                        color: isSwitchChecked ? 'white' : '#E6E7E5',
                                    }}
                                >
                                    Sales
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    color: 'white',
                                }}
                            >
                                {!isDropdownVisible && <Typography sx={{ mr: { xs: '16px', md: '32px' } }}>{selectedMonth}</Typography>}
                                {isDropdownVisible && (
                                    <FormControl sx={{ minWidth: 120 }}>
                                        <Select
                                            value={selectedMonth}
                                            onChange={handleMonthChange}
                                            autoWidth
                                            sx={{
                                                color: 'white', // Text color
                                                '& .MuiSelect-icon': {
                                                    color: 'white', // Icon color
                                                },
                                                mr: 0
                                            }}
                                            inputProps={{
                                                'aria-label': 'Select month',
                                            }}
                                        >
                                            <MenuItem value="January 2024">January 2024</MenuItem>
                                            <MenuItem value="February 2024">February 2024</MenuItem>
                                            <MenuItem value="March 2024">March 2024</MenuItem>
                                        </Select>

                                    </FormControl>
                                )}
                                <IconButton onClick={handleTuneClick} sx={{ color: 'white' }}>
                                    {isDropdownVisible ? <CloseIcon /> : <TuneIcon />}
                                </IconButton>
                            </Box>
                        </Box>


                    </Grid>
                </Grid>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    backgroundColor:  isSwitchChecked? 'rgba(0, 0, 0, 0.4)':'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '15px',
                    justifyContent: 'space-between',
                    height: 'auto',
                    mb: 3
                }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={3}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    justifyContent: 'center',
                                    position: 'relative',
                                    paddingRight: '30px'

                                }}
                            >
                                <GroupIcon sx={{ color: 'white', fontSize: { xs: '40px', md: '60px' } }} />
                                <Box>
                                    <Typography sx={{ fontSize: { xs: '16px', md: '20px' }, color: 'white' }}>
                                        Customers
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '24px', md: '30px' }, color: 'white' }}>
                                        {data?.total_customer}K
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: '2px',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    justifyContent: 'center',
                                    position: 'relative',
                                    paddingRight: '30px'

                                }}
                            >
                                <ShoppingBagIcon sx={{ color: 'white', fontSize: { xs: '40px', md: '60px' } }} />
                                <Box>
                                    <Typography sx={{ fontSize: { xs: '16px', md: '20px' }, color: 'white' }}>
                                        Products
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '24px', md: '30px' }, color: 'white' }}>
                                        {data?.total_products}K
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: { xs: '0px', md: '2px' },
                                        height: '100%',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    justifyContent: 'center',
                                    position: 'relative',
                                    paddingRight: '30px'
                                }}
                            >
                                {!isSwitchChecked ?
                                    <ShoppingCartIcon sx={{ color: 'white', fontSize: { xs: '40px', md: '60px' } }} />
                                    : <AttachMoneyIcon sx={{ color: 'white', fontSize: { xs: '40px', md: '60px' } }} />
                                }
                                <Box>
                                    <Typography sx={{ fontSize: { xs: '16px', md: '20px' }, color: 'white' }}>
                                        {!isSwitchChecked ? 'Quantity' : 'Sales'}
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '24px', md: '30px' }, color: 'white' }}>
                                        {!isSwitchChecked ? `${data?.total_quantity}K` : `$ ${data?.total_sales}K`}
                                    </Typography>
                                </Box>
                                {/* Vertical line */}
                                <Box
                                    sx={{
                                        width: '2px',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    justifyContent: 'center',
                                    paddingRight: '30px'

                                }}
                            >
                                <EqualizerIcon sx={{ color: 'white', fontSize: { xs: '40px', md: '60px' } }} />
                                <Box>
                                    <Typography sx={{ fontSize: { xs: '16px', md: '20px' }, color: 'white' }}>
                                        {isSwitchChecked ? 'Avg Sales' : 'Avg Quantities'}
                                    </Typography>
                                    <Typography sx={{ fontSize: { xs: '24px', md: '30px' }, color: 'white' }}>
                                        {isSwitchChecked ? `${round(data.average_quantity, 1)}K` : `${round(data.average_sales, 1)}K`} <Typography component="span" sx={{ fontSize: '0.75em', verticalAlign: 'super' }}>sold</Typography>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>

                <Box sx={{ minHeight: '80vh' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} >
                            <Box sx={{ width: '95%', height: '400px', padding: { xs: 2, md: 5 } }}>
                                <SalesByLocation month={selectedMonth} isSales={isSwitchChecked} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ width: '95%', height: '400px', padding: { xs: 2, md: 5 } }}>
                                <TopSoldProducts month={selectedMonth} isSales={isSwitchChecked} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Box sx={{ width: '95%', height: '400px', padding: { xs: 2, md: 5 } }}>
                                <CustomerDetails month={selectedMonth} isSales={isSwitchChecked} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ width: '95%', height:{xs : '270px', md: '400px'} , padding: { xs: 2, md: 5 } }}>
                                <DailySalesTrend month={selectedMonth} isSales={isSwitchChecked} />
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
            {/* <Footer /> */}
        </Box >
    );
}

export default Dashboard;
