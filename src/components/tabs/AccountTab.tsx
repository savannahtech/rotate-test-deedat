import {
  Box,
  Divider,
  Text,
  Image,
  Button,
  Avatar,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import axios from "axios";
import { BASE_URL, useAuth } from "@/context/authContext";
import TabContentLayout from "@/layouts/TabContentLayout";
import { AddImageIcon } from "../../../public/icons";
import { useS3Upload } from "next-s3-upload";

function AccountTab() {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const { accessToken, user } = useAuth();
  let { uploadToS3 } = useS3Upload();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    company: "",
    contact: "",
    email: "",
    industry: "",
    logo: "",
  });
  const getOrganizationData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/org_management/get_org_data`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setValues({
        company: data?.display_name,
        contact: data?.profile?.contact_name,
        email: data?.profile?.contact_email,
        industry: data?.profile?.industry,
        logo: data?.profile?.company_logo,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setSaving(true);
      const { company, contact, industry, email, logo } = values;
      const payload = {
        company_logo_b64: logo,
        contact_email: email,
        contact_name: contact,
        display_name: company,
        industry: industry,
      };
      const { data } = await axios.put(
        `${BASE_URL}/org_management/update_profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSaving(false);
      setShow(true);
    } catch (error) {
      alert("Error updating Account");
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (user && accessToken) {
      getOrganizationData();
    }
  }, [user]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleFileChange = async (e: any) => {
    try {
      setLoading(true);
      const { url } = await uploadToS3(e.target.files[0]);
      console.log(url);
      setLoading(false);
      setValues({ ...values, logo: url });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 1000);
    }
  }, [show]);

  return (
    <TabContentLayout loading={loading} title="Account">
      {show && (
        <Alert status="success" variant="subtle">
          <AlertIcon />
          Account Successfully updated
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Box
          maxW={"466px"}
          mt={5}
          display={"flex"}
          flexDirection={"column"}
          gap={5}
        >
          <TextInput
            required
            value={values.company}
            onChange={handleChange}
            name="company"
            placeholder="Company name"
            label="Company name"
          />
          <TextInput
            required
            value={values.contact}
            onChange={handleChange}
            name="contact"
            placeholder="Contact name"
            label="Contact name"
          />
          <TextInput
            required
            value={values.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            label="Email"
            type="email"
          />
          <SelectInput
            required
            value={values.industry}
            onChange={handleChange}
            name="industry"
            placeholder="Industry"
            label="Industry"
            options={[
              {
                value: "Healthcare and Pharmaceuticals",
                label: "Healthcare and Pharmaceuticals",
              },
              {
                value: "Information Technology (IT) and Software Services",
                label: "Information Technology (IT) and Software Services",
              },
              {
                value: "Finance and Banking",
                label: "Finance and Banking",
              },
              {
                value: "Retail and Consumer Goods",
                label: "Retail and Consumer Goods",
              },
              {
                value: "Manufacturing and Industrial Production",
                label: "Manufacturing and Industrial Production",
              },
            ]}
          />
          <Box>
            <Text color={"#5D5F6D"} fontSize={"13px"} fontWeight={"400"}>
              Company Logo
            </Text>
            <input
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={fileRef}
              type="file"
            />
            <Box
              mt={2}
              onClick={() => fileRef.current?.click()}
              border="1px solid #5E6DFA4D"
              borderRadius={"8px"}
              p={4}
              display={"flex"}
              alignItems={"center"}
              gap={5}
            >
              <Box position={"relative"}>
                <Avatar
                  bg={"#F6F7FB"}
                  border="1px solid #5E6DFA"
                  width={"64px"}
                  height={"64px"}
                  borderRadius={"100%"}
                  icon={<Image src={"/office.png"} />}
                  src={values?.logo}
                />
                {!values?.logo && (
                  <Box position={"absolute"} right={0} top={0} p={1}>
                    <AddImageIcon />
                  </Box>
                )}
              </Box>

              <Text color={"#5E6DFA"} fontSize={"10px"}>
                Upload company logo
              </Text>
            </Box>
          </Box>

          <Button
            isLoading={saving}
            type="submit"
            border="1px solid #5E6DFA"
            w="fit-content"
            bg="white"
            color="#5E6DFA"
            borderRadius={"30px"}
            fontSize={"10px"}
            px={6}
            size={"sm"}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </TabContentLayout>
  );
}

export default AccountTab;
