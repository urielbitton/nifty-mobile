import algoliasearch from "algoliasearch"

const algolia_app_id = '3JJDIMKDZB'
const algolia_admin_key = 'fa037bb13b5717d55d55b92c28dc8d56'

export const algoliaSearchClient = algoliasearch(algolia_app_id, algolia_admin_key)


export const jobsIndex = algoliaSearchClient.initIndex('jobs_index')
export const jobsSalaryDescIndex = algoliaSearchClient.initIndex('jobs_salary_desc')
export const jobsSalaryAscIndex = algoliaSearchClient.initIndex('jobs_salary_asc')
export const jobsInterestsDescIndex = algoliaSearchClient.initIndex('jobs_interests_desc')
export const jobsInterestsAscIndex = algoliaSearchClient.initIndex('jobs_interests_asc')