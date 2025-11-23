const express = require("express");
const Teams =  express.Router();
const TeamsService = require("../../DbServices/TeamsService");

Teams
    .route("/teams")
    .get((req, res)=>{
        const database = req.app.get("db");

        TeamsService.getAllTeams(database)
            .then( teams => {
                if(teams.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                return res.status(200).json(teams);
            });
    })
    .post((req, res)=>{
        const database = req.app.get("db");

        const {
            name,
            color,
            members,
            date
        } = req.body;
        
        const createTeam = {
            name,
            color,
            members,
            date
        }

        for(const [key, value] of Object.entries(createTeam)){
            if(value === undefined){
                return res.status(400).json({
                    error: `${key.split("_").join(" ")} can only have a value or be null`
                });
            };
        };
        
        TeamsService.createTeam(database, createTeam)
            .then( createdTeam => {
                return res.status(200).json(createdTeam);
            });
    });

Teams
    .route("/teams/:id")
    .get((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        TeamsService.getAllTeamById(database, id)
            .then( team => {
                if(team.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                return res.status(200).json({
                    team
                });
            });
    })
    .patch((req, res) => {
        const database = req.app.get("db");
        const id = req.params.id;
        const patchTeam = {
            name: req.body.name,
            color: req.body.color,
            members: req.body.members
        };

        TeamsService.getTeamById(database, id)
            .then( team => {
                if(team.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                TeamsService.patchTeamById(database, patchTeam, id)
                    .then( patchedTeam => {
                        return res.status(200).json(patchedTeam);
                    } );
            });
    })
    .delete((req,res) => {
        const database = req.app.get("db");
        const id = req.params.id;

        TeamsService.getTeamById(database, id)
            .then( team => {
                if(team.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                TeamsService.deleteTeamById(database, id)
                    .then( deletedTeam => {
                        return res.status(200).json(deletedTeam)
                    } );
            });
    });

module.exports = Teams;