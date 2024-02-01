import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import FeedPost from './FeedPost';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';

function FeedPosts() {
  const {isLoading , posts} = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} py={10} my={2} >
    
      {!isLoading && posts.length > 0 && posts.map((post)=>(
        <FeedPost key={post.id} post={post}/>
      ))
      }
      {
		isLoading &&posts.length ===0 &&(
			<Text fontSize={"xl"} color={"white.300"}>
				Please do follow atleast one person to see feed posts !
			</Text>
		)
	  }
    </Container>
  )
}

export default FeedPosts;