# Hono Microservices with kafka


# Order Service
Project stucture 
```mermaid
graph TD

    6["User<br>External Actor"]
    subgraph 1["Analytic Service<br>Bun/TypeScript"]
        12["Data Consumer<br>Bun/TypeScript"]
    end
    subgraph 2["Payment Service<br>Bun/TypeScript"]
        11["Payment Processor<br>Bun/TypeScript"]
    end
    subgraph 3["Order Service<br>Bun/TypeScript"]
        10["Order API<br>Bun/TypeScript"]
    end
    subgraph 4["Messaging Infrastructure System<br>Apache Kafka"]
        subgraph 5["Kafka Cluster<br>Docker Compose"]
            7["Zookeeper<br>Apache Zookeeper"]
            8["Kafka Broker<br>Apache Kafka"]
            9["Kafka Producer/Consumer CLI<br>Node.js"]
            %% Edges at this level (grouped by source)
            7["Zookeeper<br>Apache Zookeeper"] -->|manages| 8["Kafka Broker<br>Apache Kafka"]
            9["Kafka Producer/Consumer CLI<br>Node.js"] -->|interacts with| 8["Kafka Broker<br>Apache Kafka"]
        end
    end
    %% Edges at this level (grouped by source)
    10["Order API<br>Bun/TypeScript"] -->|produces order events| 8["Kafka Broker<br>Apache Kafka"]
    11["Payment Processor<br>Bun/TypeScript"] -->|produces payment outcomes| 8["Kafka Broker<br>Apache Kafka"]
    6["User<br>External Actor"] -->|manages orders via| 10["Order API<br>Bun/TypeScript"]
    8["Kafka Broker<br>Apache Kafka"] -->|sends payment requests to| 11["Payment Processor<br>Bun/TypeScript"]
    8["Kafka Broker<br>Apache Kafka"] -->|sends events to| 12["Data Consumer<br>Bun/TypeScript"]


## Overview

The Order Service is responsible for handling all financial transactions, including placing orders, processing payments, and sending notifications to different parties. It leverages Kafka as a message broker to facilitate communication between different services and applications.

## Architecture

- **Server**: Contains the main application logic.
  - `index.ts`: The entry point of the server that initializes the Hono framework and sets up the API endpoints.
  - `app.tsx`: The React component for rendering the order service UI.

- **Kafka**: Manages message delivery between services using Kafka topics.
  - `docker-compose.yml`: Defines the Kafka broker containers, including configuration settings.
  - `server.js`: A simple server that initializes Kafka and creates necessary topics.
  - `src/index.ts`: The TypeScript file for interacting with the Kafka admin client.

### Running the Service

To run the order service, follow these steps:

1. **Install Dependencies**:
   ```sh
   npm install
   ```

2. **Start Kafka Services**:
   Modify the `docker-compose.yml` file in the root directory of your project and start the Kafka services using Docker Compose.
   ```sh
   docker-compose up -d
   ```

3. **Run the Order Service**:
   Start the server using Node.js in the `order-service` directory.
   ```sh
   npm start
   ```

4. **Access the Service**:
   Open a web browser and navigate to `http://localhost:3002` to access the order service UI.

### API Endpoints

- **/**: Returns a greeting message "Hello Hono!".

### Kafka Interaction

- **Topics**: The server creates three topics for financial transaction notifications (`payment-successful`, `order-successful`, and `email-successful`).
- **Admin Client**: The server uses the Kafka admin client to create these topics.
- **Producer/Consumer**: You can use Kafka tools or libraries (like `kafka-node`) to produce messages to these topics and consume messages from them.

### UI

The React component for rendering the order service UI is not provided in this file. It's assumed that you would build the frontend part using a framework like Next.js, Angular, or React Native.

## Contributing

- **Fork the Repository**: Create your own fork of this repository.
- **Create a New Branch**: Start working on a new feature or bug fix in a new branch.
- **Commit Changes**: Commit your changes with clear and descriptive commit messages.
- **Push to Origin**: Push your changes to your fork on GitHub.
- **Open a Pull Request**: Submit a pull request to the main repository.

## Documentation

For more detailed information about the order service, its architecture, and how to use it, refer to the project's README file.

---

# Payment Service

The Payment Service is responsible for handling all financial transactions, including placing orders, processing payments, and sending notifications to different parties. It leverages Kafka as a message broker to facilitate communication between different services and applications.

## Architecture

- **Server**: Contains the main application logic.
  - `index.ts`: The entry point of the server that initializes the Hono framework and sets up the API endpoints.
  - `app.tsx`: The React component for rendering the payment service UI.

- **Kafka**: Manages message delivery between services using Kafka topics.
  - `docker-compose.yml`: Defines the Kafka broker containers, including configuration settings.
  - `server.js`: A simple server that initializes Kafka and creates necessary topics.
  - `src/index.ts`: The TypeScript file for interacting with the Kafka admin client.

### Running the Service

To run the payment service, follow these steps:

1. **Install Dependencies**:
   ```sh
   npm install
   ```

2. **Start Kafka Services**:
   Modify the `docker-compose.yml` file in the root directory of your project and start the Kafka services using Docker Compose.
   ```sh
   docker-compose up -d
   ```

3. **Run the Payment Service**:
   Start the server using Node.js in the `payment-service` directory.
   ```sh
   npm start
   ```

4. **Access the Service**:
   Open a web browser and navigate to `http://localhost:3002` to access the payment service UI.

### API Endpoints

- **/**: Returns a greeting message "Hello Hono!".

