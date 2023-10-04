To run the **vending-machine-app** project:

**A modern React-Redux based on TypeScript**

1. Clone the repository:

```
git clone https://github.com/pMonfared/vending-machine-app.git
```

2. Navigate to the project directory:

```
cd vending-machine-app
```

3. Install the dependencies:

```
npm install
```

4. Start the project:

```
npm start
```

This will start a development server on port 3000. You can open the application in your browser by navigating to `http://localhost:3000`.

**Example:**

```
git clone https://github.com/pMonfared/vending-machine-app.git
cd vending-machine-app
npm install
npm start
```

**Additional notes:**

- If you are using a different port, you can specify it using the `PORT` environment variable. For example, to start the development server on port 8080, you would run the following command:

```
PORT=8080 npm start
```

- The project also includes a Dockerfile, so you can build and run a Docker image of the application. To do this, run the following commands:

```
docker build -t vending-machine-app .
docker run -p 3000:3000 vending-machine-app
```

This will start the application in a Docker container on port 3000.

**Pages:**
It consists of the following pages:

```
- Login
- Register
- User (buyer)
  - Deposit (also allows deposit reset)
  - Buy Products (product list)
  - Purchased Products (list of purchased products)
- User (seller)
  - Products (add, edit, delete)
```

**Troubleshooting:**

If you are having trouble running the project, please check the following:

- Make sure that you have installed all of the required dependencies.
- Make sure that you are running the project from the correct directory.
- Make sure that you have configured the project correctly, such as setting the `PORT` environment variable.
- Check the project documentation for any additional troubleshooting tips.

If you are still having trouble, please feel free to create an issue on the project's GitHub repository.
