module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    // Create a new Customer
    app.post("/AddVehicule", customers.create);
  
    // Retrieve all Customers
    app.get("/ListVehicule", customers.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/ListVehicule/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    app.put("/ListVehicule/:customerId", customers.update);
  
    // Delete a Customer with customerId
    app.delete("/ListVehicule/:customerId", customers.delete);
  
    // Create a new Customer
    app.delete("/ListVehicule", customers.deleteAll);
  };
  