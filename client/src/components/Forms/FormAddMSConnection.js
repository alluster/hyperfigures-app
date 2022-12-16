import React, { useEffect, useState } from 'react'
import { InteractionStatus, InteractionType } from '@azure/msal-browser'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'


const fetchPath = async (path, access_token) => {
  var headers = new Headers();
  var bearer = "Bearer " + access_token;
  headers.append("Authorization", bearer);
  var options = {
       method: "GET",
       headers: headers
  };
  var graphEndpoint = `https://graph.microsoft.com/v1.0/me/${path}`;

  return fetch(graphEndpoint, options)
}

export const MSLogin = () => {

  const AuthContent = () => {
    const { accounts, inProgress, instance } = useMsal()
    const [apiData, setApiData] = useState(null)

    useEffect(async () => {
      if( !apiData && inProgress === InteractionStatus.None) {
        const accessTokenRequest = {
          scopes: ['user.read'],
          account: accounts[0]
        }

        try {
          const tokenResponse = await instance.acquireTokenSilent(accessTokenRequest)
          let token = tokenResponse.accessToken
          // Here we could fetch from MS Graph Api with token
          // What we are interested in is the
          // 1. Current available drives
          // 2. Files in said drives
          // 3. Seeing them in a list where we can choose which ones HF will start tracking
          // Open question: do we need to categorize the files received from MS in some way so they don't get jumbled up in the future
          // Open question: Why did data fetch fail in an incognito window (says invalid scope)
          const driveResponse = await (await fetchPath('drive/items', token)).json()
          console.log('drive responded', driveResponse)
          setApiData([<p key='empty'>empty</p>])

        } catch(err) {
          console.log('unable to auth in protected component', err.message)
        }
      }
    }, [instance, accounts, inProgress, apiData])

    const username = accounts[0].username
    return (
      <div>
        Hello {username}
        Your protected content is here {apiData}
      </div>
    )
  }

  const UnAuthContent = () => {
    const { instance } = useMsal()
    return <button onClick={() => instance.loginPopup()}>Sign in to MS</button>
  }

  return (
    <>
    <AuthenticatedTemplate interactionType={InteractionType.Popup}>
      <AuthContent />
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
      <UnAuthContent />
    </UnauthenticatedTemplate>
    </>
  )
}