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

function Message({ error }) {
  if (error) {
    return (
      <Text mt={3}>
          <strong>{error}</strong>
      </Text>
    )
  }
  else return <></>
};

function Items({ currentRoom }) {
  if (currentRoom.items) {
    if (currentRoom.items.includes(' ')) {
      return (
        <Text mt={3}>
          <strong>Items:</strong>{' '}
            {
              currentRoom.items.split(' ').map(item => (
                  <>
                      <Code>{item}</Code>{' '}
                  </>
              ))
            }
        </Text>
      )
    } else {
      return (
        <Text mt={3}>
          <strong>Items:</strong>{' '}
          <Code>{currentRoom.items}</Code>
        </Text>
      )
    }
  } else return <></>
}

export default function Console() {
  const dispatch = useDispatch();
  const { currentRoom, error } = useSelector(state => state.game)
  const [command, setCommand] = useState('')
  const [prevCommand, setPrevCommand] = useState('')

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
    }
    setPrevCommand(command)
    setCommand('')
  };

    return (
        <Stack p={5} justify="space-between">
            <Stack>
              <Heading as="h3" size="md">
                {currentRoom.title}
              </Heading>
              <Text>{currentRoom.description}</Text>
              <Message prevCommand={prevCommand} currentRoom={currentRoom} error={error} />
              <Items currentRoom={currentRoom} error={error} />
              <Text mt={50}>
                <strong>Available commands:</strong>
              </Text>
              <Text>
                <Code>move [n, s, e, w]</Code>{' '}
                {currentRoom.items && (
                <><Code>get [item]</Code> <Code>drop [item]</Code></>
                )}
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