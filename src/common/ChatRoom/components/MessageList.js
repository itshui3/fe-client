import React, { useEffect } from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { v4 } from 'uuid';
import pusher from '../../../pusher';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, pushMessage } from '../../../redux/slices/messagesSlice';

export default function MessageList() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  useEffect(() => {
    let channel = pusher.subscribe('chat-room');
    channel.bind('message', async function (data) {
      const incoming = JSON.stringify(data);
      const message = JSON.parse(incoming);
      console.log(message);
      dispatch(pushMessage(message));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch, getMessages]);

  return (
    <Flex
      direction="column"
      // align="center"
      m="0 0.5rem 0 0.3rem"
      maxH="80vh"
      overflowY="scroll"
      overflowX="hidden"
      w="100%"
      maxW="100%"
    >
      {messages?.map((message) => (
        <Flex key={v4()} w="100%" maxW="100%" direction="column">
          <Box m="0 0 0 0.3rem">
            <Text>{message.username}</Text>
          </Box>
          <Flex
            bg="gray.200"
            m="0 0.5rem 0.5rem 0.5rem"
            radius="1rem"
            maxW="100%"
          >
            <Text color="gray.900" id="message-end" maxW="100%" p="0.3rem">
              {message.message}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
