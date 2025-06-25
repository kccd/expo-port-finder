package expo.modules.portfinder

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import java.net.ServerSocket
import java.io.IOException

class ExpoPortFinderModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoPortFinder")

    AsyncFunction("getPort") { startPort: Int, stopPort: Int, promise: Promise ->
      var port = startPort

      while (port <= stopPort) {
        try {
          val socket = ServerSocket(port)
          socket.close()
          promise.resolve(port)
          return@AsyncFunction
        } catch (e: IOException) {
          port++
        }
      }

      promise.reject("NO_PORT_FOUND", "No available port found", null)
    }
  }
}