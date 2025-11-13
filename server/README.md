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
## 4. Smoke Test (Backend)

The following defines 5 critical backend points for the "smoke test" to run on every deployment. These tests focus on API endpoints, database logic, and external service integrations.

#### 1. User Login Endpoint
* **What flow does it cover and why?**
    It validates the `POST /auth/login` endpoint. This is a critical integration test ensuring the server can: 1. Receive credentials, 2. Find the user in the database, 3. Compare the hashed password (e.g., using `bcrypt`), and 4. Successfully generate and sign a valid JWT (JSON Web Token) with the correct payload and expiration.
* **How is it executed?**
    An integration test sends a `POST` request with valid test credentials directly to the `/auth/login` endpoint and asserts a `200 OK` response containing a JWT.
* **What type of test proves it?**
    Integration.

#### 2. New User Registration Endpoint
* **What flow does it cover and why?**
    It validates the `POST /auth/register` endpoint. This test confirms the server's core logic for creating a new user, including: 1. Data validation (using DTOs like `class-validator`), 2. The logic to check for duplicate emails in the database, 3. The password hashing process, and 4. The successful insertion of a new record into the `users` table.
* **How is it executed?**
    An integration test sends a `POST` request with unique (e.g., timestamped) user data and asserts a `201 Created` response.
* **What type of test proves it?**
    Integration.

#### 3. Nearby Restaurants Geospatial Query
* **What flow does it cover and why?**
    It validates the `GET /restaurants/nearby` endpoint. This is a critical performance and logic test for the backend's database query. It ensures the geospatial query (e.g., PostGIS `ST_DWithin` in PostgreSQL) correctly interprets latitude, longitude, and radius query parameters to efficiently query the `restaurants` table.
* **How is it executed?**
    An integration test makes a `GET` request with known test coordinates and asserts that the returned JSON list contains the expected restaurants.
* **What type of test proves it?**
    Integration.

#### 4. Product Retrieval by Restaurant (Database Relation)
* **What flow does it cover and why?**
    It validates the `GET /products/restaurant/:id` endpoint. This test verifies a key database relationship (e.g., a SQL JOIN or a TypeORM relation) between the `products` and `restaurants` tables. It ensures the API correctly uses the URL parameter (`:id`) to filter and return only the products for that specific restaurant.
* **How is it executed?**
    An integration test makes a `GET` request using a valid, known `restaurantId` from the test database and asserts the returned product list is correct.
* **What type of test proves it?**
    Integration.

#### 5. Payment Intent Creation (External API)
* **What flow does it cover and why?**
    It validates the `POST /payments/create-intent` endpoint. This is a vital external integration test. It confirms that the server (using its secret keys, e.g., `STRIPE_SECRET_KEY`) can securely communicate with the payment gateway (like Stripe), authenticate, send the correct amount, and receive a valid `client_secret` or intent ID in response. A failure here blocks all revenue.
* **How is it executed?**
    An integration test (using a *mocked* or *test mode* payment gateway API) sends a request with an amount and asserts a valid, successful response from the external service.
* **What type of test proves it?**
    Integration.
```

##  5 **Configure environment variables**:

Create a `.env` file in the server root with:
```env
DATABASE_URL=postgresql
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



