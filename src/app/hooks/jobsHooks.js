import { useEffect, useState } from "react"
import { getAllJobs } from "app/services/jobsServices"

export const useAllJobs = (limit) => {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    getAllJobs(setJobs, limit)
  },[limit]) 

  return jobs
}
