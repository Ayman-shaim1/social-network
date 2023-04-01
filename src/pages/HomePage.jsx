import React, { useEffect, useState } from "react";
import { AddPost, Post } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertIcon, CircularProgress, Flex } from "@chakra-ui/react";
import { getPosts } from "../redux/post/postActions";

const HomePage = () => {
  const [callApi, setCallApi] = useState(false);

  const dispatch = useDispatch();
  const postList = useSelector(state => state.postList);
  const { errors, loading, posts } = postList;

  useEffect(() => {
    if (!callApi) {
      dispatch(getPosts());
    }
  }, [callApi]);

  return (
    <>
      <AddPost />
      {loading && (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <CircularProgress
            isIndeterminate
            value={59}
            size='100px'
            thickness='4px'
          />
        </Flex>
      )}

      {errors &&
        errors.length > 0 &&
        errors.map(error => (
          <Alert status='error' marginBottom={"2.5"}>
            <AlertIcon />
            {error}
          </Alert>
        ))}
      {posts.length > 0
        ? posts.map(post => <Post post={post} key={post.id} />)
        : !loading && (
            <Alert status='warning' marginBottom={"2.5"}>
              <AlertIcon />
              nothing is found !
            </Alert>
          )}
    </>
  );
};

export default HomePage;
