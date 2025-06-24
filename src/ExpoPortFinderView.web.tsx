import * as React from 'react';

import { ExpoPortFinderViewProps } from './ExpoPortFinder.types';

export default function ExpoPortFinderView(props: ExpoPortFinderViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
