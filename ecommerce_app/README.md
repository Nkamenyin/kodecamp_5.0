Write an e-commerce app that has the following endpoint

a. "/auth/register" POST endpoint that accepts full name, email, password and role. Role can be either "admin" or "customer".

b. "/auth/login" POST endpoint that allows the user to login. Note: Your JWT should have userId, email and role.

c. "/products" GET endpoint to get list of products.

d. "/products" POST endpoint add a product. The product should have a "productName", "ownerId", "cost", "productImages" (array of image links), "description" and "stockStatus". The ownerId will hold the ID of the admin that posted the product.

e. "/products/:id" DELETE endpoint.

 

Note: The product POST and product DELETE endpoints should only be accessible by the admin while the GET endpoint should be accessed by anybody.

Also, use MongoDB to store and retrieve data.