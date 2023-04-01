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
import { register } from "../redux/user/userActions";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector(state => state.userRegister);
  const { errors, loading } = userRegister;

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match !");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
    console.log(errors);
  }, [userInfo]);

  return (
    <>
      <Card marginTop={"20"}>
        <CardBody>
          {message && (
            <Alert status='error' marginBottom={"2.5"}>
              <AlertIcon />
              {message}
            </Alert>
          )}
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
            <Text fontSize={"3xl"}>Register here !</Text>
          </Flex>
          <hr />

          <form action='' onSubmit={submitHandler}>
            <Box as='div' marginY={"2"}>
              <label htmlFor=''>Name :</label>
              <Input
                marginTop={"1"}
                placeholder='Enter name ...'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Box>

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
            <Box as='div' marginY={"2"}>
              <label htmlFor=''>Confirm Password :</label>
              <Input
                marginTop={"1"}
                placeholder='Enter Confirm password ...'
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Box>
            <Button
              marginY={"2"}
              colorScheme={"blue"}
              width={"full"}
              type='submit'>
              <span class='material-icons'>login</span>
              Login
            </Button>
          </form>
          <Flex justifyContent={"center"}>
            Already have an account? &nbsp;{" "}
            <Link as={ReachLink} to='/login'>
              Sign In
            </Link>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default RegisterPage;
