'use client'
import React from 'react'
import Link from 'next/link'
import { getUriWithOrg } from '@services/config/config'
import { HeaderProfileBox } from '@components/Security/HeaderProfileBox'
import MenuLinks from './MenuLinks'
import { getOrgLogoMediaDirectory } from '@services/media/media'
import { useLHSession } from '@components/Contexts/LHSessionContext'
import { useOrg } from '@components/Contexts/OrgContext'
import { useCookies } from '@components/Contexts/CookiesContext'

export const Menu = (props: any) => {
  const orgslug = props.orgslug
  const cookies = useCookies() as any;
  const session = useLHSession() as any;
  const access_token = session?.data?.tokens?.access_token;
  const [feedbackModal, setFeedbackModal] = React.useState(false)
  const org = useOrg() as any;

  function closeFeedbackModal() {
    setFeedbackModal(false)
  }

  return (
    <>
      <div className="backdrop-blur-lg h-[60px] blur-3xl -z-10" style={{}}>
        
      </div>
      <div className="backdrop-blur-lg bg-white/90 fixed flex top-0 left-0 right-0 h-[60px] ring-1 ring-inset ring-gray-500/10 items-center space-x-5 shadow-[0px_4px_16px_rgba(0,0,0,0.03)] z-50">
        <div className="flex items-center space-x-5 w-full max-w-screen-2xl mx-auto px-16">
          <div className="logo flex items-center h-full">
            <Link href={getUriWithOrg(orgslug, '/',cookies)}>
              <div className="flex w-auto h-9 rounded-md items-center m-auto py-1 justify-center">
                {org?.logo_image ? (
                  <img
                    src={`${getOrgLogoMediaDirectory(
                      org.org_uuid,
                      org?.logo_image
                    )}`}
                    alt="Learnhouse"
                    style={{ width: 'auto', height: '100%' }}
                    className="rounded-md"
                  />
                ) : (
                  <LearnHouseLogo></LearnHouseLogo>
                )}
                <span className="text-lg font-semibold text-gray-800 pl-1"> Nanoheal</span>

              </div>
            </Link>
          </div>
          <div className="links flex grow">
            <MenuLinks orgslug={orgslug} />
          </div>
          <div className="profile flex items-center">
            {/* <Modal
                            isDialogOpen={feedbackModal}
                            onOpenChange={setFeedbackModal}
                            minHeight="sm"
                            dialogContent={<FeedbackModal></FeedbackModal>}
                            dialogTitle="Feedback"
                            dialogDescription="An issue? A suggestion? a bug ? Let us know!"
                            dialogTrigger={
                                <div className="feedback cursor-pointer block items-center h-fit p-2 rounded-2xl bg-orange-800 hover:bg-orange-900 text-orange-300 shadow">
                                    <MessageSquareIcon size={12} />
                                </div>
                            }
                        /> */}
            <HeaderProfileBox />
          </div>
        </div>
      </div>
    </>
  )
}

const LearnHouseLogo = () => {
  return (

    <img
    src="https://media.licdn.com/dms/image/v2/C560BAQEIUAm3ujmkLg/company-logo_200_200/company-logo_200_200/0/1630620715025/nanoheal_logo?e=2147483647&v=beta&t=aInw-gzJSWZSCsWyaq-_JmTOUX3SXFR5s79WJxD7ahc"
    alt="Nanoheal Logo"
    className="h-4" 
    style={{ width: 'auto', height: '100%' }} 
  />
  )
}
