# `server` folder

## 📌 What does this folder do?

This folder contains the project's **backend code**, where business logic and database connections are managed. It ensures that all information flows correctly and that the project's features work optimally.

The following functions are implemented here:

* 🔐 Secure storage of user credentials and data
* 🗂️ Registration, filtering, and updating of products nearing expiration
* 📊 Calculation of environmental and social impact statistics
* 📡 Communication between the client and the database via REST API
* 📲 Sending automatic notifications to users and businesses
* ⚡ Integration with external services such as payment gateways and Google Maps

The code is developed with **NestJS**, a progressive Node.js framework that uses TypeScript by default, ensuring robust, scalable, and maintainable code.

---

## ⚙️ Installation and configuration

### Prerequisites
- **Node.js**: ≥ 18
- **npm**: ≥ 9
- **Database**: PostgreSQL

### Initial configuration

1. **Clone the repository** (if you don't already have it):
```bash
git clone https://github.com/restrepo0510/equipo-3-ings-202520.git
```

2. **Enter the server folder**:
```bash
cd server
```

3. **Install dependencies**:
```bash
npm install
```

4. **Configure environment variables**:
Create a `.env` file in the server root with:
```env
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret_key
PORT=3000
NODE_ENV=development
```

---

## 🚀 Running the project

### Development
```bash
# Development mode with hot-reload
$ npm run start:dev
```

### Production
```bash
# Compilation for production
$ npm run build

# Execution in production
$ npm run start:prod
```

---

## 🧪 Testing

```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

---

## 🏗️ Project structure

```
server/
├── src/
│   ├── auth/          # Authentication and authorization
│   ├── users/         # User management
│   ├── restaurants/   # Restaurant management
│   ├── products/      # Product management
│   ├── common/        # Shared utilities
│   └── main.ts        # Entry point
├── test/              # Testing files
├── package.json
└── tsconfig.json
```

---

## 📚 Technical features

* **Framework**: NestJS with TypeScript
* **Database**: PostgreSQL with TypeORM
* **Authentication**: JWT (JSON Web Tokens)
* **Validation**: Class-validator and class-transformer
* **Documentation**: Integrated OpenAPI (Swagger)
* **Testing**: Jest for unit and integration testing

---

## 🔌 Main API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - Login

### Users
- `GET /users` - List users
- `GET /users/:id` - Get specific user
- `PUT /users/:id` - Update user

### Restaurants
- `GET /restaurants` - List restaurants
- `GET /restaurants/nearby` - Nearby restaurants
- `POST /restaurants` - Create restaurant

### Products
- `GET /products` - List products
- `GET /products/restaurant/:id` - Products by restaurant
- `POST /products` - Create product

---

## 🛠️ Development

### Generate a new module
```bash
nest generate module module-name
nest generate service module-name
nest generate controller module-name
```

### Database migrations
```bash
# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run

# Revert migration
npm run typeorm migration:revert
```

---

## 📦 Deployment

### Option 1: Mau (Official NestJS platform)
```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [“npm”, ‘run’, “start:prod”]
```

---

## 📖 Useful resources

* [NestJS documentation](https://docs.nestjs.com)
* [TypeORM documentation](https://typeorm.io)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [JWT Official](https://jwt.io)

---

## 🤝 Support

- **Documentation**: [NestJS Docs](https://docs.nestjs.com)
- **Community**: [NestJS Discord](https://discord.gg/G7Qnnhy)
- **Courses**: [NestJS Courses](https://courses.nestjs.com/)



