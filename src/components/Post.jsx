import {
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  return (
    <Card marginBottom={"2"}>
      <CardBody>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          marginBottom={"2"}>
          <Text
            fontSize={"1xl"}
            marginBottom={"2"}
            fontWeight={"semibold "}
            color={"gray.500"}>
            {post.user.name}
          </Text>

          {userInfo.id === post.user_id && (
            <Tooltip label='remove this post' hasArrow placement='right-start'>
              <Icon as={CloseIcon} cursor={"pointer"} color={"gray.600"} />
            </Tooltip>
          )}
        </Flex>
        <Text marginBottom={"4"} fontSize={"md"}>
          {post.content}
        </Text>
        <Flex marginTop={"2"}>
          <Tooltip label='like this post' hasArrow>
            <Button variant={"ghost"}>
              <span class='material-icons'>favorite</span>
              <Text marginLeft={"2"}>{post.likes.length}</Text>
            </Button>
          </Tooltip>
          <Tooltip label='add comment to this post' hasArrow>
            <Button
              variant={"ghost"}
              onClick={() => navigate(`/post/${post.id}`)}>
              <span class='material-icons'>chat_bubble</span>
              <Text marginLeft={"2"}>{post.comments.length}</Text>
            </Button>
          </Tooltip>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Post;
