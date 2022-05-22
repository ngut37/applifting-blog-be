# BASE IMAGE FOR DEVELOPMENT
FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install --pure-lockfile

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Base image for production
FROM node:18-alpine As production

# BASE IMAGE FOR PRODUCTION
ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install --pure-lockfile --production=true

# Bundle app source
COPY . .

# Copy the bundled code
COPY --from=development /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]

