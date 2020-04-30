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

function Message({ prevCommand, currentRoom, error }) {
  if (error) {
    return (
      <Text mt={3}>
          <strong>{error}</strong>
      </Text>
    )
  }
  else if (prevCommand === 'examine room') {
    return (
      <>
        <Text mt={3}>
          <strong>You examine the area.</strong>
        </Text>
        {
          currentRoom.items.length > 0 ? (
              <Text>
                Items:{' '}
                {
                  currentRoom.items.map(item => (
                      <>
                          <Code>{item.title}</Code>{' '}
                      </>
                  ))
                }
              </Text>
          ) : <Text>There is nothing of interest.</Text>
        }
      </>
    )
  } else return <></>
};

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