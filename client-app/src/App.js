import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
