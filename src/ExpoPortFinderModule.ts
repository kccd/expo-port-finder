import { NativeModule, requireNativeModule } from 'expo';

import { ExpoPortFinderModuleEvents } from './ExpoPortFinder.types';

declare class ExpoPortFinderModule extends NativeModule<ExpoPortFinderModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoPortFinderModule>('ExpoPortFinder');
