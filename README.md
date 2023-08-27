# denoapp

To add a UI controller with bundler:

* init deno.jonc
```bash
deno run --allow-read https://raw.githubusercontent.com/gvidasja/denoapp/0.0.1/init.ts
```

* use UI middleware

```ts
import 'https://deno.land/std@0.196.0/dotenv/load.ts'
import { Application } from 'https://deno.land/x/oak@v12.6.0/mod.ts'
import { DB } from 'https://deno.land/x/sqlite@v3.4.1/mod.ts'
import { uiMiddleware } from 'https://raw.githubusercontent.com/gvidasja/denoapp/0.0.1/mod.ts'

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