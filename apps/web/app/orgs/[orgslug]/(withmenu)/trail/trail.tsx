'use client'
import { useLHSession } from '@components/Contexts/LHSessionContext'
import { useOrg } from '@components/Contexts/OrgContext'
import PageLoading from '@components/Objects/Loaders/PageLoading'
import TrailCourseElement from '@components/Pages/Trail/TrailCourseElement'
import TypeOfContentTitle from '@components/StyledElements/Titles/TypeOfContentTitle'
import GeneralWrapperStyled from '@components/StyledElements/Wrappers/GeneralWrapper'
import { getAPIUrl } from '@services/config/config'
import { swrFetcher } from '@services/utils/ts/requests'
import React, { useEffect } from 'react'
import useSWR from 'swr'

function Trail(params: any) {
  let orgslug = params.orgslug
  const session = useLHSession() as any
  const access_token = session?.data?.tokens?.access_token;
  const org = useOrg() as any
  const orgID = org?.id
  const { data: trail, error: error } = useSWR(
    `${getAPIUrl()}trail/org/${orgID}/trail`,
    (url) => swrFetcher(url, access_token)
  )
  const [isAdmin , setIsAdmin] = React.useState<boolean | null>(null)


  useEffect(() => { }, [trail, org])

  useEffect(() =>{
    //This logic checks if the current user is admin , if so and if there are no users who has 
    // started the Course then we should display appropriate message
    const description  = session?.data?.roles[0]?.role?.description
    if(description && description.includes("Admin")){
      setIsAdmin(true)
    }
  },[session]);

  return (
    <GeneralWrapperStyled>
      <TypeOfContentTitle title="Trail" type="tra" />
      {!trail ? (
        <PageLoading></PageLoading>
      ) : (
        <div className="space-y-6">
          {trail.runs.length>0 ?  trail.runs.map((run: any) => (
            <>
              <TrailCourseElement
                run={run}
                course={run.course}
                orgslug={orgslug}
              />
            </>
          )) : 
          (
            <div className="flex mx-auto h-[300px]">
            <h1 className="text-xl font-bold text-gray-600 ml-8">
              {isAdmin ? "No user has started any courses." : "Start a course to see the Progress"}
            </h1>
            </div>
            
          )
        }
        </div>
      )}
    </GeneralWrapperStyled>
  )
}

export default Trail
