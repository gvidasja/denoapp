export class WebSocketServer {
  private clients: WebSocket[] = []

  constructor(private port: number) {
    this.startServer()
  }

  private startServer() {
    Deno.serve({ port: this.port }, req => {
      if (req.headers.get('upgrade') !== 'websocket') {
        return new Response(null, { status: 501 })
      }

      const { socket, response } = Deno.upgradeWebSocket(req)

      socket.addEventListener('open', () => {
        this.clients.push(socket)
      })

      socket.addEventListener('close', () => {
        this.clients = this.clients.filter(client => client !== socket)
      })

      return response
    })
  }

  broadcast(message: string) {
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    }
  }
}
