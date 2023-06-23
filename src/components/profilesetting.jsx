import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  VStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChangeAva } from "./changeavatar";


export function Setting() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={onOpen}
        mt={10}
        w={"full"}
        bg={"green.400"}
        color={"white"}
        rounded={"xl"}
        boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
        _hover={{
          bg: "green.500",
        }}
        _focus={{
          bg: "green.500",
        }}
      >
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Setting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>

            <Button w={"50%"} onClick={() => navigate("/changeusername")}>Change username</Button>
            <Button w={"50%"} onClick={() => navigate("/changeemail")}>Change email</Button>
            <Button w={"50%"} onClick={() => navigate("/changephone")}>Change phone number</Button>
            <ChangeAva/>
            </VStack>
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
