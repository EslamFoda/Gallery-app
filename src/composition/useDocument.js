import { ref } from 'vue'
import {db} from '../firebase/config'
const error = ref(null)
const docId = ref(null)

const addDocs = async(file)=>{
    try {
        const res = await db.collection('gallery').add(file)
        docId.value = res.id
        console.log(docId.value)
        
    } catch (err) {
        console.log(err.message)
        error.value = err.message
        
    }
}


const useDocument = ()=>{
    return {error,addDocs,docId}
}

export default useDocument