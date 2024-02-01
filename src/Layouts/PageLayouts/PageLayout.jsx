import { Box, Flex, Spinner  } from '@chakra-ui/react';
import React from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../../components/Sidebar/SideBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';

function PageLayout({children}) {
    const {pathname} = useLocation();
    const [user, loading] = useAuthState(auth);
    const  canRenderSidebar = pathname !=="/auth" && user;
    const canRenderNavbar = !user && !loading && pathname !== '/auth';

    const  checkingUserIsAuth = !user && loading
    if(checkingUserIsAuth) return <PageLayoutSpinner/>
  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
        {/* side bar on left  */}
        {canRenderSidebar ?(<>
    <Box w={{base : "70px"  ,  md : "240px"}}>
        <SideBar/>
    </Box>
    </>):(null)}

        {/* {navbar} */}
            {canRenderNavbar ? <Navbar/>:null}

        {/* the page content on right  */}
        <Box flex={1} width={{base : "calc(100% - 70px)" , md : "calc(100% - 240px)"}} mx={"auto"}>
            {children}
        </Box>
    </Flex>
  )


}
export default PageLayout;

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
}
