import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Code,
} from '@chakra-ui/core';
import { useSelector } from 'react-redux'

export default function PlayerInfo() {
    const { user } = useSelector(state => state.game)
    return (
        <Flex h={175}>
            <Box width={150}>
                <Image src="https://via.placeholder.com/150" />
            </Box>
            <Stack pl={3}>
                <Text>
                <strong>{user.name}</strong>, Warrior
                </Text>
                <Text>
                <strong>HP:</strong> 100/100 <strong>MP:</strong> 20/20
                </Text>
                <Text>
                <strong>Gold:</strong> 560
                </Text>
                <Text>
                <strong>Inventory:</strong> <Code>item 1</Code>{' '}
                <Code>item 2</Code> <Code>item 3</Code> <Code>item 4</Code>{' '}
                <Code>item 5</Code>
                </Text>
            </Stack>
        </Flex>
    );
};