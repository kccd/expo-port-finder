import { NativeModule, requireNativeModule } from 'expo';

declare class ExpoPortFinderModule extends NativeModule {
  getPort(startPort: number, stopPort: number): Promise<number>
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoPortFinderModule>('ExpoPortFinder');
