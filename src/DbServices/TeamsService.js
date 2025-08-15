const TeamsService = {
    getAllTeams(db){
        return db.select("*").from("teams");
    },
    getAllTeamsById(db, id){
        return db.select("*").from("teams").where({id});
    },
    getTeamById(db, id){
        return db.select("*").from("teams").where({id}).first();
    },
    createTeam(db, newTeam){
        return db.insert(newTeam).into("teams").returning("*").then(([createdTeam]) => createdTeam);
    },
    patchTeamById(db, patchTeam, id){
        return db.update(patchTeam).from("teams").where({id}).returning("*").then(([updatedTeam]) => updatedTeam);
    },
    deleteTeamById(db, id){
        return db.delete().from("teams").where({id}).returning("*").then(([deletedTeam]) => deletedTeam);
    }
};

module.exports = TeamsService;