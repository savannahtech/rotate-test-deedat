"use client";
import Header from "@/components/Header";
import AccountTab from "@/components/tabs/AccountTab";
import UserManagementTab from "@/components/tabs/UserManagementTab";
import { useAuth } from "@/context/authContext";
import { Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { login, user, handleAuthCallback, accessToken } = useAuth();

  useEffect(() => {
    if (!user && !code && !accessToken) {
      login(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
    }
  }, [user, code, accessToken]);

  useEffect(() => {
    if (code) {
      handleAuthCallback(code);
    }
  }, [code]);

  return (
    <Box
      bg="#FBFBFC"
      height={"100vh"}
      overflowY={"scroll"}
     
    >
      <Header />
      {user && accessToken && (
        <Box overflowY={"hidden"} mx={"auto"} maxW={"64.188rem"} py={10} px={4}>
          <Text fontSize={"28px"} fontFamily={"AvenirNextCyr-Bold"} fontWeight={"bold"}>
            Settings
          </Text>

          <Box mt={7}>
            <Tabs>
              <TabList borderBottomWidth={1}  gap={4}>
                <Tab
                  _selected={{
                    color: "#5E6DFA",
                    borderBottomColor: "#5E6DFA",
                    fontWeight: "bold",
                    padding: "0px",
                  }}
                  pl={0}
                >
                  Account
                </Tab>
                <Tab
                  _selected={{
                    color: "#5E6DFA",
                    borderBottomColor: "#5E6DFA",
                    fontWeight: "bold",
                    padding: "0px",
                  }}
                >
                  User management
                </Tab>
              </TabList>

              <TabPanels mt={8}>
                <TabPanel p={0}>
                  <AccountTab />
                </TabPanel>
                <TabPanel p={0}>
                  <UserManagementTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
}
