import { defineConfig } from '@prisma/config'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  migrate: {
    async adapter() {
      const { PrismaPg } = await import('@prisma/adapter-pg')
      return new PrismaPg({ connectionString: process.env.DATABASE_URL })
    },
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
})
