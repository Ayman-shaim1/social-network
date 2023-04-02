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

const Post = ({ post }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const postRemove = useSelector(state => state.postRemove);
  const { success: postRemoveSuccess } = postRemove;

  const postToggleLike = useSelector(state => state.postToggleLike);
  const { loading: postToggleLikeLoading } = postToggleLike;

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
      {loading && <Progress size='xs' isIndeterminate />}
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
              post.likes.findIndex(like => like.user_id === userInfo.id) !== -1
                ? "unlike this post"
                : "like this post"
            }
            hasArrow>
            <Button
              variant={"ghost"}
              onClick={toggleLikeHandler}
              //disabled={postToggleLikeLoading}
            >
              <Box
                as='span'
                className='material-icons'
                color={
                  post.likes.findIndex(like => like.user_id === userInfo.id) !==
                    -1 && "red.400"
                }>
                favorites
              </Box>
              <Text marginLeft={"-1.5"}>{post.likes.length}</Text>
            </Button>
          </Tooltip>
          <Tooltip label='add comment to this post' hasArrow>
            <Button
              variant={"ghost"}
              onClick={() => navigate(`/post/${post.id}`)}>
              <Box as='span' className='material-icons'>
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
