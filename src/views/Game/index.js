import React from 'react';
import Layout from '../../common/Layout';
import {
  Flex,
  Stack,
} from '@chakra-ui/core';

import Map from './Map'
import PlayerInfo from './PlayerInfo'
import Console from './Console'

export default function Game() {
  return (
    <Layout minH="100vh" maxW="100vw">
      <Stack minH="92vh" justify="center" align="center">
        <Flex w={950} h={800} backgroundColor="gray.400">
          <Stack h="100%" backgroundColor="gray.500" p={5}>
            <Stack h="100%" justify="space-between">
              <Map />
              <PlayerInfo />
            </Stack>
          </Stack>
          <Console />
        </Flex>
      </Stack>
    </Layout>
  );
}
