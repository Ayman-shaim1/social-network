import { CloseIcon ,Icon} from "@chakra-ui/icons";
import { Card, CardBody, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

const Comment = () => {
  return (
    <Card marginY={"2"}>
      <CardBody>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text
            fontSize={"1xl"}
            marginBottom={"2"}
            fontWeight={"semibold "}
            color={"gray.500"}>
            Jhon Doe
          </Text>
          <Tooltip label='remove this comment' hasArrow placement='right-start'>
            <Icon as={CloseIcon} cursor={"pointer"} color={"gray.600"} />
          </Tooltip>
        </Flex>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
          officiis reiciendis commodi a ut dolorem accusamus vero sunt eos!
          Recusandae corporis a esse veritatis maxime fugiat expedita enim aut
          ad.
        </Text>
      </CardBody>
    </Card>
  );
};

export default Comment;
