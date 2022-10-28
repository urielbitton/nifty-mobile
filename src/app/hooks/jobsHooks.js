import { useEffect, useState } from "react"
import { getAllJobs, getJobByID, getJobMatches } from "app/services/jobsServices"

export const useAllJobs = (limit) => {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    getAllJobs(setJobs, limit)
  },[limit]) 

  return jobs
}


export const useJobMatches = (userID, limit) => {

  const [jobMatches, setJobMatches] = useState([])

  useEffect(() => {
    getJobMatches(userID, setJobMatches, limit)
  },[userID, limit]) 

  return jobMatches
}

export const useJob = (jobID) => {

  const [job, setJob] = useState(null)

  useEffect(() => {
    getJobByID(jobID, setJob)
  },[jobID]) 

  return job
}