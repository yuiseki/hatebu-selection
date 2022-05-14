import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    {
      id: 'hatena',
      name: 'Hatena Bookmark',
      type: 'oauth',
      version: '1.0',
      clientId: process.env.HATENA_KEY,
      clientSecret: process.env.HATENA_SECRET,
      authorization:
        'https://www.hatena.ne.jp/oauth/authorize?scope=read_public',
      requestTokenUrl: 'https://www.hatena.com/oauth/initiate',
      accessTokenUrl: 'http:///www.hatena.com/oauth/token',
      profileUrl: 'http://n.hatena.com/applications/my.json',
      profile(profile) {
        return {
          id: profile.url_name,
          name: profile.display_name,
          image: profile.profile_image_url,
        }
      },
    },
  ],
})
