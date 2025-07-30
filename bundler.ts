import * as path from 'jsr:@std/path@1'
import { WebSocketServer } from './ws.ts'

interface BundlerOptions {
  watch: boolean
  hotReload: boolean
}

export class Bundler {
  private dir: string
  private code?: string
  private ws?: WebSocketServer

  constructor(private file: string, private opts: BundlerOptions) {
    this.dir = new URL(path.dirname(file)).pathname.replace(/^\/([A-Z]:)/, '$1')
    console.log(this.dir)
    this.bundle()

    if (opts.watch) {
      this.watch()
    }

    if (opts.hotReload) {
      this.ws = new WebSocketServer(3001)
    }
  }

  getCode(): string {
    return this.code || ''
  }

  private async bundle() {
    console.log('bundling')
    this.code = await this.compile(this.file)

    if (this.opts.hotReload) {
      this.code = this.code += await this.compile(import.meta.resolve('./hotReload.ts'))
    }

    console.log('bundled')
  }

  private async compile(file: string): Promise<string> {
    const denoPath = Deno.env.get('DENO_PATH') || '~/.deno/bin/deno'

    const cmd = new Deno.Command(denoPath, { args: ['bundle', file] })

    const output = await cmd.output()

    if (!output.success) {
      console.error(new Error(new TextDecoder().decode(output.stderr)))
      return ''
    }

    return new TextDecoder().decode(output.stdout)
  }

  private async watch() {
    const watcher = Deno.watchFs(this.dir, { recursive: true })

    for await (const event of watcher) {
      console.log(event.kind, event.paths)
      console.log('recompiling')
      await this.bundle()

      if (this.opts.hotReload) {
        console.log('reloading')
        this.ws?.broadcast('reload')
      }
    }
  }
}
