package expo.modules.portfinder

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import java.net.URL
import java.net.ServerSocket
import java.io.IOException

class ExpoPortFinderModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoPortFinder")

    AsyncFunction("getPort") { startPort: Int, stopPort: Int, promise: Promise ->

      try{
        var port = startPort
        var found = false

        while (port <= stopPort && !found) {
          try{
            val socket = ServerSocket(port)
            socket.close()
            found = true
            break
          } catch (e: IOException) {
            port++
          }
        }

        if(!found) {
          promise.reject("NO_PORT_FOUND", "No available port found", null)
        } else {
          promise.resolve(port)
        }
      } catch(e: IOException) {
        promise.reject("PORT_FINDER_ERROR", "Error finding port: ${e.message}", e)
      }
    }
  }
}
