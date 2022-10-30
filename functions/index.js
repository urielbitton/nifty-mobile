
const functions = require("firebase-functions")
const algoliasearch = require('algoliasearch')
const admin = require("firebase-admin")

const APP_ID = functions.config().algolia.app
const API_KEY = functions.config().algolia.key

// @ts-ignore
const client = algoliasearch(APP_ID, API_KEY)
const jobsIndex = client.initIndex('jobs_index')

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
