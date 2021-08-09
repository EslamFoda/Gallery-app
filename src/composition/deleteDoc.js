import { ref } from 'vue'
import {db} from '../firebase/config'


const deleteDoc = async(id)=>{
    try {
       await db.collection('gallery').doc(id).delete()
    } catch (err) {
        console.log(err.message)
        
    }

}

const useDelete = ()=>{
    return {deleteDoc}
}

export default useDelete