### Kafka Interaction

- **Topics**: The server creates three topics for financial transaction notifications (`payment-successful`, `order-successful`, and `email-successful`).
- **Admin Client**: The server uses the Kafka admin client to create these topics.
- **Producer/Consumer**: You can use Kafka tools or libraries (like `kafka-node`) to produce messages to these topics and consume messages from them.

### UI

The React component for rendering the payment service UI is not provided in this file. It's assumed that you would build the frontend part using a framework like Next.js, Angular, or React Native.

## Contributing

- **Fork the Repository**: Create your own fork of this repository.
- **Create a New Branch**: Start working on a new feature or bug fix in a new branch.
- **Commit Changes**: Commit your changes with clear and descriptive commit messages.
- **Push to Origin**: Push your changes to your fork on GitHub.
- **Open a Pull Request**: Submit a pull request to the main repository.

## Documentation

For more detailed information about the payment service, its architecture, and how to use it, refer to the project's README file.

---

# Analytic Service

The Analytic Service is responsible for analyzing and processing large volumes of data. It leverages Kafka as a message broker to facilitate communication between different services and applications.

## Architecture

- **Server**: Contains the main application logic.
  - `index.ts`: The entry point of the server that initializes the Hono framework and sets up the API endpoints.
  - `app.tsx`: The React component for rendering the analytic service UI.

- **Kafka**: Manages message delivery between services using Kafka topics.
  - `docker-compose.yml`: Defines the Kafka broker containers, including configuration settings.
  - `server.js`: A simple server that initializes Kafka and creates necessary topics.
  - `src/index.ts`: The TypeScript file for interacting with the Kafka admin client.

### Running the Service

To run the analytic service, follow these steps:

1. **Install Dependencies**:
   ```sh
   npm install
   ```

2. **Start Kafka Services**:
   Modify the `docker-compose.yml` file in the root directory of your project and start the Kafka services using Docker Compose.
   ```sh
   docker-compose up -d
   ```

3. **Run the Analytic Service**:
   Start the server using Node.js in the `analytic-service` directory.
   ```sh
   npm start
   ```

4. **Access the Service**:
   Open a web browser and navigate to `http://localhost:3002` to access the analytic service UI.

### API Endpoints

- **/**: Returns a greeting message "Hello Hono!".

### Kafka Interaction

- **Topics**: The server creates three topics for financial transaction notifications (`payment-successful`, `order-successful`, and `email-successful`).
- **Admin Client**: The server uses the Kafka admin client to create these topics.
- **Producer/Consumer**: You can use Kafka tools or libraries (like `kafka-node`) to produce messages to these topics and consume messages from them.

### UI

The React component for rendering the analytic service UI is not provided in this file. It's assumed that you would build the frontend part using a framework like Next.js, Angular, or React Native.

## Contributing

- **Fork the Repository**: Create your own fork of this repository.
- **Create a New Branch**: Start working on a new feature or bug fix in a new branch.
- **Commit Changes**: Commit your changes with clear and descriptive commit messages.
- **Push to Origin**: Push your changes to your fork on GitHub.
- **Open a Pull Request**: Submit a pull request to the main repository.

## Documentation

For more detailed information about the analytic service, its architecture, and how to use it, refer to the project's README file.

---

# Order Service

The Order Service is responsible for handling all financial transactions, including placing orders, processing payments, and sending notifications to different parties. It leverages Kafka as a message broker to facilitate communication between different services and applications.

## Architecture

- **Server**: Contains the main application logic.
  - `index.ts`: The entry point of the server that initializes the Hono framework and sets up the API endpoints.
  - `app.tsx`: The React component for rendering the order service UI.

- **Kafka**: Manages message delivery between services using Kafka topics.
  - `docker-compose.yml`: Defines the Kafka broker containers, including configuration settings.
  - `server.js`: A simple server that initializes Kafka and creates necessary topics.
  - `src/index.ts`: The TypeScript file for interacting with the Kafka admin client.

### Running the Service

To run the order service, follow these steps:

1. **Install Dependencies**:
   ```sh
   npm install
   ```

2. **Start Kafka Services**:
   Modify the `docker-compose.yml` file in the root directory of your project and start the Kafka services using Docker Compose.
   ```sh
   docker-compose up -d
   ```

3. **Run the Order Service**:
   Start the server using Node.js in the `order-service` directory.
   ```sh
   npm start
   ```

4. **Access the Service**:
   Open a web browser and navigate to `http://localhost:3002` to access the order service UI.

### API Endpoints

- **/**: Returns a greeting message "Hello Hono!".

### Kafka Interaction

- **Topics**: The server creates three topics for financial transaction notifications (`payment-successful`, `order-successful`, and `email-successful`).
- **Admin Client**: The server uses the Kafka admin client to create these topics.
- **Producer/Consumer**: You can use Kafka tools or libraries (like `kafka-node`) to produce messages to these topics and consume messages from them.

### UI

The React component for rendering the order service UI is not provided in this file. It's assumed that you would build the frontend part using a framework like Next.js, Angular, or React Native.

## Contributing

- **Fork the Repository**: Create your own fork of this repository.
- **Create a New Branch**: Start working on a new feature or bug fix in a new branch.
- **Commit Changes**: Commit your changes with clear and descriptive commit messages.
- **Push to Origin**: Push your changes to your fork on GitHub.
- **Open a Pull Request**: Submit a pull request to the main repository.

## Documentation

For more detailed information about the order service, its architecture, and how to use it, refer to the project's README file.
