import TabContentLayout from "@/layouts/TabContentLayout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Avatar,
  Image,
} from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import { BASE_URL, useAuth } from "@/context/authContext";
import axios from "axios";
import Initials from "../Initials";
import { UsersIcon } from "../../../public/icons";

interface User {
  role: string;
  name: string;
  lastActive: string;
  email: string;
  picture: string;
  blocked: boolean;
}

// time ago function
const timeAgo = (date: string) => {
  const currentDate = new Date();
  const previousDate = new Date(date);
  const diff = currentDate.getTime() - previousDate.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${Math.floor(hours / 24)} days ago`;
  }
};
function UserManagementTab() {
  const { user, accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const getUsersList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/user_management/list_users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setLoading(false);
      console.log(data);
      const users = data.map((user: any) => ({
        role: user.user_metadata.role,
        lastActive: user.last_login,
        name: user.name,
        email: user.email,
        picture: user.picture,
        blocked: user.blocked,
      }));

      setUsers(users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && accessToken) {
      getUsersList();
    }
  }, [user, accessToken]);

  return (
    <TabContentLayout title="All users" loading={loading}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th px={0}>
                <Box display={"flex"} alignItems={"center"} gap={4}>
                  <Box
                    height={"30px"}
                    width={"30px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    display={"flex"}
                    bg={"#F6F7FB"}
                    borderRadius={"50%"}
                  >
                    <UsersIcon width={"13.87px"} height="13.87px" />
                  </Box>
                  <Text fontWeight={"400"} fontSize={"12px"}>
                    NAME
                  </Text>
                </Box>
              </Th>
              <Th>
                <Text fontWeight={"400"} fontSize={"12px"}>
                  ROLE
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"400"} fontSize={"12px"}>
                  LAST ACTIVE
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, idx) => (
              <Tr key={idx}>
                <Td px={0} py={6}>
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Initials name={user.name} />
                    <Box>
                      <Text fontSize={"16px"} fontWeight={"400"}>
                        {user.name}
                      </Text>
                      <Text
                        color={"#81859C"}
                        fontSize={"14px"}
                        fontWeight={"400"}
                      >
                        {user.email}
                      </Text>
                    </Box>
                  </Box>
                </Td>
                <Td>
                  <Text color={"#81859C"} fontSize={"14px"} fontWeight={"400"}>
                    {user.role}
                  </Text>
                </Td>
                <Td>
                  <Text color={"#5D5F6D"} fontSize={"14px"} fontWeight={"400"}>
                    {timeAgo(user.lastActive)}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </TabContentLayout>
  );
}

export default UserManagementTab;
