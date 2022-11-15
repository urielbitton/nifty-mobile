import { storage } from "app/firebase/firebase"
import { convertURItoBlob } from "app/utils/fileUtils"

export const uploadMultipleFilesToFireStorage = (files, storagePath, setUploadProgress) => {
  return new Promise((resolve, reject) => {
    if(!files?.length || !files) return resolve([])
    const imgURLs = []
    files.forEach(async (file, i) => {
      const blobFile = convertURItoBlob(file.uri)
      const storageRef = storage.ref(storagePath)
      const uploadTask = storageRef.child(file.filename).put(await blobFile)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress && setUploadProgress(progress)
      }, (error) => {
        console.log(error)
        reject(error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL()
        .then(downloadURL => {
          imgURLs.push({downloadURL, file})
          if (imgURLs.length === files.length) {
            resolve(imgURLs)
          }
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    })
  })
}

export const uploadImgToFireStorage = (file, storagePath, imgName, setProgress, pass) => {
  return new Promise((resolve, reject) => {
    if(!pass) {
      const storageRef = storage.ref(storagePath).child(imgName)
      if(file) {
        const task = storageRef.put(file)
        task.on("stat_changes", 
          function progress(snap) {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress && setProgress(percentage)
          },
          function error() {
            window.alert('An error has occured. Please try again later.')
          },
          function complete() {
            storageRef.getDownloadURL()
            .then((url) => {
              resolve(url)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
          }
        )
      }
    }
    else {
      resolve()
    }
  })
}

export const deleteStorageFile = (storagePath, pass) => {
  return new Promise((resolve, reject) => {
    if(!pass) {
      const storageRef = storage.ref(storagePath)
      storageRef.delete()
      .then(() => {
        resolve()
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    }
    else {
      resolve()
    }
  })
}

export const deleteMultipleStorageFiles = (files, storagePath, pass) => {
  if(pass) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    files.forEach((file, i) => {
      let storageRef = storage.ref(storagePath).child(file.name)
      storageRef.delete()
      .then(() => {
        if(i === files.length-1) {
          resolve()
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  })
}

