import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../common/Layout';
import { Flex, Button } from '@chakra-ui/core';

function ButtonLink({ path, text }) {
  const { push } = useHistory();
  const handleClick = () => {
    push(path);
  };
  return (
    <Button
      m={5}
      size="lg"
      color="gray.50"
      variantColor="gray"
      variant="outline"
      _hover={{ color: '#000' }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}

export default function Home() {
  return (
    <Layout minH="100vh" maxW="100vw">
      <Flex minH="92vh" flexDirection="column" justify="center" align="center">
        <ButtonLink path="/register" text="start a new adventure" />
        <ButtonLink path="/login" text="returning adventurer?" />
      </Flex>
    </Layout>
  );
}
