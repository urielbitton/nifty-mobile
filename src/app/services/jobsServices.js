import { db } from "app/firebase/firebase"

export const getAllJobs = (setJobs, limit) => {
  db.collection('jobs')
  .orderBy('dateCreated', 'desc')
  .limit(limit)
  .onSnapshot(snapshot => {
    setJobs(snapshot.docs.map(doc => doc.data()))
  })
}