-- Pots e-commerce database schema
-- Run this against a fresh MySQL database to recreate the structure.

CREATE TABLE IF NOT EXISTS customers (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  firstname     VARCHAR(100)  NOT NULL,
  lastname      VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  password      VARCHAR(255)  NOT NULL,
  phone         VARCHAR(50),
  street_address VARCHAR(255),
  postal_code   VARCHAR(20),
  city          VARCHAR(100),
  country       VARCHAR(100),
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id          INT            AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)   NOT NULL,
  description TEXT,
  price       DECIMAL(10,2)  NOT NULL,
  stock       INT            NOT NULL DEFAULT 0,
  category    VARCHAR(100),
  image       VARCHAR(500),
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id             INT           AUTO_INCREMENT PRIMARY KEY,
  customer_id    INT           NOT NULL,
  total_price    DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_status VARCHAR(50)   NOT NULL DEFAULT 'Pending',
  payment_id     VARCHAR(255),
  order_status   VARCHAR(50)   NOT NULL DEFAULT 'Pending',
  created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- product_id is nullable so rows survive if a product is later deleted
CREATE TABLE IF NOT EXISTS order_items (
  id           INT           AUTO_INCREMENT PRIMARY KEY,
  order_id     INT           NOT NULL,
  product_id   INT,
  product_name VARCHAR(255)  NOT NULL,
  quantity     INT           NOT NULL,
  unit_price   DECIMAL(10,2) NOT NULL,
  created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);
