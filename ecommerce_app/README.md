Write an e-commerce app that has the following endpoint

a. "/auth/register" POST endpoint that accepts full name, email, password and role. Role can be either "admin" or "customer".

b. "/auth/login" POST endpoint that allows the user to login. Note: Your JWT should have userId, email and role.

c. "/products" GET endpoint to get list of products.

d. "/products" POST endpoint add a product. The product should have a "productName", "ownerId", "cost", "productImages" (array of image links), "description" and "stockStatus". The ownerId will hold the ID of the admin that posted the product.

e. "/products/:id" DELETE endpoint.

 

Note: The product POST and product DELETE endpoints should only be accessible by the admin while the GET endpoint should be accessed by anybody.

Also, use MongoDB to store and retrieve data.



In your E-commerce add/update the following route

1. Create a "Brand" collection that should contain a "brandName" property.

2. Create a POST /brands which admins can use to add brands

3. PUT /brands which is used to update a brand

4. GET /brands which will list all brands previously added

5. DELETE /brands which will be used to delete a brand.

6. Update your product model to have a "brand" property. The brand property type should be an Object ID and should reference the brands collections.

7. GET /products/:brand/:page/:limit which will be a paginated list of your product brand. Remember to populate the brand property when querying the database for paginated brands. Use "mongoose-paginate-v2" package for pagination.



ALSO,
 Create an POST /order which only customers can use to create an order. This endpoint should accept an array of object and each object should contain the following fields:

- productName
- productId

- ownerId
- quantity,
- totalCost,
- shippingStatus

- The admin should have an endpoint to view orders, view an order and change an order status.

Values for shipping status are be:
- "pending"
- "shipped"
- "delivered"