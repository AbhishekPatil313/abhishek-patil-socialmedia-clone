

import {
	Avatar,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
    const [inputs , setInputs]=useState({
        fullName : '',
        username : '',
        bio : '',
    });
    const {isUpdating , editProfile }  = useEditProfile();
    const fileRef = useRef(null);
    const authUser  = useAuthStore(state=>state.user);
    const showToast = useShowToast();
    const {handleImageChange , selectedFile , setSelectedFile} = usePreviewImg();
const handleEditProfile= async()=>{
    try{
        await editProfile(inputs, selectedFile);
        setSelectedFile(null);
        onClose();
    }catch(err){
        showToast("Error",err.message,"error");
    }
}
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent borderRadius={"20px"}  bg={"black"} boxShadow={"xl"} border={"3px solid gray"} mx={3}>
					<ModalHeader />
					<ModalCloseButton _hover={{ bg: "gray.600" }} />
					<ModalBody >
						{/* Container Flex */}
						<Flex bg={"black"}>
							<Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
								<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
									Edit Profile
								</Heading>
								<FormControl>
									<Stack direction={["column", "row"]} spacing={6}>
										<Center>
											<Avatar size='xl' src={selectedFile || authUser.profilePicURL} border={"2px solid white "} />
										</Center>
										<Center w='full'>
											<Button w='full' onClick={()=>fileRef.current.click()}>Edit Profile Picture</Button>
										</Center>
                                        <Input type="file" onChange={handleImageChange} hidden ref={fileRef}/>
									</Stack>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Full Name</FormLabel>
									<Input placeholder={"Full Name"} size={"sm"} type={"text"} 
                                    value={inputs.fullName || authUser.fullName} 
                                    onChange={(e)=> setInputs({...inputs,fullName : e.target.value})}/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Username</FormLabel>
									<Input placeholder={"Username"} size={"sm"} type={"text"}
                                     value={inputs.username || authUser.username} 
                                     onChange={(e)=> setInputs({...inputs,username : e.target.value})}/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Bio</FormLabel>
									<Input placeholder={"Bio"} size={"sm"} type={"text"}
                                     value={inputs.bio || authUser.bio}
                                     onChange={(e)=> setInputs({...inputs,bio : e.target.value})} />
								</FormControl>

								<Stack spacing={6} direction={["column", "row"]}>
									<Button
										bg={"red.400"}
										color={"white"}
										w='full'
										size='sm'
										_hover={{ bg: "red.500" }}
                                        onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										bg={"blue.400"}
										color={"white"}
										size='sm'
                                        isLoading={isUpdating}
										w='full'
                                        onClick={handleEditProfile}
										_hover={{ bg: "blue.500" }}
									>
										Submit
									</Button>
								</Stack>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditProfile;
