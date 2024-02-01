import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants';
import useAuthStore from '../../store/authStore';
import usePostComment from '../../hooks/usePostComment';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';
import CommentsModal from '../Modals/CommentsModal';

function PostFooter({post , username,isProfilePage ,creatorProfile}) {

    const  {handlePostComment,isCommenting}= usePostComment();
    const [comment , setComment] = useState("");
    const authUser = useAuthStore(state=>state.user);
    const commentRef = useRef(null);
    const {handleLikePost , isLiked  , likes} =useLikePost(post);
    const handleSubmitComment = async() =>{
        await handlePostComment(post.id , comment);
        setComment("");
    }
    const {isOpen , onClose , onOpen} =useDisclosure()

    
  return (
    <>
    <Box mb={10} marginTop={"auto"}>
    <Flex alignItems={"center"}  gap={4} w={"full"}  pt={0} mb={2} mt={4} >
        <Box onClick={handleLikePost}
            cursor={"pointer"}
            fontSize={18}
        >
            {!isLiked ? <NotificationsLogo/> : <UnlikeLogo/>}

        </Box >

        <Box cursor={"pointer"} onClick={
            ()=>commentRef.current.focus()
        } fontSize={18}>
            <CommentLogo/>
        </Box>
    </Flex>
    <Text fontWeight={600} fontSize={"sm"} >
        {likes} likes
    </Text>
   
  {!isProfilePage && (<>
    <Text  fontSize={"sm"} fontWeight={700} >
        {creatorProfile?.username}{" "}
   
            <Text as={'span'} fontWeight={400} >
                {post.caption}
            </Text>
    </Text>
    <Text fontSize={"12"} color={"gray"}>
        {timeAgo(post.createdAt)}
    </Text>
    {post.comments.length > 0 && (
         <Text  fontSize={"sm"}  color={"gray"} cursor={"pointer"} onClick={onOpen}>
         View all {post.comments.length} comments
      </Text>
    )}
    
   {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post}/> : null}

  </>)}

   { authUser && (<><Flex
        alignItems={"center"}
        gap={2}
        justifyContent={"space-between"}
        w={"full"}
    
    >
        <InputGroup>
        <Input variant={"flushed"}  ref={commentRef} placeholder={"Add a comment ..."} value={comment} fontSize={14} onChange={(e)=>setComment(e.target.value)}/>
        <InputRightElement>
            <Button
            fontSize={14}
            color={"blue.500"}
            fontWeight={600}
            cursor={"pointer"}
            _hover={{color : "white"}}
            isLoading= {isCommenting}
            onClick={handleSubmitComment}
           
            bg={"transparent"}
            
            >
                Post</Button>
        </InputRightElement>
        </InputGroup>
    </Flex>
    </>
    )}
    </Box>
    </>
  )
}

export default PostFooter;