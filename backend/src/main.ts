import { register } from 'ts-node';
import { pathToFileURL } from 'url';

// Register ts-node
register({
  compilerOptions: {
    module: 'ESNext', // Align with your tsconfig.json settings
  },
});

// Import your app file
import('./app.js').catch((error) => {
  console.error('Error loading app:', error);
});
