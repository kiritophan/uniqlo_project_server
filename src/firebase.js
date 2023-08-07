import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD2qMKUHMXcMjYLmm8IUCJURf0VXBu5Q8A",
    authDomain: "reactjs-nodejs-4f290.firebaseapp.com",
    projectId: "reactjs-nodejs-4f290",
    storageBucket: "reactjs-nodejs-4f290.appspot.com",
    messagingSenderId: "405428088750",
    appId: "1:405428088750:web:089bb49a44e18ff97f623f",
    measurementId: "G-5619EXWH7E"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// tạo ra storage
export const storage = getStorage(app);


/* 
  1st params: your file, 2nd params: folder you need 
  return 
    if failed => false
    if success => url file
*/
export async function uploadFileToStorage(fileUploads, folderName, bufferData) {
    // nếu file là null thì không làm gì hết
    if (!fileUploads) {
        return false
    }

    let fileRef;
    let metadata;
    if (!bufferData) {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + fileUploads.name);
    } else {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + fileUploads.filename);
        metadata = {
            contentType: fileUploads.mimetype,
        };
    }
    let url;
    if (bufferData) {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    } else {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, fileUploads).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }


    return url
}

/* 
  only params: folder name
  return 
    if failed => false
    if success => array url link
*/
export async function getFileInFolder(folderName) {
    const listRef = ref(storage, folderName);

    return await listAll(listRef).then(async (res) => {
        let result = []; // tạo array trống

        for (let i in res.items) {
            let url = await getDownloadURL(res.items[i])
                .then(url => url)
                .catch(er => false)
            if (!url) {
                return false
            }
            result.push(url)
        }

        return result
    })
} 