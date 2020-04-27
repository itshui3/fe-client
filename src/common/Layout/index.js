/* eslint-disable react/prop-types */
import React from 'react';
import { Flex, Link, Box, Text } from '@chakra-ui/core';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';

export default function Layout({ children }) {
  const history = useHistory();
  return (
    <Flex
      minH="100vh"
      maxW="100vw"
      direction="column"
      align="center"
      backgroundColor="gray.600"
    >
      <Box w="100%">
        <Flex
          h="8vh"
          bg="gray.900"
          align="center"
          justify="space-between"
          p="0 2rem"
        >
          <Link as={NavLink} to="/">
            <Text fontSize="2xl" color="gray.50" fontFamily="mono">
              Game of [object Object]
            </Text>
          </Link>
          {localStorage.getItem('token') ? (
            <Flex>
              <Link as={NavLink} to="/game">
                <Text color="gray.50" fontSize="lg">
                  Play Now!
                </Text>
              </Link>
              <Text
                color="gray.50"
                fontSize="lg"
                onClick={() => {
                  localStorage.removeItem('token');
                  history.push('/');
                }}
                style={{ cursor: 'pointer' }}
                m="0 2rem"
              >
                Logout
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Link fontSize="lg" as={NavLink} to="/login" m="0 2rem">
                <Text color="gray.50">Login</Text>
              </Link>
              <Link fontSize="lg" as={NavLink} to="/register">
                <Text color="gray.50">Register</Text>
              </Link>
            </Flex>
          )}
        </Flex>
      </Box>
      {/* <Box h="5rem" /> */}
      <Box>{children}</Box>
    </Flex>
  );
}
