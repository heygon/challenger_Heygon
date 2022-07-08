const { Client } = require('pg');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? 'env.test' : '.env'
})

const connectionString = process.env.PG_CON;
const client = new Client({
    connectionString,
})

client.connect();

// Create Products table
let createTableProduto = "CREATE TABLE IF NOT EXISTS Products (";
createTableProduto += "id SERIAL,";
createTableProduto += "name varchar(250) NOT NULL,";
createTableProduto += "description text NOT NULL,";
createTableProduto += "price varchar(50) NOT NULL,";
createTableProduto += "images varchar(250),";
createTableProduto += "published_at varchar(50) NOT NULL,";
createTableProduto += "status varchar(2) NOT NULL,";
createTableProduto += "PRIMARY KEY (id)";
createTableProduto += ")";

client.query(createTableProduto)

// Create Clients table
let createTableClients = "CREATE TABLE IF NOT EXISTS Clients (";
createTableClients += "id SERIAL,";
createTableClients += "name varchar(250) NOT NULL,";
createTableClients += "email varchar(250) NOT NULL,";
createTableClients += "pass varchar(250) NOT NULL,";
createTableClients += "avatar varchar(250),";
createTableClients += "create_at varchar(50) NOT NULL,";
createTableClients += "token varchar(250),";
createTableClients += "status varchar(2) NOT NULL,";
createTableClients += "PRIMARY KEY (id)";
createTableClients += ")";

client.query(createTableClients)

// Create Sales table
let createTableSales = "CREATE TABLE IF NOT EXISTS Sales (";
createTableSales += "id SERIAL,";
createTableSales += "id_product varchar(250) NOT NULL,";
createTableSales += "id_client varchar(250) NOT NULL,";
createTableSales += "products varchar(250) NOT NULL,";
createTableSales += "total_price varchar(250) NOT NULL,";
createTableSales += "payment_method varchar(50) NOT NULL,";
createTableSales += "create_at varchar(50) NOT NULL,";
createTableSales += "status varchar(2) NOT NULL,";
createTableSales += "PRIMARY KEY (id)";
createTableSales += ")";

client.query(createTableProduto)



module.exports = client;

