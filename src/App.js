import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const App = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signupFor, setSignupFor] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email && !phone) {
      setError(true);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone, signupFor }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setSuccess(true);
      setEmail('');
      setPhone('');
      setSignupFor('');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(true);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Soul Connect
        </Typography>
        <Box mb={2}>
          <img src="placeholder-logo.png" alt="Logo" width={100} height={100} />
        </Box>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="1234567890"
            fullWidth
            margin="normal"
          />
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Who are you signing up for?</FormLabel>
            <RadioGroup
              value={signupFor}
              onChange={(e) => setSignupFor(e.target.value)}
            >
              <FormControlLabel value="self" control={<Radio />} label="Myself" />
              <FormControlLabel value="son" control={<Radio />} label="Son" />
              <FormControlLabel value="daughter" control={<Radio />} label="Daughter" />
              <FormControlLabel value="friend" control={<Radio />} label="Friend" />
            </RadioGroup>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
        <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
          <Alert onClose={() => setError(false)} severity="error">
            Error signing up. Please try again.
          </Alert>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">
            Signup successful!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default App;
