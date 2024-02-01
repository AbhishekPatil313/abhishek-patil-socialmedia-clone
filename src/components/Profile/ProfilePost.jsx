import { Avatar, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';
import  {  useState } from 'react'
import { VscHeartFilled } from "react-icons/vsc";
import { FaCommentAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from '../comments/Comment';
import PostFooter from '../FeedPosts/PostFooter';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';
import { deleteObject, ref } from 'firebase/storage';
import { firestore, storage } from '../../firebase/firebase';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import useShowToast from '../../hooks/useShowToast';
import usePostStore from '../../store/postStore';
import Caption from '../comments/Caption';

const  ProfilePost=({post}) =>{
	const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state)=> state.userProfile);
  const authUser = useAuthStore((state)=> state.user);
  const showToast = useShowToast();
  const [isDeleting , setIsDeleting] = useState(false);
  const deletePost = usePostStore(state => state.deletePost);
  const decrementPostCount = useUserProfileStore((state)=>state.deletePost);
  

  const handleDeletePost = async()=>{
     
       if(!window.confirm("Are you sure you want to delete this post ?"))return;
      if(isDeleting)return;
      try {
        const imageRef = ref(storage, `posts/${post.id}`);
        await deleteObject(imageRef);
        const userRef = doc(firestore,"users",authUser.uid);
        await deleteDoc(doc(firestore,"posts",post.id));
        await updateDoc(userRef,{
          posts : arrayRemove(post.id)
        })
        deletePost(post.id);
        decrementPostCount(post.id);
        showToast("Success","Post Deleted !","success");

      } catch (error) {
        showToast("Error" ,error.message  ,"error");
      }
      finally{
        setIsDeleting(false);
      }
  }
  return (
    <>

  <GridItem
  cursor={"pointer"}
  borderRadius={4}
  overflow={"hidden"}
  border={"1px solid"}
  borderColor={"whiteAlpha.300"}
  position={"relative"}
  aspectRatio={1/1}
  onClick={onOpen}
  >
  <Flex
    opacity={0}
    _hover={{opacity:1}}
    position={"absolute"}
    top={0}
    left={0}
    right={0}
    bottom={0}
    bg={"blackAlpha.500"}
    transition={"all 1s ease"}
    zIndex={1}
    justifyContent={"center"}
      >
        <Flex alignItems={"center"} 
              justifyContent={"center"}
              gap={50}
        >
              <Flex>
                    <VscHeartFilled />
                    <Text fontWeight={"bold"} ml={2}>
                      {post.likes.length}
                    </Text>
              </Flex>
              <Flex>
                    <FaCommentAlt />
                    <Text fontWeight={"bold"} ml={2}>
                      {post.comments.length}
                    </Text>
              </Flex>



        </Flex>

  </Flex>
 <Image src={post.imageURL} alt='Profile Post' w={"100%"} h={"100%"} objectFit={"cover"}></Image>
  </GridItem>


  <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{base: "3xl" , md:"4xl"}}>
        <ModalOverlay />
        <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5}  border={"1.8px solid"}
                              borderColor={"whiteAlpha.400"} >
                        <Flex gap={4} w={  {  base : "90%" , sm : "70%" , md : "full"  }} mx={"auto"}
                              maxH={"90vh"} minH={"50vh"}

                        >
                            <Flex
                              borderRadius={4}
                              overflow={"hidden"}
                              border={"1px solid"}
                              borderColor={"whiteAlpha.300"}
                              flex={1.5}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <Image src={post.imageURL} alt='profile post'/>
                            </Flex>
                            <Flex flex={1} flexDir={"column"} px={10} display={{base : "none" , md : "flex"}}>
                              <Flex alignItems={'center'} justifyContent={"space-between"} >
                                <Flex alignItems={"center"} gap={2}>
                                    <Avatar src={userProfile.profilePicURL} h={14} w={14} name='As a Programmer'/>
                                    <VStack w={"full"} alignItems={"start"} overflowY={"auto"}>
                                    <Text fontWeight={"bold"}>
                                      {userProfile.username}
                                    </Text>
                                   
                                    <Text >
                                      {post.caption}
                                    </Text>
                                    </VStack>
                                    {authUser?.uid === userProfile.uid && (<>
                                  <Button 
                                  size={"sm"}
                                  bg={"transparent"}
                                  isLoading={isDeleting}
                                  onClick={handleDeletePost}
                                  _hover={{ bg: "whiteAlpha.300", color: "red.600" }}>
                                   <MdDelete size={50} cursor={"pointer"} />
                                   
                                </Button>
                                </>)}
                                </Flex>
                         
                            
                              </Flex>
                            <Divider my={4} bg={"gray.500"}/>
                            <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                
            
                    {/* {post.caption && <Caption post={post} />} */}

                     {post.comments.map((comment,idx) => (

										<Comment   key={idx} comment={comment} />  
                    

									                        ))}
                            </VStack>
                            <Divider my={4} bg={"gray.800"}/>
                            <PostFooter isProfilePage={true} post={ post }/>
                            </Flex>
                        </Flex>
                    </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfilePost;