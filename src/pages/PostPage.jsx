import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CircularProgress,
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddComment, Comment } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostById,
  resetGetPostById,
  toggleLike,
} from "../redux/post/postActions";

const PostPage = () => {
  const [callApi, setCallApi] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const postGetById = useSelector(state => state.postGetById);
  const {
    loading: postGetByIdLoading,
    errors: postGetByIdErrors,
    success,
    post,
  } = postGetById;

  const toggleLikeHandler = () => {
    dispatch(toggleLike(post.id));
  };
  useEffect(() => {
    if (!success) {
      dispatch(getPostById(params.id));
    }
    return () => {
      if (success) {
        dispatch(resetGetPostById());
      }
    };
  }, [success, dispatch]);

  return (
    <>
      <Button
        marginBottom={"2"}
        colorScheme={"blue"}
        onClick={() => navigate("/")}>
        <span class='material-icons'>arrow_back</span>
        posts
      </Button>

      {postGetByIdLoading && (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <CircularProgress
            isIndeterminate
            value={59}
            size='100px'
            thickness='4px'
          />
        </Flex>
      )}
      {postGetByIdErrors &&
        postGetByIdErrors.length > 0 &&
        postGetByIdErrors.map(error => (
          <Alert status='error' marginBottom={"2.5"}>
            <AlertIcon />
            {error}
          </Alert>
        ))}
      {post && (
        <>
          <Card marginBottom={"5"}>
            <CardBody>
              <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"1xl"}>
                {post && post.user.name}
              </Text>
              <Text marginBottom={"4"}>{post && post.content}</Text>
              <hr />
              <Flex marginTop={"2"}>
                <Tooltip
                  label={
                    post.likes.findIndex(
                      like => like.user_id === userInfo.id
                    ) !== -1
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
                        post.likes.findIndex(
                          like => like.user_id === userInfo.id
                        ) !== -1 && "red.400"
                      }>
                      favorites
                    </Box>
                    <Text marginLeft={"-1.5"}>{post.likes.length}</Text>
                  </Button>
                </Tooltip>
              </Flex>
            </CardBody>
          </Card>

          <hr />
          <AddComment />
          {post &&
            post.comments.length > 0 &&
            post.comments.map(comment => <Comment key={comment.id} />)}
        </>
      )}
    </>
  );
};

export default PostPage;
