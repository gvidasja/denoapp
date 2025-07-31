import { Application } from 'jsr:@oak/oak'
import 'jsr:@std/dotenv/load'
import { uiMiddleware } from '../mod.ts'

const app = new Application().use(
  uiMiddleware({
    bundler: {
      entryPoint: import.meta.resolve('./main.tsx'),
      indexHTML: import.meta.resolve('./index.html'),
    },
  })
)

console.log('started')

await app.listen({ port: 5555 })
