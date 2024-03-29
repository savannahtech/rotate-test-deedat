import React from "react";
import { Box, CircularProgress, Divider, Text } from "@chakra-ui/react";
function TabContentLayout({
  children,
  title,
  loading = false,
}: {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
}) {
  return (
    <Box
      bg={"white"}
      borderRadius={"24px"}
      px={8}
      pb={12}
      pt={4}
      border={"1px solid #CACEE133"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontFamily={"AvenirNextCyr-Medium"}
          fontWeight={"500"}
          fontSize={"20px"}
        >
          {title}
        </Text>
        {loading && (
          <CircularProgress size="30px" isIndeterminate color="green.300" />
        )}
      </Box>
      <Divider opacity={0.3} borderColor={"#AEADBE"} mt={2} />
      <Box mt={7}>{children}</Box>
    </Box>
  );
}

export default TabContentLayout;
