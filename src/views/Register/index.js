import React from 'react';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import Layout from '../../common/Layout';
import {
  FormLabel,
  Text,
  Link,
  Input,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register as registerAction } from '../../redux/slices/authSlice';

export default function Register() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (data) => {
    dispatch(
      registerAction(
        {
          username: data.username,
          password1: data.password1,
          password2: data.password2,
        },
        history
      )
    );
  };
  return (
    <Layout minH="100vh" maxW="100vw">
      <Flex minH="92vh" flexDirection="column" justify="center" align="center">
        <form
          style={{ width: '30vh' }}
          w="30vw"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormLabel htmlFor="username" mt={5} color="gray.50">
            Username
          </FormLabel>
          <Input
            name="username"
            id="username"
            variant="flushed"
            ref={register}
          />
          <FormLabel htmlFor="password" mt={5} color="gray.50">
            Password
          </FormLabel>
          <Input
            name="password1"
            type="password"
            id="password"
            variant="flushed"
            ref={register}
          />
          <FormLabel htmlFor="confirm_password" mt={5} color="gray.50">
            Confirm Password
          </FormLabel>
          <Input
            name="password2"
            type="password"
            id="confirm_password"
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
              Register
            </Button>
            <Text mt={10} color="gray.50">
              Already have an account?{' '}
              <Link as={ReactLink} color="gray.900" to="/login">
                Login Here
              </Link>
            </Text>
          </Stack>
        </form>
      </Flex>
    </Layout>
  );
}
