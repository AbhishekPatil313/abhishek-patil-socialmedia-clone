import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import React from 'react'
import {Link} from "react-router-dom";
import { timeAgo } from '../../utils/timeAgo';
import useFollowUser from '../../hooks/useFollowUser';
function PostHeader({post , creatorProfile}) {
   const {handleFollowUser , isFollowing , isUpdating}  = useFollowUser(post.createdBy);
  return (
   <>
    
   <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={5} >
        <Flex alignItems={"center"} gap={2}>
            
           
            
            {creatorProfile ? (
                  <Link to={`${creatorProfile.username}`}>   
                  <Avatar src={creatorProfile.profilePicURL} alt="user profile pic" size={"sm"} />
              </Link> 
            ) : (
                <SkeletonCircle size={10}/>
            )}
          
                 
           
                <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                    {creatorProfile ? (
                         <Link to={`${creatorProfile.username}`}> {creatorProfile.username}</Link>
                    ) : (
                        <Skeleton w={"10px"}/>
                    )}
                <Box color={"gray.500"}>
                {creatorProfile ? (
                             <Link to={`${creatorProfile.username}`}>   {timeAgo(creatorProfile.createdAt)}</Link>
                    ) : (
                        <Skeleton w={"10px"}/>
                    )}
                </Box>
                </Flex> 
        </Flex>
        <Box cursor={"pointer"}>
                <Button 
                    size={"xs"}
                    bg={"transparent"}
                    onClick={handleFollowUser}
                    isLoading={isUpdating}
                    fontSize={12}
                    color={"blue.500"}
                    fontWeight={"bold"}

                    _hover={{
                        color : "white",
                    }}
                    transition={"0.2s ease-in-out"}
                >{isFollowing ? "Unfollow" : "Follow"}</Button>

        </Box>
   </Flex>

   </>
  )
                
}

export default PostHeader;