import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CircularProgress,
  Flex,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { login } from "../redux/user/userActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector(state => state.userLogin);
  const { loading, errors, userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo]);

  return (
    <>
      <Card marginTop={"20"} paddingTop={"5"}>
        <CardBody>
          {errors &&
            errors.length > 0 &&
            errors.map(error => (
              <Alert status='error' marginBottom={"2.5"}>
                <AlertIcon />
                {error}
              </Alert>
            ))}
          {loading && (
            <Flex justifyContent={"center"} alignItems={"center"}>
              <CircularProgress
                isIndeterminate
                value={59}
                size='50px'
                thickness='4px'
              />
            </Flex>
          )}
          <Flex justifyContent={"center"} marginBottom={"5"}>
            <Text fontSize={"3xl"}>Login here !</Text>
          </Flex>
          <hr />
          <form action='' onSubmit={submitHandler}>
            <Box as='div' marginY={"2"}>
              <label htmlFor=''>Email :</label>
              <Input
                marginTop={"1"}
                placeholder='Enter email ...'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Box>
            <Box as='div' marginY={"2"}>
              <label htmlFor=''>Password :</label>
              <Input
                marginTop={"1"}
                placeholder='Enter password ...'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Box>
            <Button
              marginY={"2"}
              colorScheme={"blue"}
              width={"full"}
              type='submit'>
              <span className='material-icons'>login</span>
              Login
            </Button>
          </form>
          <Flex justifyContent={"center"}>
            New Customer? &nbsp;
            <Link as={ReachLink} to='/register'>
              Register
            </Link>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default LoginPage;
