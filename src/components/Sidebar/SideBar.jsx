import {  Box, Button, Flex,Link } from '@chakra-ui/react';
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {  InstagramLogo, InstagramMobileLogo } from '../../assets/constants';
import { Tooltip } from '@chakra-ui/react';
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../hooks/useLogout';
import useAuthStore from '../../store/authStore';
import SidebarItems from './SidebarItems';

function SideBar() {
   const authUser = useAuthStore(state=>state.user);

   const {handleLogout , isLoggingOut }= useLogout();
  return (
    <>
        <Box
        height={"100vh"}
        borderRight={"1.3px solid"}
        borderColor={"whiteAlpha.300"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{base : 2 , md : 4}}
        >
    
    <Flex direction={"column"}  gap={10} w={"full"} height={"full"}>
        <Link to={"/"} as={RouterLink} pl={2} display={{base : "none " , md : "block"}} cursor="pointer">
            <InstagramLogo/>
        </Link>
        <Link to={"/"} as={RouterLink} p={2} 
              display={{base : "block" , md : "none"}} 
              cursor="pointer" 
              borderRadius="6"
              _hover={{
                bg : "whiteAlpha.200"
              }}
              w= {{base : 10}}
              >
            <InstagramMobileLogo/>
        </Link>
        <Flex direction={"column"} gap={4} cursor={"pointer"}>
            <SidebarItems/>
        </Flex>
        <Tooltip
                   
                    hasArrow
                    label={"Logout"}
                    placement='right'
                    ml={1}
                    openDelay={500}
                    display={{base : "block" , md : "none"}}
                    >
                    <Flex
                    onClick={handleLogout}
                    alignItems={"center"}
                    gap={5}
                    marginTop="auto"
                    _hover={{bg : "whiteAlpha.400"}}
                    borderRadius={6}
                    p = {2}
                    w = {{base : 10 , md : "full"}}  
                    justifyContent={{base : "center" , md : "flex-start"}}
                    >
                     <TbLogout2 size={"23px"}/>   
                    <Button variant={"ghost"} _hover={{bg:"transparent"}} isLoading={isLoggingOut} display={{base : "none" , md : "block"}}>
                      Logout
                    </Button>
                    </Flex>
                    </Tooltip>
    </Flex>
        </Box>
    </>
)
}

export default SideBar;