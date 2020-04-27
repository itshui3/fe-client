import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import Layout from '../../common/Layout';
import {
  FormControl,
  FormLabel,
  Text,
  Link,
  Input,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/core';

export default function Register() {
  return (
    <Layout minH="100vh" maxW="100vw">
      <Flex minH="92vh" flexDirection="column" justify="center" align="center">
        <FormControl w="30vw">
          <FormLabel htmlFor="username" mt={5} color="gray.50">
            Username
          </FormLabel>
          <Input name="username" id="username" variant="flushed" />
          <FormLabel htmlFor="password" mt={5} color="gray.50">
            Password
          </FormLabel>
          <Input name="password" id="password" variant="flushed" />
          <FormLabel htmlFor="confirm_password" mt={5} color="gray.50">
            Confirm Password
          </FormLabel>
          <Input
            name="confirm_password"
            id="confirm_password"
            variant="flushed"
          />
          <Stack w="100%" align="center">
            <Button
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
        </FormControl>
      </Flex>
    </Layout>
  );
}
