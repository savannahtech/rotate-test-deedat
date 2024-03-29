import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";

interface Option {
  value: string;
  label: string;
}
interface SelectInputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: string;
  options: Option[];
  placeholder: string;
  name?: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  options,
  name,
  required,
}) => {
  return (
    <Box>
      {label && (
        <Text color={"#5D5F6D"} fontSize={"13px"} fontWeight={"400"}>
          {label}
        </Text>
      )}
      <Select
        name={name}
        required={required}
        mt={2}
        fontSize={"12px"}
        height={"42px"}
        value={value}
        bg={"#FCFCFE"}
        sx={{
          paddingLeft: "24px",
        }}
        color={"#292B34"}
        border={"1px solid #5E6DFA1A"}
        borderRadius={"8px"}
        placeholder={placeholder}
        onChange={onChange}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectInput;
