import ExpoModulesCore
import Foundation
import Network

public class ExpoPortFinderModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoPortFinder")

    AsyncFunction("getPort") { (startPort: Int, stopPort: Int, promise: Promise) in
      do {
        var port = startPort
        var found = false
        
        while port <= stopPort && !found {
          if self.isPortAvailable(port: port) {
            found = true
            break
          } else {
            port += 1
          }
        }
        
        let closure: @Sendable () -> Void = {
          if !found {
            promise.reject("NO_PORT_FOUND", "No available port found")
          } else {
            promise.resolve(port)
          }
        }
        DispatchQueue.main.async(execute: closure)
      } catch {
        let errorClosure: @Sendable () -> Void = {
          promise.reject("PORT_FINDER_ERROR", "Error finding port: \(error.localizedDescription)")
        }
        DispatchQueue.main.async(execute: errorClosure)
      }
    }
  }

  private func isPortAvailable(port: Int) -> Bool {
    let socketFD = socket(AF_INET, SOCK_STREAM, 0)
    guard socketFD != -1 else {
      return false
    }
    
    defer {
      close(socketFD)
    }
    
    var addr = sockaddr_in()
    addr.sin_family = sa_family_t(AF_INET)
    addr.sin_port = in_port_t(port).bigEndian
    addr.sin_addr.s_addr = INADDR_ANY
    
    let bindResult = withUnsafePointer(to: &addr) {
      $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {
        bind(socketFD, $0, socklen_t(MemoryLayout<sockaddr_in>.size))
      }
    }
    
    if bindResult == -1 {
      return false
    }
    
    let listenResult = listen(socketFD, 1)
    return listenResult == 0
  }
}