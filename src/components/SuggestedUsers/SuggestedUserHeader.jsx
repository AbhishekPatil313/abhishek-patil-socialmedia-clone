import { Avatar, Box, Button, Flex,  Text } from '@chakra-ui/react';
import React from 'react'
import useLogout from '../../hooks/useLogout';
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';

function SuggestedUserHeader() {
    const { handleLogout , isLoggingOut} =useLogout();
    const authUser = useAuthStore(state => state.user);
    if(!authUser)return null;
  return (
    <>
    <Flex justifyContent={"space-between"} alignItems={"center"}  width={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Link to={`${authUser.username}`}>
            <Avatar name={authUser.username} size={"lg"} src={authUser.profilePicURL}/>
            </Link>
            <Link to={`${authUser.username}`}>
            <Text fontSize={12} fontWeight={"bold"}>
                {authUser.username}
            </Text>
            </Link>
        </Flex>
        <Button
        size = {"xs"}
        background={"transparent"}
        _hover={{background : "transparent"}}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        isLoading = {isLoggingOut}
        onClick={handleLogout}
        cursor={"pointer"}
        >
            Log out
        </Button>
    </Flex>
    </>
  )
}

export default SuggestedUserHeader;