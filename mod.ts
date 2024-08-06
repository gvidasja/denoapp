import 'jsr:@std/dotenv/load'
import { UIController, UiOptions } from './ui.ts'

export function uiMiddleware(opts: UiOptions) {
  return new UIController(opts).routes()
}
