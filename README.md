# denoapp

To add a UI controller with bundler:

* init deno.jsonc
```bash
deno run --allow-read https://deno.land/x/denoapp/0.0.1/init.ts
```

* use UI middleware

```ts
import 'jsr:@std/dotenv/load.ts'
import { Application } from 'https://deno.land/x/oak@v12.6.0/mod.ts'
import { uiMiddleware } from 'https://deno.land/x/denoapp/0.0.1/mod.ts'

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
