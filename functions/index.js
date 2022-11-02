
const functions = require("firebase-functions")
const algoliasearch = require('algoliasearch')
const admin = require("firebase-admin")

const APP_ID = functions.config().algolia.app
const API_KEY = functions.config().algolia.key

// @ts-ignore
const client = algoliasearch(APP_ID, API_KEY)
const jobsIndex = client.initIndex('jobs_index')
const usersIndex = client.initIndex('users_index')
const chatsIndex = client.initIndex('chats_index')

//jobs collection
exports.addToIndexJobs = functions
  .region('northamerica-northeast1')
  .firestore.document('jobs/{jobID}').onCreate(snapshot => {
    const data = snapshot.data()
    const objectID = snapshot.id
    return jobsIndex.saveObject({ ...data, objectID })
  })
exports.updateIndexJobs = functions
  .region('northamerica-northeast1')
  .firestore.document('jobs/{jobID}').onUpdate((change) => {
    const newData = change.after.data()
    const objectID = change.after.id
    return jobsIndex.saveObject({ ...newData, objectID })
  })
exports.deleteFromIndexJobs = functions
  .region('northamerica-northeast1')
  .firestore.document('jobs/{jobID}').onDelete(snapshot => {
    jobsIndex.deleteObject(snapshot.id)
  })

//users collection
exports.addToIndexUsers = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}').onCreate(snapshot => {
    const data = snapshot.data()
    const objectID = snapshot.id
    return usersIndex.saveObject({ ...data, objectID })
  })
exports.updateIndexUsers = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}').onUpdate((change) => {
    const newData = change.after.data()
    const objectID = change.after.id
    return usersIndex.saveObject({ ...newData, objectID })
  })
exports.deleteFromIndexUsers = functions
  .region('northamerica-northeast1')
  .firestore.document('users/{userID}').onDelete(snapshot => {
    usersIndex.deleteObject(snapshot.id)
  })

//chats collection
exports.addToIndexChats = functions
  .region('northamerica-northeast1')
  .firestore.document('chats/{chatID}').onCreate(snapshot => {
    const data = snapshot.data()
    const objectID = snapshot.id
    return chatsIndex.saveObject({ ...data, objectID })
  })
exports.updateIndexChats = functions
  .region('northamerica-northeast1')
  .firestore.document('chats/{chatID}').onUpdate((change) => {
    const newData = change.after.data()
    const objectID = change.after.id
    return chatsIndex.saveObject({ ...newData, objectID })
  })
exports.deleteFromIndexChats = functions
  .region('northamerica-northeast1')
  .firestore.document('chats/{chatID}').onDelete(snapshot => {
    chatsIndex.deleteObject(snapshot.id)
  })

  