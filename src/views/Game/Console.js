import React, { useState } from 'react';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Code,
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { move } from '../../redux/slices/gameSlice';

export default function Console() {
  const dispatch = useDispatch();
  const { currentRoom } = useSelector(state => state.game)
  const [command, setCommand] = useState('')

  const handleChange = e => {
    e.preventDefault()
    setCommand(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault()
    if (command === 'n' || command === 's' || command === 'e' || command === 'w') {
      dispatch(
        move(command)
      );
      setCommand('')
    }
  };

    return (
        <Stack p={5} justify="space-between">
            <Stack>
              <Heading as="h3" size="md">
                {currentRoom.title}
              </Heading>
              <Text>{currentRoom.description}</Text>
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
              <form onSubmit={handleSubmit}>
                <Flex mt={30}>
                  <Input
                    variant="filled"
                    size="sm"
                    mr={1}
                    placeholder="enter a command"
                    value={command}
                    onChange={handleChange}
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