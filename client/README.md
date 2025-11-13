# Client folder

## 📌 What does this folder do?

This folder contains the application's *FrontEnd* code, i.e., the interface with which end users interact.

This is where the screens and components that enable the following are developed:

* 👤 User registration and login.
* 📍 Viewing nearby markets and restaurants based on location.
* 🛒 Catalog of food items available that are about to expire.
* 🔔 Receiving smart notifications about products of interest.
* 💳 Interaction with the payment gateway and receipt generation.

The code is developed according to best practices, using *JSDoc* documentation to maintain a clear, readable, and easily scalable structure.

---

## ⚙ Installation

1. *Clone the repository* (if you don't already have it):
bash
git clone https://github.com/restrepo0510/equipo-3-ings-202520.git


2. *Enter the client folder:*
bash
cd client


3. *Install the necessary dependencies:*
bash
npm install


4. *Run the project in development mode:*
bash
npx expo start


The console will display options to open the app in:

* 💻 Development build
* 🤖 Android emulator
* 🍎 iOS simulator
* 🚀 Expo Go, a lightweight option for testing the app.

You can start developing by editing the files inside the app/ directory, which uses file-based routing to organize the views.

---

## 🧩 Structure and standards

The project follows the following standards:

* *Main language:* JavaScript
* *Framework:* React Native with Expo
* *Documentation:* JSDoc to describe functions, components, and props
* *Code style:* Based on ESLint and Prettier
* *Best practices:* Modular, reusable, and commented code for easy maintenance

---

## 🔄 Restarting the project from scratch

If you want to reset the project to its initial state, run:
bash
npm run reset-project


This will move the sample code to the app-example/ folder and create a new empty app/ folder to start from scratch.

---

## 🧪 Testing (Smoke Test)

The following defines 5 critical application points that are part of the "smoke test" which must be run on every deployment to ensure system stability.

### 1. User Login (Full Flow)
* **What flow does it cover and why?**
    It covers the complete authentication flow: entering credentials on the client, sending to the server, validation against the DB, generation and return of JWT, and session storage on the client. It is the most critical point; if it fails, no user can operate.
* **How is it executed?**
    An automated script (or manual test) attempts to log in with a test user (previously registered) on the Login screen.
* **What type of test proves it?**
    End-to-End (e2e).

### 2. New User Registration
* **What flow does it cover and why?**
    Validates the system's ability to register new users. It tests form validation on the client, business logic on the server (`/auth/register`), password hashing, and insertion into the database.
* **How is it executed?**
    An automated script attempts to register a new user with unique data (e.g., using a timestamped email).
* **What type of test proves it?**
    End-to-End (e2e).

### 3. View Nearby Restaurants
* **What flow does it cover and why?**
    Covers the main functionality of the home/map screen. It validates that the client can send coordinates and the server (`/restaurants/nearby`) can query the database (using geospatial filters) and return a list of restaurants.
* **How is it executed?**
    On the client (e2e), a location is simulated, and it's verified that the list or map is populated with data. On the backend (Integration), a direct `GET` request is made to the `/restaurants/nearby` endpoint with test coordinates.
* **What type of test proves it?**
    Integration (for the endpoint) or e2e (for the full flow).

### 4. Load Products from a Restaurant
* **What flow does it cover and why?**
    Ensures that a user can see the product catalog of a specific restaurant. It validates the server endpoint `/products/restaurant/:id`. This is vital for the "place an order" flow.
* **How is it executed?**
    An (e2e) script navigates from the restaurant list to a restaurant's profile and verifies that products are listed. Or, an integration test hits the endpoint directly with a valid restaurant ID.
* **What type of test proves it?**
    Integration or e2e.

### 5. Payment Intent Creation
* **What flow does it cover and why?**
    Validates the communication between the server and the external payment gateway. It confirms that the server can correctly request a "payment intent" (e.g., a *client secret* from Stripe). It is critical for monetization.
* **How is it executed?**
    An integration test simulates a request (authenticated with a test user) to the server endpoint that initiates the payment (e.g., `/payments/create-intent`), sending an amount. A successful response from the gateway is expected.
* **What type of test proves it?**
    Integration.

---

## 📚 Useful resources

* 📘 [Expo documentation](https://docs.expo.dev/)
* 📗 [Expo guides and tutorials](https://docs.expo.dev/guides/)
* 📙 [Expo step-by-step tutorial](https://docs.expo.dev/tutorial/introduction/)

---

## 🧾 Recommended versions

* *Node.js:* ≥ 18
* *npm:* ≥ 9
* *React Native:* ≥ 0.76
* *Expo SDK:* ≥ 51