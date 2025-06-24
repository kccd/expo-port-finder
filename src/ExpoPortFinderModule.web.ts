import { registerWebModule, NativeModule } from 'expo';

import { ExpoPortFinderModuleEvents } from './ExpoPortFinder.types';

class ExpoPortFinderModule extends NativeModule<ExpoPortFinderModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoPortFinderModule, 'ExpoPortFinderModule');
