import React from 'react';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Code,
} from '@chakra-ui/core';

export default function Console() {
    return (
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
    );
};