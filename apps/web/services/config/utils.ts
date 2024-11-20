import { getUriWithOrg } from './config'

export async function fetchForCustomDomainInRegistry(cleanDomain: any) {
  try {
    console.log(
      getUriWithOrg('internal', `/api/domains?cleanDomain=${cleanDomain}`)
    )
    const domain_check = await fetch(
      getUriWithOrg('internal', `/api/domains?cleanDomain=${cleanDomain}`)
    )
    if (!domain_check.ok) {
      return null
    } else {
      const res = await domain_check.json()
      return res
    }
  } catch (error) {
    return null
  }
}
