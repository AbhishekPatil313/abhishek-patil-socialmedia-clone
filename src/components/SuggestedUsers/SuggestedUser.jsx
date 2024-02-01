import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser';
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';

function SuggestedUser({user, setUser}) {
  const {isFollowing , isUpdating , handleFollowUser } =useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);
  const onFollowUser = async() =>{
    await handleFollowUser();
    setUser({...user , 
    follwers : isFollowing ? user.follwers.filter((follwer)=> follwer.uid !== authUser.uid) : [...user.follwers, authUser],
    })
  }
  return (
    <>
    <Flex justifyContent={"space-between"} width={"full"} borderBottom={"0.3px solid"}
        borderColor={"whiteAlpha.400"}>
    <Link to={`${user.username}`}>
            <Flex alignItems={"center"} gap={2} paddingBottom={2}>
            
                <Avatar src={user.profilePicURL} name={user.username} size={"md"}></Avatar>
                <VStack spacing={2} alignItems={"flex-start"}>
                        
                        <Box fontSize={12} fontWeight={"bold"}>
                            {user.username}
                        </Box>
                        
                        <Box fontSize={11} color={"gray.500"}>
                            {user.follwers.length} followers
                        </Box>
                      
                </VStack>            
            </Flex>
    </Link>   
 
           {authUser.uid !== user.uid && (
             <Button 
             my={3}
             fontSize={13} 
             bg={"transparent"} 
             p={0} h={"max-content"} 
             color = {"blue.400"} 
             cursor={"pointer"} 
             _hover={{color : "white"}} 
             isLoading={isUpdating}
             onClick={onFollowUser}>
                 {isFollowing ? "Unfollow"  : "Follow"} </Button>
           )}
    </Flex>
    </>
  )
}

export default SuggestedUser;