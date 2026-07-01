import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Automatically copy uploaded logos from container root or workspace root if they exist
try {
  const destDir = path.resolve(__dirname, 'src/assets/images');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const copyImage = (sources: string[], destName: string) => {
    const destPath = path.join(destDir, destName);
    for (const src of sources) {
      const resolvedSrc = path.isAbsolute(src) ? src : path.resolve(__dirname, src);
      if (fs.existsSync(resolvedSrc)) {
        fs.copyFileSync(resolvedSrc, destPath);
        console.log(`Successfully copied logo from ${resolvedSrc} to ${destPath}`);
        return true;
      }
    }
    return false;
  };

  // Check possible locations for user uploaded files
  copyImage(['/input_file_0.png', 'input_file_0.png'], 'logo_energy.png');
  copyImage(['/input_file_1.png', 'input_file_1.png'], 'logo_immobilien.png');
} catch (err) {
  console.error('Error copying uploaded logos during config load:', err);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
