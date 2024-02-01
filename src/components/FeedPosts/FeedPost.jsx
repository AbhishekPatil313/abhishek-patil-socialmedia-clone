import React from 'react'
import PostHeader from './PostHeader'
import { Box, Image } from '@chakra-ui/react'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

export default function FeedPost({post}) {
  console.log("post ",post)
 const {userProfile} = useGetUserProfileById(post.createdBy
  );
 console.log("userprofile",userProfile);
  return (
    <>
    <PostHeader post={post} creatorProfile={userProfile}/>
        <Box borderRadius={"10px"} overflow={"hidden"}>
            <Image src={post.imageURL} alt='feed post images'/>
        </Box>
    <PostFooter post={post} creatorProfile={userProfile}/>
    </>
  )
}
