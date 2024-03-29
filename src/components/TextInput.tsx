import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";

interface TextInputProps {
  placeholder: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  label,
  value,
  type = "text",
  onChange,
  name,
  required
}) => {
  return (
    <Box>
      {label && (
        <Text color={"#5D5F6D"} fontSize={"13px"} fontWeight={"400"}>
          {label}
        </Text>
      )}
      <Input
        name={name}
        height={"42px"}
        mt={2}
        px={6}
        value={value}
        required={required}
        type={type}
        fontSize={"12px"}
        color={"#292B34"}
        bg={"#FCFCFE"}
        border={"1px solid #5E6DFA1A"}
        borderRadius={"8px"}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default TextInput;
