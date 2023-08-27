import 'https://deno.land/std@0.196.0/dotenv/load.ts'
import { UIController, UiOptions } from './ui.ts'

export function uiMiddleware(opts: UiOptions) {
  return new UIController(opts).routes()
}
