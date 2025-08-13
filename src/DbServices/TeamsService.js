const TeamsService = {
    getAllTeams(db){
        return db.select("*").from("teams");
    },
    getAllTeamsById(db, customer_id){
        return db.select("*").from("teams").where({customer_id});
    },
    getTeamsByMobileNumber(db, mobile_number){
        return db.select("*").from("teams").where({customer_mobile_number: mobile_number}).returning("*").then(([teams]) => teams);
    },
    getTeamById(db, id){
        return db.select("*").from("teams").where({id}).first();
    },
    createTeam(db, newTeam){
        return db.insert(newTeam).into("teams").returning("*").then(([createdTeam]) => createdTeam);
    },
    updateTeam(db, updateTeam, id){
        return db.update(updateTeam).from("teams").where(id).returning("*").then(([updatedTeam]) => updatedTeam);
    },
    deleteTeam(db, id){
        return db.delete().from("teams").where({id}).returning("*").then(([deletedTeam]) => deletedTeam);
    }
};

module.exports = TeamsService;