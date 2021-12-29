const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.Id= customer.Id;
  this.Nom_prop = customer.Nom_prop;
  this.GENRE= customer.GENRE;
  this.PATH_PROP=customer.PATH_PROP;
  this.Contact=customer.Contact;
  this.Plaque=customer.Plaque;
  this.Marque=customer.Marque;
  this.PATH_VOITURE=customer.PATH_VOITURE;
  this.Assurance=customer.Assurance;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO vehicule SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM vehicule WHERE Id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM vehicule", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vehicule: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE vehicule SET Nom_prop = ?,GENRE = ?, PATH_PROP = ?,Contact= ? WHERE Id = ?",
    [customer.Nom_prop, customer.GENRE, customer.PATH_PROP,customer.Contact, Id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (Id, result) => {
  sql.query("DELETE FROM vehicule WHERE Id = ?", Id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM vehicule", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;