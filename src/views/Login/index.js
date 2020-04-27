import React from 'react';
import { login } from '../../redux/slices/authSlice';
import { Button } from '@chakra-ui/core';
import { useHistory } from 'react-router';

export default function Login() {
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_API_URL);
    console.log('hey!');
    history.push(process.env.REACT_APP_API_URL);
    login();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Click me</Button>
    </form>
  );
}
