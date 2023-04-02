import { Button, Card, CardBody, Progress, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCreatePost, createPost } from "../redux/post/postActions";
import { useToast } from "@chakra-ui/react";
const AddPost = () => {
  const [content, setContent] = useState("");

  const toast = useToast();
  const dispatch = useDispatch();
  const postCreate = useSelector(state => state.postCreate);
  const { errors, success, loading } = postCreate;

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createPost(content));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetCreatePost());
      toast({
        title: "Post created.",
        description: "Your post have been created successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setContent("");
    }
  }, [success]);

  return (
    <Card w={"full"} marginBottom='5'>
      {loading && <Progress size='xs' isIndeterminate />}
      <CardBody>
        {errors &&
          errors.length > 0 &&
          errors.map(error => (
            <Alert status='error' marginBottom={"2.5"}>
              <AlertIcon />
              {error}
            </Alert>
          ))}

        <form action='' onSubmit={submitHandler}>
          <Textarea
            marginBottom='2'
            placeholder='What is in your mind ...'
            backgroundColor={"gray.50"}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Button colorScheme={"blue"} width={"full"} type='submit'>
            <i className='material-icons'>add</i>
            Add post
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddPost;
