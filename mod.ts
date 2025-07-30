import type { Middleware } from 'jsr:@oak/oak@17'
import 'jsr:@std/dotenv@0/load'
import { UIController, type UiOptions } from './ui.ts'

export function uiMiddleware(opts: UiOptions): Middleware {
  return new UIController(opts).routes()
}
