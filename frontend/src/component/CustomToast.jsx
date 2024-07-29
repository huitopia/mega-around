import { useToast } from "@chakra-ui/react";

export const CustomToast = () => {
  const toast = useToast();

  const successToast = (message) => {
    toast({
      description: message,
      status: "success",
      position: "top",
      isClosable: true,
      duration: 3000,
      variant: "subtle",
    });
  };

  const errorToast = (message) => {
    toast({
      description: message,
      status: "error",
      position: "top",
      isClosable: true,
      duration: 3000,
      variant: "subtle",
    });
  };

  const infoToast = (message) => {
    toast({
      description: message,
      status: "info",
      position: "top",
      isClosable: true,
      duration: 3000,
      variant: "subtle",
    });
  };

  return { successToast, errorToast, infoToast };
};
