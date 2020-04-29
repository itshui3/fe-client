import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../common/Layout';
import {
  Flex,
  Stack,
} from '@chakra-ui/core';

import Map from './Map'
import PlayerInfo from './PlayerInfo'
import Console from './Console'

export default function Game() {

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])

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
