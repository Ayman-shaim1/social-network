import { Button, Card, CardBody, Textarea } from "@chakra-ui/react";
import React from "react";

const AddComment = () => {
  return (
    <Card w={"full"} marginY='5'>
      <CardBody>
        <Textarea
          marginBottom='2'
          placeholder='Write a comment for this post ...'
          backgroundColor={"gray.50"}
        />
        <Button colorScheme={"blue"} width={"full"}>
          <i className='material-icons'>add</i>
          Add comment
        </Button>
      </CardBody>
    </Card>
  );
};

export default AddComment;
