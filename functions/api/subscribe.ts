interface SubscriptionEnv {
  EMAIL_SUBSCRIBERS: {
    get(key: string): Promise<string | null>
    put(key: string, value: string): Promise<void>
  }
}

type SubscribeContext = {
  request: Request
  env: SubscriptionEnv
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const onRequestPost = async ({ request, env }: SubscribeContext): Promise<Response> => {
  let email = ''
  const contentType = request.headers.get('content-type') ?? ''

  try {
    if (contentType.includes('application/json')) {
      const data = (await request.json()) as unknown
      if (typeof data === 'object' && data !== null && 'email' in data && typeof (data as { email: unknown }).email === 'string') {
        email = (data as { email: string }).email
      }
    } else {
      const formData = await request.formData()
      const field = formData.get('email')
      if (typeof field === 'string') {
        email = field
      }
    }
  } catch {
    // fall through to validation error response
  }

  email = email.trim().toLowerCase()
  if (!emailPattern.test(email)) {
    return jsonResponse({ success: false, error: 'invalid_email' }, 400)
  }

  const key = `email:${email}`
  const existing = await env.EMAIL_SUBSCRIBERS.get(key)

  if (!existing) {
    const userAgent = request.headers.get('user-agent') ?? ''
    const entry = {
      email,
      submittedAt: new Date().toISOString(),
      userAgent,
    }
    await env.EMAIL_SUBSCRIBERS.put(key, JSON.stringify(entry))
  }

  return jsonResponse({ success: true }, 200)
}

const jsonResponse = (body: object, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  })
