import { jobsIndex, jobsInterestsAscIndex, jobsInterestsDescIndex, jobsSalaryAscIndex, jobsSalaryDescIndex } from "app/algolia"

export const jobTypesOptions = [
  {
    label: 'Full Time',
    value: "full-time",
  },
  {
    label: 'Part Time',
    value: "part-time",
  },
  {
    label: 'Contract',
    value: "contract",
  },
  { 
    label: 'Internship',
    value: "internship",
  }
]

export const jobEnvironmentOptions = [
  {
    label: 'Remote',
    value: "remote",
  },
  {
    label: 'On-Site',
    value: "on-site",
  },
  {
    label: 'Hybrid',
    value: "hybrid",
  }
]

export const sortByOptions = [
  {
    label: 'Date Added (Default)',
    value: "desc(dateAdded._seconds)",
    index: jobsIndex
  },
  {
    label: 'Salary (High to Low)',
    value: "desc(salary.max)",
    index: jobsSalaryDescIndex
  },
  {
    label: 'Salary (Low to High)',
    value: "desc(salary.min)",
    index: jobsSalaryAscIndex
  },
  {
    label: 'Interests (High to Low)',
    value: "desc(interests)",
    index: jobsInterestsDescIndex
  }, 
  {
    label: 'Interests (Low to High)',
    value: "asc(interests)",
    index: jobsInterestsAscIndex
  },
]