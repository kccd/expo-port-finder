import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoPortFinderViewProps } from './ExpoPortFinder.types';

const NativeView: React.ComponentType<ExpoPortFinderViewProps> =
  requireNativeView('ExpoPortFinder');

export default function ExpoPortFinderView(props: ExpoPortFinderViewProps) {
  return <NativeView {...props} />;
}
