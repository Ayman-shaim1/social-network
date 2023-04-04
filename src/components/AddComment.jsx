import { Button, Card, CardBody, Progress, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, resetAddComment } from "../redux/post/postActions";

const AddComment = ({ idPost }) => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const postAddComment = useSelector(state => state.postAddComment);
  const { loading, success } = postAddComment;

  const submitHandler = e => {
    e.preventDefault();
    if (content) {
      dispatch(addComment(idPost, content));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(resetAddComment());
    }
  }, []);

  return (
    <Card w={"full"} marginY='5'>
      {loading && <Progress size='xs' isIndeterminate />}
      <CardBody>
        <form action='' onSubmit={submitHandler}>
          <Textarea
            marginBottom='2'
            placeholder='Write a comment for this post ...'
            backgroundColor={"gray.50"}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Button colorScheme={"blue"} width={"full"} type='submit'>
            <i className='material-icons'>add</i>
            Add comment
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddComment;
