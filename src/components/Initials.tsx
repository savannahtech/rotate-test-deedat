import { Box, Text } from "@chakra-ui/react";
import React from "react";

function Initials({ name }: { name: string }) {
  const initial = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <Box
      height={"35px"}
      width={"35px"}
      bg="#F6F7FB"
      borderRadius={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontWeight={"400"} color={"#7C8187"} fontSize={"14px"}>
        {initial[0].toUpperCase()}
      </Text>
    </Box>
  );
}

export default Initials;
