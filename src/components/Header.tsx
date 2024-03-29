import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Logo } from "../../public/icons";
import { useAuth } from "@/context/authContext";
import Image from "next/image";

function Header() {
  const { user, logout } = useAuth();
  return (
    <Box bg={"white"} p={5}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxW={"75.25rem"}
        mx={"auto"}
        zIndex={100}
      >
       <Image src={"/logo.png"} alt="logo" width={150} height={27.69} />
        {user && (
          <Box display={"flex"} alignItems={"center"} gap={3}>
            <Box>
              <Text fontSize="16px" fontWeight="bold">
                {user?.name}
              </Text>
              <Text fontSize="14px" fontWeight="400">
                {user?.email}
              </Text>
            </Box>

            <Avatar name={user?.name} src={user?.picture} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Header;
