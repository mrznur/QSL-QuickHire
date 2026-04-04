// Quick test to verify application routes exist
import applicationsRoutes from './src/routes/applications.js';

console.log('\n=== Applications Routes Module ===');
console.log('Module loaded:', !!applicationsRoutes);
console.log('Type:', typeof applicationsRoutes);
console.log('Stack exists:', !!applicationsRoutes.stack);

if (applicationsRoutes.stack) {
  console.log('\nRegistered routes:');
  applicationsRoutes.stack.forEach(layer => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
      console.log(`  ${methods.padEnd(10)} ${layer.route.path}`);
    }
  });
}

console.log('\n=== Test complete ===\n');
process.exit(0);
