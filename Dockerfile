# Step 1: Use an official Node.js image as the base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Expose the port that the app will run on
EXPOSE 3000

# Step 8: Define the command to run the app (after building)
CMD ["npm", "start"]
