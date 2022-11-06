import { db } from "app/firebase/firebase"
import { compressImages } from "app/utils/fileUtils"
import { extractAllLinksFromText } from "app/utils/generalUtils"
import { firebaseArrayRemove, getRandomDocID, setDB, updateDB } from "./crudDB"
import { uploadMultipleFilesToFireStorage } from "./storageServices"

export const getChatsByUserID = (userID, setChats, limit) => {
  db.collection('chats')
    .where('members', 'array-contains', userID)
    .where('isArchived', '==', false)
    .orderBy('lastMessageDate', 'desc')
    .limit(limit)
    .onSnapshot(snapshot => {
      setChats(snapshot.docs.map(doc => doc.data()))
    })
}

export const getChatByID = (chatID, setChat) => {
  db.collection('chats')
    .doc(chatID)
    .onSnapshot(snapshot => {
      setChat(snapshot.data())
    })
}

export const getMessagesByChatID = (chatID, setMessages, limit) => {
  db.collection('chats')
  .doc(chatID)
  .collection('messages')
  .orderBy('messageDate', 'desc')
  .limit(limit)
  .onSnapshot(snapshot => {
    setMessages(snapshot.docs.map(doc => doc.data()))
  })
}

export const getUnreadChatsByUserID = (userID, setUnreadChats) => {
  db.collection('chats')
  // .where('members', 'array-contains', userID)
  .where('notSeenBy', 'array-contains', userID)
  .onSnapshot(snapshot => {
    setUnreadChats(snapshot.docs.map(doc => doc.data()))
  })
}

export const getChatMediasByChatID = (path, setChatMedias, limit) => {
  db.collection(path)
    .where('hasImgs', '==', true)
    .orderBy('messageDate', 'desc')
    .limit(limit)
    .onSnapshot(snapshot => {
      setChatMedias(snapshot.docs.map(doc => doc.data()))
    })
}

export const getChatFilesByChatID = (path, setChatFiles, limit) => {
  db.collection(path)
    .where('hasFiles', '==', true)
    .orderBy('messageDate', 'desc')
    .limit(limit)
    .onSnapshot(snapshot => {
      setChatFiles(snapshot.docs.map(doc => doc.data()))
    })
}

export const getChatLinksByChatID = (path, setChatLinks, limit) => {
  db.collection(path)
    .where('hasLinks', '==', true)
    .orderBy('messageDate', 'desc')
    .limit(limit)
    .onSnapshot(snapshot => {
      setChatLinks(snapshot.docs.map(doc => doc.data()))
    })
}

export const sendChatMessage = (messageText, uploadedImgFiles, chatMembers, messagePath, chatPath, 
  chatID, storagePath, myUser, isCombined, insertTimestamp) => {
  const messageLinks = extractAllLinksFromText(messageText)
  // const uncompressedVideos = uploadedImgFiles?.filter(img => img.file.type.includes('video'))?.map(vid => vid.file)
  const uncompressedVideos = []
  return compressImages(uploadedImgFiles)
    .then(compressedImgs => {
      return uploadMultipleFilesToFireStorage([...compressedImgs, ...uncompressedVideos], storagePath)
        .then(imgURLs => {
          const docID = getRandomDocID(messagePath)
          return setDB(messagePath, docID, {
            isDeleted: false,
            isEdited: false,
            isCombined,
            messageDate: new Date(),
            messageID: docID,
            messageText,
            senderID: myUser.userID,
            senderName: `${myUser.firstName} ${myUser.lastName}`,
            senderImg: myUser.photoURL,
            hasTimestamp: insertTimestamp,
            hasLinks: messageLinks?.length > 0,
            ...(messageLinks?.length > 0 && { links: messageLinks }),
            ...(imgURLs.length && {
              hasImgs: imgURLs.some(img => img.file.type.includes('image') || img.file.type.includes('video')) ? true : false,
              hasFiles: imgURLs.some(img => img.file.type.includes('application') || img.file.type.includes('text')) ? true : false,
              chatImgs: [
                ...imgURLs
                  .filter(imgURL => imgURL.file.type.includes('image') || imgURL.file.type.includes('video'))
                  .map((imgURL, i) => {
                    return {
                      imgURL: imgURL.downloadURL,
                      imgID: `${docID}_${i}`,
                      name: imgURL.file.name,
                      type: imgURL.file.type.includes('video') ? 'video' : 'image'
                    }
                  })
              ],
              files: [
                ...imgURLs
                  .filter(fileURL => !fileURL.file.type.includes('image') && !fileURL.file.type.includes('video'))
                  .map((fileURL, i) => {
                    return {
                      fileURL: fileURL.downloadURL,
                      fileName: fileURL.file.name,
                      fileSize: fileURL.file.size,
                      fileType: fileURL.file.type
                    }
                  })
              ],
            })
          })
          .then(() => {
            return updateDB(chatPath, chatID, {
              lastActive: new Date(),
              lastMessage: messageText,
              lastMessageDate: new Date(),
              lastMessageID: docID,
              lastSenderID: myUser?.userID,
              notSeenBy: chatMembers?.filter(member => member !== myUser?.userID),
            })
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
}

export const findExistingChat = (chatPath, usersArray) => {
  return db.collection(chatPath)
  .where('members', '==', usersArray)
  .get()
  .then(snapshot => snapshot.empty ? null : snapshot.docs[0].data())
  .then((chat) => {
    if(chat) {
      return chat
    }
    else {
      return db.collection(chatPath)
      .where('members', '==', usersArray.reverse())
      .get()
      .then(snapshot => snapshot.empty ? null : snapshot.docs[0].data())
    }
  })
  .catch(err => console.log(err))
}

export const createConversation = (chatPath, members, searchNames) => {
  const docID = getRandomDocID(chatPath)
  const chat = {
    chatID: docID,
    creatorID: members[0],
    dateCreated: new Date(),
    isArchived: false,
    isDeleted: false,
    isGroup: members.length > 2,
    lastActive: new Date(),
    lastMessage: '',
    lastMessageID: '',
    lastMessageDate: new Date(),
    lastSenderID: members[0],
    members,
    searchNames,
    notSeenBy: members,
  }
  return setDB(chatPath, docID, chat)
  .then(() => {
    return chat
  })
  .catch(err => console.log(err))
}
