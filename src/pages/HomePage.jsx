import React, { useEffect, useRef, useState } from "react";
import { AddPost, Post } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  AlertIcon,
  Box,
  CircularProgress,
  Flex,
  useToast,
} from "@chakra-ui/react";
import {
  getPosts,
  resetRemovePost,
  resetToggleLikePost,
} from "../redux/post/postActions";

const HomePage = () => {
  const [callApi, setCallApi] = useState(false);
  const sectionRef = useRef(null);

  const toast = useToast();
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { errors: postListErrors, loading, posts } = postList;

  const postRemove = useSelector((state) => state.postRemove);
  const { success: postRemoveSuccess, errors: postRemoveErrors } = postRemove;

  const postToggleLike = useSelector((state) => state.postToggleLike);
  const { success: postToggleLikeSuccess, errors: postToggleLikeErrors } =
    postToggleLike;

  useEffect(() => {
    if (!callApi) {
      dispatch(getPosts());
      setCallApi(true);
    }
    if (postRemoveSuccess) {
      dispatch(resetRemovePost());
      toast({
        title: "Post removed.",
        description: "Your post have been removed successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    if (postToggleLikeSuccess) {
      dispatch(resetToggleLikePost());
    }
    const handleScroll = (event) => {
      const section = sectionRef.current;
      const scrollPosition = window.pageYOffset;

      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callApi, postRemoveSuccess, postToggleLikeSuccess]);

  return (
    <>
      <AddPost />
      {loading && (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <CircularProgress
            isIndeterminate
            value={59}
            size="100px"
            thickness="4px"
          />
        </Flex>
      )}
      {postRemoveErrors &&
        postRemoveErrors.length > 0 &&
        postRemoveErrors.map((error) => (
          <Alert status="error" marginBottom={"2.5"}>
            <AlertIcon />
            {error}
          </Alert>
        ))}
      {postToggleLikeErrors &&
        postToggleLikeErrors.length > 0 &&
        postToggleLikeErrors.map((error) => (
          <Alert status="error" marginBottom={"2.5"}>
            <AlertIcon />
            {error}
          </Alert>
        ))}
      {postListErrors &&
        postListErrors.length > 0 &&
        postListErrors.map((error) => (
          <Alert status="error" marginBottom={"2.5"}>
            <AlertIcon />
            {error}
          </Alert>
        ))}

      <Box as="div" ref={sectionRef}>
        {posts.length > 0
          ? posts.map((post) => <Post post={post} key={post.id} />)
          : !loading && (
              <Alert status="warning" marginBottom={"2.5"}>
                <AlertIcon />
                nothing is found !
              </Alert>
            )}
      </Box>
    </>
  );
};

export default HomePage;
