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
                <Image
                    src={user.portrait}
                    fallbackSrc="https://via.placeholder.com/150"
                />
            </Box>
            <Stack pl={3}>
                <Text>
                    <strong>{user.character_name}</strong>,{' '}
                    <span style={{ textTransform: "capitalize" }}>
                        {user.character_type}
                    </span>
                </Text>
                <Text>
                    <strong>HP:</strong> {user.HP}{' '}
                    <strong>MP:</strong> {user.MP}
                </Text>
                <Text>
                    <strong>Gold:</strong> {user.gold}
                </Text>
                <Text>
                    <strong>Inventory:</strong>{' '}
                    {
                        user.items ?
                            user.items.split(' ').map((item, index) => (
                                <span key={index}>
                                    <Code>{item}</Code>{' '}
                                </span>
                            ))
                        : 'Empty!'
                    }
                </Text>
            </Stack>
        </Flex>
    );
};