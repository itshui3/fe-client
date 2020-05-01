import React, { useState } from 'react';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Code,
  Spinner,
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  move,
  combat,
  shop,
  handleError,
  getItem,
  dropItem,
} from '../../redux/slices/gameSlice';
import CombatLog from './CombatLog';

function Message({ error }) {
  if (error) {
    return (
      <Text mt={3}>
        <strong>{error}</strong>
      </Text>
    );
  } else return <></>;
}

function NPCs({ currentRoom }) {
  return (
    <Text mt={3}>
      <strong>NPCs:</strong>{' '}
      {currentRoom.NPCs.split(' ').map((npc, index) => (
        <span key={index}>
          <Code>{npc}</Code>{' '}
        </span>
      ))}
    </Text>
  );
}

function Monsters({ currentNPC }) {
  return (
    <Text mt={3}>
      <strong>A monster blocks your path - attack or run!</strong>
    </Text>
  );
}

function Items({ currentRoom }) {
  return (
    <Text mt={3}>
      <strong>Items:</strong>{' '}
      {currentRoom.items.split(' ').map((item, index) => (
        <span key={index}>
          <Code>{item}</Code>{' '}
        </span>
      ))}
    </Text>
  );
}

function Commands({ currentRoom, currentNPC, user }) {
  return (
    <>
      <Text mt={50}>
        <strong>Available commands:</strong>
      </Text>
      <Text>
        <Code>move [n, s, e, w]</Code>{' '}
        {currentRoom.items && (
          <>
            <Code>get [item]</Code>{' '}
          </>
        )}
        {user.items && (
          <>
            <Code>drop [item]</Code>{' '}
          </>
        )}
        {currentNPC && (
          <>
            <Code>attack</Code> <Code>run</Code>{' '}
          </>
        )}
        {currentRoom.NPCs?.includes('merchant') && (
          <>
            <Code>peruse</Code> <Code>buy [item]</Code> <Code>sell [item]</Code>{' '}
          </>
        )}
      </Text>
    </>
  );
}

export default function Console() {
  const dispatch = useDispatch();
  const {
    user,
    currentRoom,
    currentNPC,
    error,
    loading,
    merchantInventory,
    combatLog,
  } = useSelector((state) => state.game);
  const [command, setCommand] = useState('');
  const [prevCommand, setPrevCommand] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setCommand(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      // movement
      command === 'n' ||
      command === 's' ||
      command === 'e' ||
      command === 'w'
    ) {
      dispatch(move(command));
    } else if (command === 'attack' || command === 'run') {
      // combat
      dispatch(combat(command));
    } else if (
      // merchant commands
      currentRoom.NPCs?.includes('merchant') &&
      (command === 'peruse' ||
        command.includes('buy') ||
        command.includes('sell'))
    ) {
      if (command === 'peruse') {
        dispatch(shop(command));
      } else {
        const cmd_parse = command.split(' ');
        dispatch(shop(cmd_parse[0], cmd_parse[1]));
      }
    } else if (command.includes('get') || command.includes('drop')) {
      // get or drop an item
      const cmd_parse = command.split(' ');
      if (cmd_parse[0] === 'get') {
        dispatch(getItem(cmd_parse[1]));
      } else {
        dispatch(dropItem(cmd_parse[1]));
      }
    } else {
      handleError('Please enter a valid command.');
    }
    setPrevCommand(command);
    setCommand('');
  };

  return (
    <Stack p={5} justify="space-between" width="385px">
      <Stack>
        <Heading as="h3" size="md">
          {currentRoom.title}
        </Heading>
        <Text>{currentRoom.description}</Text>
        <Message
          prevCommand={prevCommand}
          currentRoom={currentRoom}
          error={error}
          merchantInventory={merchantInventory}
        />
        {currentRoom.NPCs?.includes('merchant') && prevCommand === 'peruse' && (
          <>
            <Text mt={3}>
              <strong>You peruse the merchant's inventory.</strong>
            </Text>
            {merchantInventory.map((item) => (
              <>
                <Text>
                  <Code>{item.name}</Code> {item.price}g, {item.quantity} in
                  stock
                </Text>
              </>
            ))}
          </>
        )}
        {currentRoom.NPCs && <NPCs currentRoom={currentRoom} />}
        {currentNPC && <Monsters currentNPC={currentNPC} />}
        {currentRoom.items && <Items currentRoom={currentRoom} />}
        <Commands
          currentRoom={currentRoom}
          currentNPC={currentNPC}
          user={user}
        />
        <form onSubmit={handleSubmit}>
          <Flex mt={30}>
            <Input
              autoFocus
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
              disabled={loading && true}
            >
              enter
            </Button>
          </Flex>
        </form>
        {loading ? (
          <Spinner style={{ alignSelf: 'center' }} mt={3} />
        ) : (
          <>
            <Stack paddingTop="40px" marginLeft="10px">
              {combatLog.length > 0 && <CombatLog combatLog={combatLog} />}
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}
