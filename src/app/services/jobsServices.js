import { db } from "app/firebase/firebase"

export const getAllJobs = (setJobs, limit) => {
  db.collection('jobs')
  .orderBy('dateCreated', 'desc')
  .limit(limit)
  .onSnapshot(snapshot => {
    setJobs(snapshot.docs.map(doc => doc.data()))
  })
}

export const getJobMatches = (userID, setJobMatches, limit) => {
  db.collectionGroup('interestedUsers')
  .where('userID', '==', userID)
  .where('isMatched', '==', true)
  .orderBy('dateCreated', 'desc')
  .limit(limit)
  .onSnapshot(snapshot => {
    setJobMatches(snapshot.docs.map(doc => doc.data()))
  })
}

export const getJobByID = (jobID, setJob) => {
  db.collection('jobs')
  .doc(jobID)
  .onSnapshot(snapshot => {
    setJob(snapshot.data())
  })
}