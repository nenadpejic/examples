import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, {
    providers: [
      Credentials({
        name: 'Credentials',
        credentials: {
          username: {
            label: 'Username',
            type: 'text',
            placeholder: 'admin',
          },
          password: {
            label: 'Password',
            type: 'password',
            placeholder: '*****',
          },
        },
        async authorize(credentials, req) {
          // const res = await fetch("/your/endpoint", {
          //   method: 'POST',
          //   body: JSON.stringify(credentials),
          //   headers: { "Content-Type": "application/json" }
          // })
          // const user = await res.json()

          // If no error and we have user data, return it
          // if (res.ok && user) {
          //   return user;
          // }
          // Return null if user data could not be retrieved
          // return null;
          if (
            credentials?.username === 'admin' &&
            credentials.password === 'admin'
          ) {
            return { id: '1', name: 'John', email: 'john@example.com' }
          }

          return null
        },
      }),
    ],
  })
}
