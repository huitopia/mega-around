import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

export const CustomAlert = ({
  isOpen,
  onClose,
  alertHeader,
  alertBody,
  onClick,
  isLoading,
  alertButtonContent,
  buttonColor,
}) => {
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {alertHeader}
          </AlertDialogHeader>
          <AlertDialogBody>{alertBody}</AlertDialogBody>
          <AlertDialogFooter justifyContent="center">
            <Button
              width={"40%"}
              colorScheme={buttonColor}
              isLoading={isLoading}
              onClick={onClick}
              ml={"5%"}
            >
              {alertButtonContent}
            </Button>
            <Spacer />
            <Button
              width={"40%"}
              ref={cancelRef}
              onClick={onClose}
              colorScheme="pink"
              mr={"5%"}
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
