import {storage} from '../firebase/config'
import { ref } from 'vue'
import getUser from '../composition/getUser'
const {user} = getUser()

const useStorage = ()=>{
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImg = async(file)=>{
        filePath.value = `image/${user.value.uid}/${file.name}`
        const storageRef = storage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }

    }

    const deleteImg = async(path)=>{
        const storageRef = storage.ref(path)
        try {
            await storageRef.delete()
        } catch (err) {
            console.log(err.message)
            
        }
    }


 return{error,url,filePath,uploadImg,deleteImg}
}

export default useStorage