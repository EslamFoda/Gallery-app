import { ref } from 'vue'
import {db} from '../firebase/config'

const documents = ref(null)
db.collection('gallery').orderBy('createdAt').onSnapshot(snap=>{
    let result = []
    snap.docs.forEach(doc=>{
        result.push({...doc.data(),id: doc.id})
       
    })
    documents.value = result
})

const getDocuments = ()=>{
    return {documents}
}

export default getDocuments