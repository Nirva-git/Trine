const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export async function sendFormEmail(payload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey || accessKey === 'replace-with-web3forms-access-key') {
    throw new Error('Email is not configured. Add VITE_WEB3FORMS_ACCESS_KEY in .env and restart npm run dev.')
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      ...payload,
    }),
  })

  const result = await response.json()
  if (!response.ok || result.success === false) {
    throw new Error(result.message || 'Unable to send form.')
  }

  return result
}
