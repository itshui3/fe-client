import React from 'react';
import { Flex } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';

export default function ChatRoom() {
  const { messages } = useSelector((state) => state.messages);

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="space-between"
        bg="gray.50"
        w="25vw"
        maxH="84vh"
        m="4vh 0 0 0"
        id="message-end"
      >
        <AddMessage />
        <MessageList messages={messages} />
      </Flex>
    </>
  );
}
