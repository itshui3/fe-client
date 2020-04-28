import React from 'react';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import Layout from '../../common/Layout';
import {
  FormControl,
  FormLabel,
  Text,
  Link,
  Input,
  Select,
  Button,
  Flex,
  Stack,
  Image,
  RadioGroup,
  Radio
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register as registerAction } from '../../redux/slices/authSlice';

export default function Register() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (data) => {
    dispatch(
      registerAction(
        {
          username: data.username,
          password1: data.password1,
          password2: data.password2,
        },
        history
      )
    );
  };
  return (
    <Layout minH="100vh" maxW="100vw">
      <Flex minH="92vh" flexDirection="column" justify="center" align="center">
        <form
          style={{ width: '75vh' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isRequired>
            <FormLabel htmlFor="username" mt={5} color="gray.50">
              Username
            </FormLabel>
            <Input
              name="username"
              id="username"
              variant="flushed"
              ref={register}
            />
          </FormControl>
          <Flex justify="space-between">
            <FormControl w="48%" isRequired>
              <FormLabel htmlFor="password" mt={5} color="gray.50">
                Password
              </FormLabel>
              <Input
                name="password"
                type="password"
                id="password"
                variant="flushed"
                ref={register}
              />
            </FormControl>
            <FormControl w="48%" isRequired>
              <FormLabel htmlFor="confirm_password" mt={5} color="gray.50">
                Confirm Password
              </FormLabel>
              <Input
                name="confirm_password"
                type="password"
                id="confirm_password"
                variant="flushed"
                ref={register}
              />
            </FormControl>
          </Flex>
          <Flex justify="space-between">
            <FormControl w="48%" isRequired>
              <FormLabel htmlFor="character_name" mt={5} color="gray.50">
                Character Name
              </FormLabel>
              <Input
                name="character_name"
                id="character_name"
                variant="flushed"
                ref={register}
              />
            </FormControl>
            <FormControl w="48%" isRequired>
              <FormLabel htmlFor="character_type" mt={5} color="gray.50">Class</FormLabel>
              <Select name="character_type" id="character_type" variant="flushed" ref={register}>
                <option value="warrior">Warrior</option>
                <option value="mage">Mage</option>
                <option value="thief">Thief</option>
              </Select>
            </FormControl>
          </Flex>
          <FormControl as="fieldset" mt={5} isRequired>
            <FormLabel htmlFor="portrait" color="gray.50" as="legend">Appearance</FormLabel>
            <RadioGroup
              style={{ display: "flex", justifyContent: "space-between" }}
              defaultValue="https://i.imgur.com/33YFmmJ.png"
              name="portrait"
              id="portrait"
              ref={register}
            >
                <Radio value="https://i.imgur.com/33YFmmJ.png">
                  <Image
                    src="https://i.imgur.com/33YFmmJ.png"
                    fallbackSrc="https://via.placeholder.com/150"
                    size={150}
                    alt="Portrait of an elf"
                  />
                </Radio>
                <Radio value="https://i.imgur.com/eHbbvJu.png">
                  <Image
                    src="https://i.imgur.com/eHbbvJu.png"
                    fallbackSrc="https://via.placeholder.com/150"
                    size={150}
                    alt="Portrait of a cat person"
                  />
                </Radio>
                <Radio value="https://i.imgur.com/ELrdSHC.png">
                  <Image
                    src="https://i.imgur.com/ELrdSHC.png"
                    fallbackSrc="https://via.placeholder.com/150"
                    size={150}
                    alt="Portrait of a tiefling"
                  />
                </Radio>
            </RadioGroup>
          </FormControl>
          <Stack w="100%" align="center">
            <Button
              type="submit"
              m={10}
              size="md"
              w={125}
              color="gray.50"
              variantColor="gray"
              variant="outline"
              _hover={{ color: '#000' }}
            >
              Get Started
            </Button>
            <Text mt={10} color="gray.50">
              Already have a character?{' '}
              <Link as={ReactLink} color="gray.900" to="/login">
                Login Here
              </Link>
            </Text>
          </Stack>
        </form>
      </Flex>
    </Layout>
  );
}
