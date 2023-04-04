import { CloseIcon, Icon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Flex,
  Progress,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDateDiff } from "../hooks";
import { removeComment, resetRemoveComment } from "../redux/post/postActions";

const Comment = ({ comment }) => {
  const [loading, setLoading] = useState(false);

  const dateDiff = useDateDiff();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postRemoveComment = useSelector((state) => state.postRemoveComment);
  const { success } = postRemoveComment;

  const postGetById = useSelector((state) => state.postGetById);
  const { post } = postGetById;

  const dispatch = useDispatch();

  const removeCommentHandler = () => {
    setLoading(true);
    dispatch(removeComment(post.id, comment.id));
  };

  useEffect(() => {
    if (success) {
      setLoading(false);
      dispatch(resetRemoveComment());
    }
  });

  return (
    <Card marginY={"2"}>
      {loading && <Progress size="xs" isIndeterminate />}
      <CardBody>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex direction={"column"} marginBottom="2.5">
            <Text fontSize={"1xl"} fontWeight={"semibold "} color={"gray.600"}>
              {post.user.name}
            </Text>

            <Text color={"gray.500"}>{dateDiff(comment.created_at)}</Text>
          </Flex>
          {userInfo && userInfo.id === comment.user.id && (
            <Tooltip
              label="remove this comment"
              hasArrow
              placement="right-start"
            >
              <Icon
                as={CloseIcon}
                cursor={"pointer"}
                color={"gray.600"}
                onClick={removeCommentHandler}
              />
            </Tooltip>
          )}
        </Flex>
        <Text>{comment.content}</Text>
      </CardBody>
    </Card>
  );
};

export default Comment;
