import { Box, Container, Flex } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUserss from '../../components/SuggestedUsers/SuggestedUserss';

function HomePage() {
  return (
    <Container maxW={"container.lg"}>
        <Flex gap={20}>
           <Box flex={2}  py={10}>
                  {/* Feeds */}
                <FeedPosts/>
           </Box>
           <Box flex={3} mr={20} display={{ base:"none",lg:"block"}}  maxW={"300px"} >
           <SuggestedUserss/>
           </Box>
          
        </Flex>
    </Container>
  )
}

export default HomePage;