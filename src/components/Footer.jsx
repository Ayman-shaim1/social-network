import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box as='footer' backgroundColor={"white"}>
      <hr />
      <Container paddingY={"5"}>
        <Flex justifyContent={"center"}>
          <Text>Copyright &copy; social-network</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
