const express = require("express");
const BonusRouter =  express.Router();
const BonusServices = require("../../DbServices/BonusServices");

BonusRouter
    .route("/bonuses")
    .get((req, res)=>{
        const database = req.app.get("db");

        BonusServices.getAllbonuses(database)
            .then( bonuses => {
                if(bonuses.length === 0){
                    return res.status(404).json({
                        error: "There are no bonuses"
                    });
                };

                return res.status(200).json({
                    bonuses
                });
            });
    })
    .post((req, res)=>{
        const database = req.app.get("db");
        const newBonus = {
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            amount: req.body.amount,
            criteria: req.body.criteria
        };

        for(const [key, value] of Object.entries(newBonus)){
            if(value === undefined){
                return res.status(400).json({
                    error: `${key} is missing`
                });
            };
        };
        
        BonusServices.createBonus(database, newBonus)
            .then( createdBonus => {
                return res.status(200).json({createdBonus});
            });
    });

BonusRouter
    .route("/bonuses/:id")
    .get((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        BonusServices.getBonusById(database, id)
            .then( bonus => {
                if(!bonus){
                    return res.status(404).json({
                        error: "Bonus not found"
                    });
                };

                return res.status(200).json({bonus});
            });
    })
    .patch((req, res) => {
        const database = req.app.get("db");
        const id = req.params.id;
        const patchBonus = {
            start_date: req.bofy.start_date,
            end_date: req.body.end_date,
            amount: req.body.amount,
            criteria: req.body.criteria
        };

        BonusServices.getBonusById(database, id)
            .then( bonus => {
                if(bonus.length === 0){
                    return res.status(404).json({
                        error: "Bonus not found"
                    });
                };
               
                BonusServices.patchBonusById(database, patchBonus, id)
                    .then( patchedBonus => {
                        return res.status(200).json(patchedBonus);
                    } );
            });
    })
    .delete((req,res) => {
        const database = req.app.get("db");
        const id = req.params.id;

        BonusServices.getBonusById(database, id)
            .then( bonus => {
                if(!bonus){
                    return res.status(404).json({
                        error: "Bonus not found"
                    });
                };

                BonusServices.deleteSaleById(database, id)
                    .then( deletedBonus => {deletedBonus} );
            });
    });

module.exports = BonusRouter;