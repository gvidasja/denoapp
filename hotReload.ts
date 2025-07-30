let ws: WebSocket

setInterval(() => {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket('ws://localhost:3001')
    ws.addEventListener('message', function (message: { data: string }) {
      message.data === 'reload' && window.location.reload()
    })
  }
}, 1000)
