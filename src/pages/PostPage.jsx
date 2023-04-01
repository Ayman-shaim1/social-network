import { Button, Card, CardBody, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddComment, Comment } from "../components";

const PostPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        marginBottom={"2"}
        colorScheme={"blue"}
        onClick={() => navigate("/")}>
        <span class='material-icons'>arrow_back</span>
        posts
      </Button>

      <Card marginBottom={"5"}>
        <CardBody>
          <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"1xl"}>
            Jhon Doe
          </Text>
          <Text marginBottom={"4"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nihil,
            doloremque consectetur repudiandae corrupti alias inventore
            doloribus provident facere tenetur quasi eveniet sequi itaque, eos
            pariatur ipsum dolore, iusto tempora.
          </Text>
          <hr />
          <Flex marginTop={"2"}>
            <Tooltip label='like this post' hasArrow>
              <Button variant={"ghost"}>
                <span class='material-icons'>favorite</span>
                <Text marginLeft={"2"}>20</Text>
              </Button>
            </Tooltip>
          </Flex>
        </CardBody>
      </Card>
      <hr />
      <AddComment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </>
  );
};

export default PostPage;
