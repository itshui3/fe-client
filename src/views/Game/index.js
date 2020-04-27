import React from 'react';
import Layout from '../../common/Layout';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Image,
  Input,
  Button,
  Code,
} from '@chakra-ui/core';
export default function Game() {
  return (
    <Layout minH="100vh" maxW="100vw">
      <Stack minH="92vh" justify="center" align="center">
        <Flex w={950} h={800} backgroundColor="gray.400">
          <Stack h="100%" backgroundColor="gray.500" p={5}>
            <Stack h="100%" justify="space-between">
              <Box w={570} h={570} backgroundColor="gray.50" />
              <Flex h={175}>
                <Box width={150}>
                  <Image src="https://via.placeholder.com/150" />
                </Box>
                <Stack pl={3}>
                  <Text>
                    <strong>Player Name</strong>, Warrior
                  </Text>
                  <Text>
                    <strong>HP:</strong> 100/100 <strong>MP:</strong> 20/20
                  </Text>
                  <Text>
                    <strong>Gold:</strong> 560
                  </Text>
                  <Text>
                    <strong>Inventory:</strong> <Code>item 1</Code>{' '}
                    <Code>item 2</Code> <Code>item 3</Code> <Code>item 4</Code>{' '}
                    <Code>item 5</Code>
                  </Text>
                </Stack>
              </Flex>
            </Stack>
          </Stack>
          <Stack p={5} justify="space-between">
            <Stack>
              <Heading as="h3" size="md">
                Outside Cave Entrance
              </Heading>
              <Text>North of you, the cave mouth beckons.</Text>
              <Text mt={3}>
                <strong>You examine the area.</strong>
              </Text>
              <Text>
                Items: <Code>health potion</Code> <Code>torch</Code>
              </Text>
              <Text mt={50}>
                <strong>Available commands:</strong>
              </Text>
              <Text>
                <Code>move [n, s, e, w]</Code> <Code>examine [room, item]</Code>{' '}
                <Code>get [item]</Code> <Code>drop [item]</Code>
              </Text>
              <form>
                <Flex mt={30}>
                  <Input
                    variant="filled"
                    size="sm"
                    mr={1}
                    placeholder="enter a command"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variantColor="gray"
                    variant="outline"
                  >
                    enter
                  </Button>
                </Flex>
              </form>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}
