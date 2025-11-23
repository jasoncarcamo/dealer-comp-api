const BonusServices = {
    getAllbonuses(db){
        return db.select("*").from("bonuses");
    },
    getBonusById(db, id){
        return db.select("*").from("bonuses").where({id}).first();
    },
    createBonus(db, newBonus){
        return db.insert(newBonus).into("bonuses").returning("*").then(([createdBonus]) => createdBonus);
    },
    patchBonusById(db, patchBonus, id){
        return db.update(patchBonus).from("bonuses").where({id}).returning("*").then(([updatedBonus]) => updatedBonus);
    },
    deleteBonusById(db, id){
        return db.delete().from("bonuses").where({id}).returning("*").then(([deletedBonus]) => deletedBonus);
    }
};

module.exports = BonusServices;