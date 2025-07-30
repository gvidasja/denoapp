# denoapp

To add a UI controller with bundler:

* init deno.jsonc
```bash
deno run --allow-read @jsr:@gvidasja/denoapp/init
```

* use UI middleware

```ts
import 'jsr:@std/dotenv/load.ts'
import { Application } from 'jsr:@oak/oak'
import { uiMiddleware } from 'jsr:@gvidasja/denoapp'

const app = new Application()
  .use(
    uiMiddleware({
      bundler: {
        entryPoint: import.meta.resolve('./static/main.tsx'),
        indexHTML: import.meta.resolve('./static/index.html'),
      },
    })
  )

await app.listen({ port: 3000 })
```
