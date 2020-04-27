import React from 'react';
import Layout from '../../common/Layout';
import { Flex, Button } from '@chakra-ui/core';

export default function Home() {
  return (
    <Layout minH="100vh" maxW="100vw">
      <Flex minH="92vh" flexDirection="column" justify="center" align="center">
        <Button
          m={5}
          size="lg"
          color="gray.50"
          variantColor="gray"
          variant="outline"
          _hover={{ color: '#000' }}
        >
          start a new adventure
        </Button>
        <Button
          m={5}
          size="lg"
          color="gray.50"
          variantColor="gray"
          variant="outline"
          _hover={{ color: '#000' }}
        >
          returning adventurer?
        </Button>
      </Flex>
    </Layout>
  );
}
