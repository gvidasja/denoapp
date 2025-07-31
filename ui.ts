import { Router, type RouterOptions } from 'jsr:@oak/oak@17'
import { Bundler } from './bundler.ts'

const development = Deno.env.get('MODE') === 'development'

export interface UiOptions {
  router?: RouterOptions
  bundler: {
    /** Path of the entrypoint of the app. Use `import.meta.resolve` with relative paths */
    entryPoint: string
    /** Path of index.html. Use `import.meta.resolve` with relative paths */
    indexHTML: string
  }
}

export class UIController {
  private bundler: Bundler

  constructor(private opts: UiOptions) {
    this.bundler = new Bundler(this.opts.bundler.entryPoint, {
      watch: development,
      hotReload: development,
    })
  }

  routes() {
    return new Router(this.opts.router)
      .get('/', async ctx => {
        ctx.response.body = await Deno.readFile(new URL(this.opts.bundler.indexHTML))
        ctx.response.status = 200
      })
      .get('/index.js', ctx => {
        ctx.response.body = this.bundler.getCode()
        ctx.response.headers.set('Content-Type', 'text/javascript')
        ctx.response.status = 200
      })
      .routes()
  }
}
