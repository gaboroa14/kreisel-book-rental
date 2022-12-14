#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../app'
import http from 'http'
import debug from 'debug'
import { db, syncModels } from '@services/database'

debug('backend:server')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '4030')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(app.get('port'), async () => {
  console.log('server on port: ', app.get('port'))

  try {
    await db.authenticate()
    console.log('database connected')

    //await db.sync()
    //await syncModels()
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.log(error)
  }
})
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    // break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    // break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
