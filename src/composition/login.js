import {projectAuth} from '../firebase/config'
import { ref } from 'vue'


const error = ref(null)
const isPending = ref(false)

const login = async(email,password)=>{
    isPending.value = true
    error.value = null
    try {
        isPending.value = true
        const res = await projectAuth.signInWithEmailAndPassword(email,password)
        error.value = null
    } catch (err) {
        console.log(err.message)
        error.value = err.message
        
    }
    isPending.value = false

}
const useLogin = ()=>{
    return{error,login,isPending}
}

export default useLogin