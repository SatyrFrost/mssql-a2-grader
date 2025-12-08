export const sqlQuestionSetup = `
-- Drop Tables if they exist (SQLite syntax)
DROP TABLE IF EXISTS OrdersProduct;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Supplier;
DROP TABLE IF EXISTS LU_Payment_Type;

-- Create Tables (SQLite syntax)
CREATE TABLE Supplier (
    SupplierID INTEGER PRIMARY KEY AUTOINCREMENT,
    SupplierName TEXT NOT NULL
);

CREATE TABLE Customer (
    CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerName TEXT NOT NULL,
    CustomerAddress1 TEXT,
    CustomerAddress2 TEXT,
    CustomerAddress3 TEXT
);

CREATE TABLE Product (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    ProductDescription TEXT NOT NULL,
    ProductPrice REAL NOT NULL,
    SupplierID INTEGER,
    FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID)
);

CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderDate TEXT NOT NULL, -- Storing DATETIME as TEXT in ISO 8601 format
    OrderTotal REAL, -- DECIMAL(7,2) converted to REAL
    CustomerID INTEGER,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE LU_Payment_Type (
    PaymentTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
    PaymentTypeName TEXT NOT NULL
);

CREATE TABLE Payment (
    PaymentID INTEGER PRIMARY KEY AUTOINCREMENT,
    PaymentAmount REAL, -- MONEY converted to REAL
    PaymentDate TEXT NOT NULL, -- Storing DATETIME as TEXT in ISO 8601 format
    PaymentTypeID INTEGER,
    OrderID INTEGER,
    CustomerID INTEGER,
    FOREIGN KEY (PaymentTypeID) REFERENCES LU_Payment_Type(PaymentTypeID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE OrdersProduct (
    OrderID INTEGER,
    ProductID INTEGER,
    Quantity INTEGER,
    Price REAL, -- MONEY converted to REAL
    SubTotal REAL, -- MONEY converted to REAL
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- Data (SQLite syntax, converting dates and subqueries)

INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Sarah','2 Lions Rd','Sunnyvile','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Richard','61B River Street','Sunnyvile','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Ching Chu','198 River Street','Sunnyvile','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Jerry','15 Rocking Drive','Genics','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Helga','78 Lapids Road','Genics','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Shida','4 Sunny Street','Genics','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Sarah','52 Shuba Road','Genics','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Ulcart','61 Heckle Street','Genics','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Mathew','36 Lugtoa Road','Genics','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Leggoal','156 Gemina Road','Genics','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Horrianna','15 Rocks Place','Southal','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Adam','79 Rocks Place','Southal','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Mike','43 Runner Drive','Southal','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Alesha','89 Marden Street','Southal','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Teallia','1 Marden Street','Southal','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Kelly','17 Mackado Street','Western Bites','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Brock','98 Hellohu Street','Western Bites','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Rachel','12 Shibot Street','Western Bites','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Alan','2/FlatB Main Street','Central Bites','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Jasmine','34 Humper Road','Sunnycrest','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Richard','56 Dodah Street','Sunnycrest','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Karl','21 Lylu Street','Sunnycrest','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Lucy','4 Feackle Street','Sunnycrest','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Linda','56 Wooden Street','Sunnycrest','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Ronda','127 Solid Street','Sunnycrest','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Fiona','3 Roikes Street','Sunnycrest','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Henry','46 Mathewers Road','Sunnycrest','Hamiltock');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Youda','3 Sharp Drive','Cappins','Auckulund');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Mathu','55 Blunt Street','Chockins','Auckulund');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Makubu','145 Runners Lane','Halleniles','Auckulund');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Henuaweu','53 Jumpers Street','Halleniles','Auckulund');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Mekukai','87 Collins Street','Rickens','Auckulund');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Yenny','5 Helpn Street','Suckingsville','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Potter','56 Yarnner Street','Suckingsville','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Pots','99 Yarnner Street','Suckingsville','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Xiaver','64 Reallin Street','Suckingsville','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Wrighten','80 Maodein Street','Suckingsville','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Jeallo','2 Cephil Street','Suckingsville','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Raiden','63 Youcart Street','Suckingsville','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Kellyins','76 Clobden Street','Hammerson','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Bruce','53 Fickle Street','Hammerson','Te Anautu');
INSERT INTO Customer (CustomerName, CustomerAddress1, CustomerAddress2, CustomerAddress3) VALUES ('Catherine','23 Marken Street','Hammerson','Te Anautu');

INSERT INTO Supplier (SupplierName) VALUES ('Painrelief Inc');
INSERT INTO Supplier (SupplierName) VALUES ('Good Health Inc');

INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Paracetomol (10 Tablets)',6.85,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Paracetomol (20 Tablets)',9.95,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Paracetomol (30 Tablets)',14.95,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Paracetomol 250ml',7.95,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Paracetomol 500ml',11.95,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Nurofen (12 Caplets)',7.95,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Nurofen (20 Caplets)',12.45,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Nurofen (25 Caplets)',14.95,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Disprin 300mg (10 Tablets)',4.45,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Disprin 600mg (20 Tablets)',6.95,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Sudafed PE (10 Tablets)',3.45,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Sudafed PE (24 Tablets)',7.45,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Stopain GEL',4.95,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Stopain Spray',7.85,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Stopain Roll-On',6.45,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Voltarol Gel 30g',9.45,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Voltarol Gel 60g',4.45,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Tiger Balm - M (4 Patches)',7.85,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Tiger Balm - L (4 Patches)',13.85,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('ThermaCare Heatwraps - M (2 Wraps)',7.85,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('ThermaCare Heatwraps - XL (2 Wraps)',12.85,1);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Allerstop (30 Tablets)',15.75,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Womens Multi Tablets (60 Tablets)',21.35,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Artery Prime VegeCaps (60 Tablets)',47.80,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Instant Natural Protein 375g',15.60,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Instant Natural Protein 1kg',30.70,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Herb Manuka Mouthwash 100ml',19.50,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Sensodyne Total Care GEL Toothpaste 110g',12.99,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Centrum 50+ (30 Tablets)',12.50,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Centrum 50+ (100 Tablets)',23.99,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Centrum Kids Incremin 100ml',8.30,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Badger Aromatic Chest Rub Balm 56g',18.50,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Badger Cheerful Mind Balm Stick 17g',15.50,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Bosistos Lavender OIL 25ml',23.90,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Bosistos Lavender OIL 50ml',37.99,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Dreamtime Spray 125ml',8.50,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Tissue Salt A Tablets 240',18.00,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Tissue Salt B Tablets 240',18.50,2);
INSERT INTO Product (ProductDescription, ProductPrice, SupplierID) VALUES ('Tissue Salt C Tablets 240',18.50,2);

INSERT INTO LU_Payment_Type (PaymentTypeName) VALUES ('CASH');
INSERT INTO LU_Payment_Type (PaymentTypeName) VALUES ('CREDIT CARD');
INSERT INTO LU_Payment_Type (PaymentTypeName) VALUES ('WECHAT');

-- Orders (Dates converted to YYYY-MM-DD HH:MM:SS)
INSERT INTO Orders (CustomerID, OrderDate) VALUES (1,'2016-02-25 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (2,'2016-01-11 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (3,'2016-07-15 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (4,'2016-02-19 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (5,'2016-05-06 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (6,'2016-07-14 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (7,'2016-05-19 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (8,'2016-09-01 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (9,'2016-11-21 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (10,'2016-01-16 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (11,'2016-02-21 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (12,'2016-08-06 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (13,'2016-02-12 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (14,'2016-03-28 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (15,'2016-07-25 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (16,'2016-03-07 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (17,'2016-07-02 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (18,'2016-04-08 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (19,'2016-05-02 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (20,'2016-11-07 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (21,'2016-02-26 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (22,'2016-02-01 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (23,'2016-12-01 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (24,'2016-05-08 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (25,'2016-03-10 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (26,'2016-09-02 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (27,'2016-05-03 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (28,'2016-10-25 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (29,'2016-10-26 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (30,'2016-05-19 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (31,'2016-06-17 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (32,'2016-09-07 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (4,'2016-07-09 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (4,'2016-09-04 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (21,'2016-08-09 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (22,'2016-08-04 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (4,'2016-08-02 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (15,'2016-08-26 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (27,'2016-06-20 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (18,'2016-08-03 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (22,'2016-05-15 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (11,'2016-11-21 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (11,'2016-11-13 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (11,'2016-09-01 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (14,'2016-04-05 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (21,'2016-09-16 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (2,'2016-04-12 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (9,'2016-11-18 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (5,'2016-06-07 00:00:00');
INSERT INTO Orders (CustomerID, OrderDate) VALUES (31,'2016-07-19 00:00:00');

--OrdersProduct (Subqueries for Price are converted to direct values or separate updates)
-- For simplicity and to avoid complex parsing of nested SELECTs in INSERT VALUES,
-- I'm assuming ProductPrice is known or will be updated.
-- For now, I'll use a subquery for Price, which SQLite supports in INSERT SELECT.
-- However, the original script uses INSERT ... SELECT ... FROM Product WHERE Product.ProductID = X
-- which is effectively getting a single price. I'll convert it to use a subquery in the VALUES clause.

INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (1,8,3, (SELECT ProductPrice FROM Product WHERE ProductID = 8));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (2,9,5, (SELECT ProductPrice FROM Product WHERE ProductID = 9));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (3,17,3, (SELECT ProductPrice FROM Product WHERE ProductID = 17));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (4,13,2, (SELECT ProductPrice FROM Product WHERE ProductID = 13));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (5,23,4, (SELECT ProductPrice FROM Product WHERE ProductID = 23));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (6,13,4, (SELECT ProductPrice FROM Product WHERE ProductID = 13));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (7,30,4, (SELECT ProductPrice FROM Product WHERE ProductID = 30));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (8,2,5, (SELECT ProductPrice FROM Product WHERE ProductID = 2));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (9,1,4, (SELECT ProductPrice FROM Product WHERE ProductID = 1));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (10,14,1, (SELECT ProductPrice FROM Product WHERE ProductID = 14));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (11,7,4, (SELECT ProductPrice FROM Product WHERE ProductID = 7));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (12,20,4, (SELECT ProductPrice FROM Product WHERE ProductID = 20));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (13,15,3, (SELECT ProductPrice FROM Product WHERE ProductID = 15));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (14,35,3, (SELECT ProductPrice FROM Product WHERE ProductID = 35));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (15,8,3, (SELECT ProductPrice FROM Product WHERE ProductID = 8));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (16,15,2, (SELECT ProductPrice FROM Product WHERE ProductID = 15));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (17,31,2, (SELECT ProductPrice FROM Product WHERE ProductID = 31));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (18,7,3, (SELECT ProductPrice FROM Product WHERE ProductID = 7));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (19,20,3, (SELECT ProductPrice FROM Product WHERE ProductID = 20));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (20,29,4, (SELECT ProductPrice FROM Product WHERE ProductID = 29));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (21,13,2, (SELECT ProductPrice FROM Product WHERE ProductID = 13));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (22,6,2, (SELECT ProductPrice FROM Product WHERE ProductID = 6));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (23,4,4, (SELECT ProductPrice FROM Product WHERE ProductID = 4));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (24,20,5, (SELECT ProductPrice FROM Product WHERE ProductID = 20));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (25,32,2, (SELECT ProductPrice FROM Product WHERE ProductID = 32));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (26,8,4, (SELECT ProductPrice FROM Product WHERE ProductID = 8));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (27,25,3, (SELECT ProductPrice FROM Product WHERE ProductID = 25));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (28,16,3, (SELECT ProductPrice FROM Product WHERE ProductID = 16));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (29,2,3, (SELECT ProductPrice FROM Product WHERE ProductID = 2));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (30,21,5, (SELECT ProductPrice FROM Product WHERE ProductID = 21));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (31,27,4, (SELECT ProductPrice FROM Product WHERE ProductID = 27));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (32,6,1, (SELECT ProductPrice FROM Product WHERE ProductID = 6));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (33,16,5, (SELECT ProductPrice FROM Product WHERE ProductID = 16));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (34,35,3, (SELECT ProductPrice FROM Product WHERE ProductID = 35));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (35,24,3, (SELECT ProductPrice FROM Product WHERE ProductID = 24));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (36,18,3, (SELECT ProductPrice FROM Product WHERE ProductID = 18));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (37,1,4, (SELECT ProductPrice FROM Product WHERE ProductID = 1));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (38,33,5, (SELECT ProductPrice FROM Product WHERE ProductID = 33));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (39,25,2, (SELECT ProductPrice FROM Product WHERE ProductID = 25));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (40,23,4, (SELECT ProductPrice FROM Product WHERE ProductID = 23));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (41,37,1, (SELECT ProductPrice FROM Product WHERE ProductID = 37));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (42,28,5, (SELECT ProductPrice FROM Product WHERE ProductID = 28));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (43,13,4, (SELECT ProductPrice FROM Product WHERE ProductID = 13));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (44,29,2, (SELECT ProductPrice FROM Product WHERE ProductID = 29));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (45,36,4, (SELECT ProductPrice FROM Product WHERE ProductID = 36));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (46,18,5, (SELECT ProductPrice FROM Product WHERE ProductID = 18));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (47,2,4, (SELECT ProductPrice FROM Product WHERE ProductID = 2));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (48,38,3, (SELECT ProductPrice FROM Product WHERE ProductID = 39)); -- Note: Original had ProductID = 39, assuming it's a typo and should be 38 or 39 exists. Using 39 as per original.
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (49,3,1, (SELECT ProductPrice FROM Product WHERE ProductID = 3));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,35,1, (SELECT ProductPrice FROM Product WHERE ProductID = 35));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (3,30,2, (SELECT ProductPrice FROM Product WHERE ProductID = 30));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (39,11,4, (SELECT ProductPrice FROM Product WHERE ProductID = 11));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,28,4, (SELECT ProductPrice FROM Product WHERE ProductID = 28));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (40,18,5, (SELECT ProductPrice FROM Product WHERE ProductID = 18));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (39,38,1, (SELECT ProductPrice FROM Product WHERE ProductID = 38));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (4,27,1, (SELECT ProductPrice FROM Product WHERE ProductID = 27));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (39,30,2, (SELECT ProductPrice FROM Product WHERE ProductID = 30));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (27,22,5, (SELECT ProductPrice FROM Product WHERE ProductID = 22));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (25,5,3, (SELECT ProductPrice FROM Product WHERE ProductID = 5));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (33,12,2, (SELECT ProductPrice FROM Product WHERE ProductID = 12));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (28,35,2, (SELECT ProductPrice FROM Product WHERE ProductID = 35));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,18,5, (SELECT ProductPrice FROM Product WHERE ProductID = 18));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (23,31,2, (SELECT ProductPrice FROM Product WHERE ProductID = 31));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (46,24,4, (SELECT ProductPrice FROM Product WHERE ProductID = 24));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (24,27,5, (SELECT ProductPrice FROM Product WHERE ProductID = 27));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,24,2, (SELECT ProductPrice FROM Product WHERE ProductID = 24));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (17,26,3, (SELECT ProductPrice FROM Product WHERE ProductID = 26));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (17,36,1, (SELECT ProductPrice FROM Product WHERE ProductID = 36));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (10,35,3, (SELECT ProductPrice FROM Product WHERE ProductID = 35));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (9,16,2, (SELECT ProductPrice FROM Product WHERE ProductID = 16));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (22,12,2, (SELECT ProductPrice FROM Product WHERE ProductID = 12));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (29,14,2, (SELECT ProductPrice FROM Product WHERE ProductID = 14));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (25,20,4, (SELECT ProductPrice FROM Product WHERE ProductID = 20));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (45,8,4, (SELECT ProductPrice FROM Product WHERE ProductID = 8));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (8,36,5, (SELECT ProductPrice FROM Product WHERE ProductID = 36));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (45,20,1, (SELECT ProductPrice FROM Product WHERE ProductID = 20));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (25,36,3, (SELECT ProductPrice FROM Product WHERE ProductID = 36));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (32,7,2, (SELECT ProductPrice FROM Product WHERE ProductID = 7));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (49,33,2, (SELECT ProductPrice FROM Product WHERE ProductID = 33));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (30,9,5, (SELECT ProductPrice FROM Product WHERE ProductID = 9));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (20,15,2, (SELECT ProductPrice FROM Product WHERE ProductID = 15));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (16,38,3, (SELECT ProductPrice FROM Product WHERE ProductID = 38));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (17,17,5, (SELECT ProductPrice FROM Product WHERE ProductID = 17));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (6,29,3, (SELECT ProductPrice FROM Product WHERE ProductID = 29));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (25,19,3, (SELECT ProductPrice FROM Product WHERE ProductID = 19));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,33,1, (SELECT ProductPrice FROM Product WHERE ProductID = 33));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (20,10,2, (SELECT ProductPrice FROM Product WHERE ProductID = 10));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (25,16,4, (SELECT ProductPrice FROM Product WHERE ProductID = 16));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (6,31,4, (SELECT ProductPrice FROM Product WHERE ProductID = 31));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (26,1,3, (SELECT ProductPrice FROM Product WHERE ProductID = 1));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (14,1,5, (SELECT ProductPrice FROM Product WHERE ProductID = 1));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (42,38,3, (SELECT ProductPrice FROM Product WHERE ProductID = 38));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (49,14,5, (SELECT ProductPrice FROM Product WHERE ProductID = 14));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (4,14,3, (SELECT ProductPrice FROM Product WHERE ProductID = 14));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (9,6,2, (SELECT ProductPrice FROM Product WHERE ProductID = 6));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (35,2,1, (SELECT ProductPrice FROM Product WHERE ProductID = 1));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,4,5, (SELECT ProductPrice FROM Product WHERE ProductID = 4));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,2,2, (SELECT ProductPrice FROM Product WHERE ProductID = 2));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (45,21,5, (SELECT ProductPrice FROM Product WHERE ProductID = 21));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (9,24,1, (SELECT ProductPrice FROM Product WHERE ProductID = 24));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (21,28,5, (SELECT ProductPrice FROM Product WHERE ProductID = 28));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (36,13,5, (SELECT ProductPrice FROM Product WHERE ProductID = 13));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (26,23,4, (SELECT ProductPrice FROM Product WHERE ProductID = 23));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (25,14,1, (SELECT ProductPrice FROM Product WHERE ProductID = 14));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (45,14,2, (SELECT ProductPrice FROM Product WHERE ProductID = 14));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (16,29,2, (SELECT ProductPrice FROM Product WHERE ProductID = 29));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (39,12,3, (SELECT ProductPrice FROM Product WHERE ProductID = 12));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (6,26,3, (SELECT ProductPrice FROM Product WHERE ProductID = 26));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,25,2, (SELECT ProductPrice FROM Product WHERE ProductID = 25));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (23,28,5, (SELECT ProductPrice FROM Product WHERE ProductID = 28));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (37,26,4, (SELECT ProductPrice FROM Product WHERE ProductID = 26));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (33,26,4, (SELECT ProductPrice FROM Product WHERE ProductID = 26));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (43,29,3, (SELECT ProductPrice FROM Product WHERE ProductID = 29));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (22,23,1, (SELECT ProductPrice FROM Product WHERE ProductID = 23));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,19,3, (SELECT ProductPrice FROM Product WHERE ProductID = 19));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (35,37,1, (SELECT ProductPrice FROM Product WHERE ProductID = 37));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (40,35,3, (SELECT ProductPrice FROM Product WHERE ProductID = 35));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (17,23,3, (SELECT ProductPrice FROM Product WHERE ProductID = 23));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (3,31,2, (SELECT ProductPrice FROM Product WHERE ProductID = 31));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (34,13,4, (SELECT ProductPrice FROM Product WHERE ProductID = 13));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (44,21,1, (SELECT ProductPrice FROM Product WHERE ProductID = 21));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (15,29,4, (SELECT ProductPrice FROM Product WHERE ProductID = 29));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (35,9,2, (SELECT ProductPrice FROM Product WHERE ProductID = 9));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (50,26,3, (SELECT ProductPrice FROM Product WHERE ProductID = 26));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (36,33,2, (SELECT ProductPrice FROM Product WHERE ProductID = 33));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (9,10,1, (SELECT ProductPrice FROM Product WHERE ProductID = 10));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (35,1,2, (SELECT ProductPrice FROM Product WHERE ProductID = 1));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (41,9,4, (SELECT ProductPrice FROM Product WHERE ProductID = 9));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (3,14,2, (SELECT ProductPrice FROM Product WHERE ProductID = 14));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (44,16,4, (SELECT ProductPrice FROM Product WHERE ProductID = 16));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (22,15,1, (SELECT ProductPrice FROM Product WHERE ProductID = 15));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (2,30,3, (SELECT ProductPrice FROM Product WHERE ProductID = 30));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (38,5,4, (SELECT ProductPrice FROM Product WHERE ProductID = 5));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (36,30,5, (SELECT ProductPrice FROM Product WHERE ProductID = 30));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (13,34,4, (SELECT ProductPrice FROM Product WHERE ProductID = 34));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (38,10,4, (SELECT ProductPrice FROM Product WHERE ProductID = 10));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (26,3,5, (SELECT ProductPrice FROM Product WHERE ProductID = 3));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (16,7,5, (SELECT ProductPrice FROM Product WHERE ProductID = 7));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (17,18,1, (SELECT ProductPrice FROM Product WHERE ProductID = 17));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (20,16,2, (SELECT ProductPrice FROM Product WHERE ProductID = 16));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (42,14,5, (SELECT ProductPrice FROM Product WHERE ProductID = 14));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (15,25,3, (SELECT ProductPrice FROM Product WHERE ProductID = 25));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (5,12,4, (SELECT ProductPrice FROM Product WHERE ProductID = 12));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (8,31,3, (SELECT ProductPrice FROM Product WHERE ProductID = 31));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (13,17,5, (SELECT ProductPrice FROM Product WHERE ProductID = 17));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (18,12,3, (SELECT ProductPrice FROM Product WHERE ProductID = 12));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (12,34,2, (SELECT ProductPrice FROM Product WHERE ProductID = 34));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (17,30,2, (SELECT ProductPrice FROM Product WHERE ProductID = 30));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (10,29,1, (SELECT ProductPrice FROM Product WHERE ProductID = 29));
INSERT INTO OrdersProduct (OrderID, ProductID, Quantity, Price) VALUES (17,7,4, (SELECT ProductPrice FROM Product WHERE ProductID = 7));

-- Payments (Dates converted to YYYY-MM-DD HH:MM:SS)
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (44.85, '2016-02-27 00:00:00',2,1,1);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (94.22, '2016-01-16 00:00:00',3,2,2);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (20, '2016-07-19 00:00:00',2,3,3);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (47.6, '2016-07-12 00:00:00',2,4,4);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (115.2, '2016-05-20 00:00:00',2,5,5);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (182.6, '2016-07-14 00:00:00',3,6,6);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (95.96, '2016-05-19 00:00:00',1,7,7);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (117.15, '2016-09-03 00:00:00',1,8,8);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (50, '2016-11-28 00:00:00',3,9,9);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (134.32, '2016-01-18 00:00:00',1,10,10);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (39.34, '2016-11-22 00:00:00',3,11,11);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (79.2, '2016-08-06 00:00:00',2,12,12);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (20.8, '2016-02-12 00:00:00',3,13,13);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (148.22, '2016-03-29 00:00:00',1,14,14);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (34.4, '2016-08-26 00:00:00',2,15,15);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (25, '2016-03-07 00:00:00',2,16,16);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (100, '2016-07-04 00:00:00',3,17,17);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (50, '2016-08-07 00:00:00',1,18,18);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (23.55, '2016-05-02 00:00:00',1,19,19);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (95.7, '2016-11-27 00:00:00',1,20,20);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (74.85, '2016-02-26 00:00:00',3,21,21);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (30, '2016-08-14 00:00:00',2,22,22);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (113.35, '2016-12-11 00:00:00',2,23,23);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (136.75, '2016-05-08 00:00:00',1,24,24);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (50,'2016-03-11 00:00:00',3,25,25);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (205.73,'2016-07-12 00:00:00',3,17,17);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (9.7,'2016-08-13 00:00:00',1,18,18);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (86.75,'2016-03-20 00:00:00',3,25,25);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (66.95,'2016-12-06 00:00:00',3,9,9);
INSERT INTO Payment (PaymentAmount, PaymentDate, PaymentTypeID, OrderID, CustomerID) VALUES (73.63,'2016-07-24 00:00:00',2,3,3);

-- Update OrdersProduct sub-total
UPDATE OrdersProduct SET SubTotal = Quantity * Price;

-- Update Orders total
UPDATE Orders SET OrderTotal = ( SELECT SUM(OrdersProduct.SubTotal) FROM OrdersProduct WHERE Orders.OrderID = OrdersProduct.OrderID);
`;