import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useFollowUser = (userId) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const { userProfile, setUserProfile } = useUserProfileStore();
	const showToast = useShowToast();

    const handleFollowUser = async()=>{
        try{
            const currentUserRef = doc(firestore,"users",authUser.uid)
            const userToFollwOrUnfollowRef = doc(firestore,"users",userId)
            await updateDoc(currentUserRef,{
                follwing : isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })
            await updateDoc(userToFollwOrUnfollowRef,{
                follwers : isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            if(isFollowing){
                //unfollow 
                console.log("entered !")
                setAuthUser({
                    ...authUser ,
                    follwing :  authUser.follwing.filter(uid =>uid !== userId)
                })
                if(userProfile)
                    setUserProfile({
                        ...userProfile,
                        follwers : userProfile.follwers.filter(uid => uid !==authUser.uid)
                    })

                localStorage.setItem("user-info",JSON.stringify({
                    ...authUser ,
                    follwing :  authUser.follwing.filter(uid =>uid !== userId)
                }))
                setIsFollowing(false);
            }
            else{
                //follow 
                setAuthUser({
                    ...authUser ,
                    follwing :  [...authUser.follwing ,userId]
                })
                if(userProfile)
                    setUserProfile({
                        ...userProfile,
                        follwers : [...userProfile.follwers,authUser.uid]
                    })

                localStorage.setItem("user-info",JSON.stringify({
                    ...authUser ,
                    follwing :  [...authUser.follwing ,userId]
                }))
                setIsFollowing(true);

            }
        }catch(error){
            showToast("Error",error.message,"error")
        }finally{
            setIsUpdating(false);
        }
    }

    useEffect(() => {
		if (authUser) {
			const isFollowing = authUser.follwing.includes(userId);
			setIsFollowing(isFollowing);
		}
	}, [authUser, userId]);

    return {isUpdating , isFollowing , handleFollowUser}
}

export default useFollowUser;