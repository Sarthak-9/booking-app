echo "Installing dependencies..."
npm install --production=false  
echo "Installing TypeScript type definitions..."
npm install --save-dev @types/express @types/cors

echo "Starting the application..."
npm start
