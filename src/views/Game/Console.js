import React, { useState } from 'react';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Code,
  Spinner
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { move, attack, shop, handleError, getItem, dropItem } from '../../redux/slices/gameSlice';

function Message({ error }) {
  if (error) {
    return (
      <Text mt={3}>
          <strong>{error}</strong>
      </Text>
    )
  } else return <></>
};

function NPCs({ currentRoom }) {
  return (
    <Text mt={3}>
      <strong>NPCs:</strong>{' '}
        {
          currentRoom.NPCs.split(' ').map(npc => (
              <>
                  <Code>{npc}</Code>{' '}
              </>
          ))
        }
    </Text>
  )
}

function Monsters({ currentRoom }) {
  return (
    <Text mt={3}>
      <strong>Monsters:</strong>{' '}
        {
          currentRoom.mobs.split(' ').map(mob => (
              <>
                  <Code>{mob}</Code>{' '}
              </>
          ))
        }
    </Text>
  )
}

function Items({ currentRoom }) {
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
}

function Commands({ currentRoom, user }) {
  return (
    <>
      <Text mt={50}>
        <strong>Available commands:</strong>
      </Text>
      <Text>
        <Code>move [n, s, e, w]</Code>{' '}
        {currentRoom.items && <><Code>get [item]</Code>{' '}</>}                
        {user.items && <><Code>drop [item]</Code>{' '}</>}                
        {currentRoom.NPCs?.includes('merchant') && (
          <>
            <Code>peruse</Code>{' '}
            <Code>buy [item]</Code>{' '}
            <Code>sell [item]</Code>{' '}
          </>)
        }
      </Text>
    </>
  )
}

export default function Console() {
  const dispatch = useDispatch();
  const { user, currentRoom, error, loading, merchantInventory, combatLog } = useSelector(state => state.game)
  const [command, setCommand] = useState('')
  const [prevCommand, setPrevCommand] = useState('')

  const handleChange = e => {
    e.preventDefault()
    setCommand(e.target.value)
  };

  const handleSubmit = e => {
    e.preventDefault()
    if (command === 'n' || command === 's' || command === 'e' || command === 'w') {
      dispatch(move(command));
    } else if (command === 'attack') {
      dispatch(attack())
    } else if ((currentRoom.NPCs?.includes('merchant')) && (command === 'peruse' || command.includes('buy') || command.includes('sell'))) {
      if (command === "peruse") {
       dispatch(shop(command))
      } else {
        const cmd_parse = command.split(' ')
        dispatch(shop(cmd_parse[0], cmd_parse[1]))
      }
    } else if (command.includes('get') || command.includes('drop')) {
      const cmd_parse = command.split(' ')
      if (cmd_parse[0] === 'get') {
        dispatch(getItem(cmd_parse[1]))
      } else {
        dispatch(dropItem(cmd_parse[1]))
      }
    }
    else {
      handleError('Please enter a valid command.')
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
              <Message
                prevCommand={prevCommand}
                currentRoom={currentRoom}
                error={error}
                merchantInventory={merchantInventory}
              />
              {(currentRoom.NPCs?.includes('merchant')) && (prevCommand === 'peruse') && (
                <>                
                  <Text mt={3}><strong>You peruse the merchant's inventory.</strong></Text>
                  {merchantInventory.map(item => (
                    <>
                      <Text>
                        <Code>{item.name}</Code> {item.price}g, {item.quantity} in stock
                      </Text>
                    </>
                  ))}
                </>
              )}
              {currentRoom.NPCs && <NPCs currentRoom={currentRoom} />}
              {currentRoom.mobs && <Monsters currentRoom={currentRoom} />}
              {currentRoom.items && <Items currentRoom={currentRoom} />}
              <Commands currentRoom={currentRoom} user={user} />
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
              <Flex mt={30} align="center" direction="column" height="360px" overflowY="auto">
                {combatLog && 
                    combatLog.map((message, index) => (
                      <div key={index}>{message}<br/></div>
                    ))
                }
              </Flex>
              {loading && <Spinner style={{ alignSelf: "center" }} mt={3} />}
            </Stack>
          </Stack>
    );
};