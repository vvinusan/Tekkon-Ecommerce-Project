# Backend

# Tekkon Wearable E-Commerce Site

## Error Endpoint

| endpoint | method | Description     |
| -------- | ------ | --------------- |
| `*`      | `GET`  | Error Catch All |

## Companies Endpoints

| endpoint              | method | Description             |
| --------------------- | ------ | ----------------------- |
| `/companies`          | `GET`  | Retrieves all companies |
| `/company/:companyId` | `GET`  | Retrieves company by id |

## Items Endpoints

| endpoint          | method  | Description                      |
| ----------------- | ------- | -------------------------------- |
| `/items`          | `GET`   | Retrieves all items              |
| `/item/:id`       | `GET`   | Retrieves item by id             |
| `/item/:category` | `GET`   | Retrieves item by category       |
| `/item/:itemId`   | `PATCH` | Updates item's stock in database |

## Cart Endpoints

| endpoint                  | method   | Description               |
| ------------------------- | -------- | ------------------------- |
| `/cart`                   | `GET`    | Retrieves entire cart     |
| `/updateCart`             | `POST`   | Update entire cart        |
| `/addCart`                | `POST`   | Add item to cart          |
| `/deleteCart`             | `DELETE` | Delete entire cart        |
| `/deleteCart/:cartItemId` | `DELETE` | Delete item in cart by id |
