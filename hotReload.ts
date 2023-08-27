import {
  StandardWebSocketClient,
  WebSocketClient,
} from 'https://deno.land/x/websocket@v0.1.4/mod.ts'

let ws: WebSocketClient

setInterval(() => {
  ws?.ping()
  if (!ws || ws.isClosed) {
    ws = new StandardWebSocketClient('ws://localhost:3001')
    ws.on('message', function (message: { data: string }) {
      message.data === 'reload' && window.location.reload()
    })
  }
}, 1000)
