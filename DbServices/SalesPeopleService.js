const SalesPeopleService = {
    getSalesPeopleByEmail(db, email){
        return db.select("*").from("salespeople").where({email}).first();
    },
    getSalesPeopleById(db, id){
        return db.select("*").from("salespeople").where({id}).first();
    },
    createSalesPeople(db, newSalesPeople){
        return db.insert(newSalesPeople).into("salespeople").returning("*").then(([createdSalesPeople]) => createdSalesPeople);
    },
    updateSalesPeople(db, updatedSalesPeople, id){
        return db.update(updatedSalesPeople).from("salespeople").where({id}).returning("*").then(([updatedSalesPeople]) => updatedSalesPeople);
    },
    deleteSalesPeople(db, id){
        return db.delete().from("salespeople").where(id);
    }
};

module.exports = SalesPeopleService;