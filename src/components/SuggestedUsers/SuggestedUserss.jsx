import { Box, Flex, Link,  Text, VStack } from '@chakra-ui/react'
import SuggestedUserHeader from './SuggestedUserHeader'
import { PiCopyrightThin } from "react-icons/pi";
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';
import SuggestedUser from './SuggestedUser';


function SuggestedUserss() {
  const { isLoading  , suggestedUsers}  = useGetSuggestedUsers();
  if(isLoading)return null;
  return (
    <>
    <VStack py={8} px={6} gap={4}>
        <SuggestedUserHeader/>
        {suggestedUsers.length !==0 && (
          <Flex alignItems={"center"}  justifyContent={"space-between"} w={"full"} >
              <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                  Suggested for you
              </Text> 
              <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.400"}} cursor={"pointer"}>
                  See All
              </Text>
        </Flex>
        )}   
        {suggestedUsers.map((user)=>(
          <SuggestedUser user={user} key={user.id}/>
        ))}
                  <Box color={"gray.500"} mt={5} >
        <Flex justifyContent={"space-between"} textDecoration={"none"}>
             <PiCopyrightThin fontSize={22} />&nbsp;2024&nbsp;
            Built by &nbsp; {"   "}
             <Link href='https://github.com/AbhishekPatil313' target='_blank' color={"blue.500"} fontSize={17}  style={{textDecoration: 'none'}}
             >Abhishek Patil</Link>
        </Flex>        
       </Box>
    </VStack>
    </>
  )
}

export default SuggestedUserss; 



