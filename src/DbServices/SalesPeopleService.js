const SalesPeopleService = {
    getAllSalesPeople(db){
        return db.select("*").from("salespeople");
    },
    getSalesPeopleByEmail(db, email){
        return db.select("*").from("salespeople").where({email}).first();
    },
    getSalesPeopleById(db, id){
        return db.select("*").from("salespeople").where({id}).first();
    },
    createSalesPerson(db, newSalesPeople){
        return db.insert(newSalesPeople).into("salespeople").returning("*").then(([createdSalesPeople]) => createdSalesPeople);
    },
    patchSalesPeople(db, patchSalesPeople, id){
        return db.update(patchSalesPeople).from("salespeople").where({id}).returning("*").then(([updatedSalesPeople]) => updatedSalesPeople);
    },
    deleteSalesPersonById(db, id){
        return db.delete().from("salespeople").where({id}).returning("*").then(([deletedPerson]) => deletedPerson);
    }
};

module.exports = SalesPeopleService;