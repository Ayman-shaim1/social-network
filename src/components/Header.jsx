import { Flex, Box, Button, Text, Link } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { logout } from "../redux/user/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box as='header' py={4} boxShadow='sm' backgroundColor={"white"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        px={["10", "28"]}>
        <Link as={ReachLink} fontSize={["md", "lg"]} to='/home'>
          Social Network
        </Link>
        <Flex alignItems={"center"}>
          <Button colorScheme={"blue"} onClick={logoutHandler}>
            <i className='material-icons'>logout</i>
            logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
