# expo-port-finder

A simple tool to find an open port on Expo. It supports both `Android` and `iOS`.

## Installation

```bash
npx expo install expo-port-finder
```

## Usage

```javascript
import expoPortFinder from 'expo-port-finder';

// Find an available port within the specified range
expoPortFinder.getPort(3000, 4000)
  .then(port => console.log('Available port:', port))
  .catch(error => console.error('No available port found:', error));
```

## API

### `getPort(startPort: number, stopPort: number): Promise<number>`

- `startPort`: Starting port number (inclusive)
- `stopPort`: Ending port number (inclusive)
- Returns: First available port found in the range
- Throws: Error if no available port is found within the range

## Example Scenario

```javascript
import * as FileSystem from "expo-file-system";
import { startServer } from "expo-static-server";
import { unzip } from 'react-native-zip-archive';
import portFinder from 'expo-port-finder';

// Usage when starting a local server
const startStaticServer = async (zipFileUri) => {
  const root =
    (FileSystem.documentDirectory || "") + "expo_static_server_root_zip_files";
  await unzip(zipFileUri, root);
  await startServer({
    port: await portFinder.getPort(9000, 10000),
    host: '127.0.0.1',
    root: root,
  });
};
```

## License
MIT