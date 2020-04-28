import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import Layout from '../../common/Layout';
import {
  Button,
  Flex,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
} from '@chakra-ui/core';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function Login() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (data) => {
    console.log("back end url:", process.env.REACT_APP_API_URL)
    dispatch(
      login({ username: data.username, password: data.password }, history)
    );
  };

  return (
    <Layout minH="100vh" maxW="100vw">
      <Flex minH="92vh" flexDirection="column" justify="center" align="center">
        <form style={{ width: '30vh' }} onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="username" mt={5} color="gray.50">
            Username
          </FormLabel>
          <Input
            name="username"
            id="username"
            variant="flushed"
            ref={register}
          />
          <FormLabel htmlFor="password" mt={5} color="gray.50" ref={register}>
            Password
          </FormLabel>
          <Input
            name="password"
            type="password"
            id="password"
            variant="flushed"
            ref={register}
          />
          <Stack w="100%" align="center">
            <Button
              type="submit"
              m={10}
              size="md"
              w={20}
              color="gray.50"
              variantColor="gray"
              variant="outline"
              _hover={{ color: '#000' }}
            >
              Login
            </Button>
            <Text mt={10} color="gray.50">
              Don't have an account?{' '}
              <Link as={ReactLink} color="gray.900" to="/register">
                Register Here
              </Link>
            </Text>
          </Stack>
        </form>
      </Flex>
    </Layout>
  );
}
