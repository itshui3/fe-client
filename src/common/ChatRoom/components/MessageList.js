import React from 'react';
import { Flex } from '@chakra-ui/core';

export default function MessageList({ messages }) {
  console.log('stuff', messages);
  return (
    <Flex direction="column" align="center">
      {messages?.map((message) => (
        <Flex key={message.id} direction="column" align="center">
          {/* {console.log('message object', message)} */}
          <h1>{message.username}</h1>
          <h1>{message.message}</h1>
        </Flex>
      ))}
    </Flex>
  );
}
