import {
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  Icon,
  Tooltip,
  Progress,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { removePost, toggleLike } from "../redux/post/postActions";
import { useDateDiff } from "../hooks";

const Post = ({ post }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dateDiff = useDateDiff();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postRemove = useSelector((state) => state.postRemove);
  const { success: postRemoveSuccess } = postRemove;

  const removePostHandler = () => {
    setLoading(true);
    dispatch(removePost(post.id));
  };

  const toggleLikeHandler = () => {
    dispatch(toggleLike(post.id));
  };

  useEffect(() => {
    if (postRemoveSuccess) {
      setLoading(false);
    }
  }, [postRemoveSuccess]);

  return (
    <Card marginBottom={"2"}>
      {loading && <Progress size="xs" isIndeterminate />}
      <CardBody>
        <Flex
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          marginBottom={"2"}
        >
          <Flex direction={"column"} marginBottom="2.5">
            <Text fontSize={"1xl"} fontWeight={"semibold "} color={"gray.600"}>
              {post.user.name}
            </Text>

            <Text color={"gray.500"}>{dateDiff(post.created_at)}</Text>
          </Flex>

          {userInfo.id === post.user_id && (
            <Tooltip label="remove this post" hasArrow placement="right-start">
              <Icon
                as={CloseIcon}
                cursor={"pointer"}
                color={"gray.600"}
                onClick={removePostHandler}
              />
            </Tooltip>
          )}
        </Flex>
        <Text marginBottom={"4"} fontSize={"md"}>
          {post.content}
        </Text>
        <Flex marginTop={"2"}>
          <Tooltip
            label={
              post.likes.findIndex((like) => like.user_id === userInfo.id) !==
              -1
                ? "unlike this post"
                : "like this post"
            }
            hasArrow
          >
            <Button variant={"ghost"} onClick={toggleLikeHandler}>
              <Box
                as="span"
                className="material-icons"
                color={
                  post.likes.findIndex(
                    (like) => like.user_id === userInfo.id
                  ) !== -1 && "red.400"
                }
              >
                favorites
              </Box>
              <Text marginLeft={"-1.5"}>{post.likes.length}</Text>
            </Button>
          </Tooltip>
          <Tooltip label="add comment to this post" hasArrow>
            <Button
              variant={"ghost"}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <Box as="span" className="material-icons">
                chat_bubble
              </Box>
              <Text marginLeft={"2"}>{post.comments.length}</Text>
            </Button>
          </Tooltip>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Post;
