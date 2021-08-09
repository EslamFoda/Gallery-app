import {projectAuth} from '../firebase/config'


const signout = async()=>{
    try {
        await projectAuth.signOut()
    } catch (err) {
        console.log(err.message)
        
    }
}

const useSignout = ()=>{
    return {signout}
}

export default useSignout