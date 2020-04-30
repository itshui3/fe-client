import React, { useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/core';
import Layout from '../Layout';
import pusher from '../../pusher';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, pushMessage } from '../../redux/slices/messagesSlice';
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';

export default function ChatRoom() {
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
  }, []);

  useEffect(() => {
    dispatch(getMessages());
    // console.log('watermellon', messages);
  }, [dispatch, getMessages]);

  // console.log('watermellon', messages);

  return (
    <Layout>
      <Flex direction="column" justify="center">
        <Text color="gray.50">Hello, world! Welcome to the chat room!</Text>
        <MessageList messages={messages} />
        <AddMessage />
      </Flex>
    </Layout>
  );
}
