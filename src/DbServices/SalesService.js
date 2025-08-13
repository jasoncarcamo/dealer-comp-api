const SalesService = {
    getAllsales(db){
        return db.select("*").from("sales");
    },
    getAllsalesById(db, customer_id){
        return db.select("*").from("sales").where({customer_id});
    },
    getsalesByMobileNumber(db, mobile_number){
        return db.select("*").from("sales").where({customer_mobile_number: mobile_number}).returning("*").then(([sales]) => sales);
    },
    getSaleById(db, id){
        return db.select("*").from("sales").where({id}).first();
    },
    createSale(db, newSale){
        return db.insert(newSale).into("sales").returning("*").then(([createdSale]) => createdSale);
    },
    patchSaleById(db, patchSale, id){
        return db.update(patchSale).from("sales").where(id).returning("*").then(([updatedSale]) => updatedSale);
    },
    deleteSaleById(db, id){
        return db.delete().from("sales").where({id}).returning("*").then(([deletedSale]) => deletedSale);
    }
};

module.exports = SalesService;