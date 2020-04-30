import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Input, Button } from '@chakra-ui/core';
import { postMessage } from '../../../redux/slices/messagesSlice';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

export default function AddMessage() {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [token] = useState(jwt_decode(localStorage.getItem('token')));
  // console.log(token);
  const onSubmit = (data) => {
    const values = {
      username: token.username,
      message: data.message,
    };
    console.log(data);
    dispatch(postMessage(values));
  };
  return (
    <Flex direction="column" align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" align="center">
          <Input type="text" name="message" ref={register} />
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </Flex>
  );
}
