const express = require("express");
const SalesRouter =  express.Router();
const SalesService = require("../../DbServices/SalesService");

SalesRouter
    .route("/salespeople")
    .get((req, res)=>{
        const database = req.app.get("db");

        SalesService.getAllSalesPeople(database)
            .then( salesPeaple => {
                if(salesPeaple.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                return res.status(200).json({
                    salesPeaple
                });
            });
    })
    .post((req, res)=>{
        const database = req.app.get("db");

        const {
            name,
            cars_sold
        } = req.body;
        
        const newSalesPerson = {
            name,
            cars_sold
        }

        for(const [key, value] of Object.entries(newSalesPerson)){
            if(value === undefined){
                console.log("error:", key, value)
                return res.status(400).json({
                    error: `${key.split("_").join(" ")} can only have a value or be null`
                });
            };
        };
        
        SalesService.createSalesPerson(database, newSalesPerson)
            .then( createdPerson => {
                return res.status(200).json({
                    createdPerson
                });
            });
    });

SalesRouter
    .route("/salespeople/:id")
    .get((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        SalesService.getSalesPeopleById(database, id)
            .then( salesPerson => {
                if(salesPerson.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                return res.status(200).json({
                    salesPerson
                });
            });
    })
    .patch((req, res) => {
        const database = req.app.get("db");
        const id = req.params.id;
        const patchSalesPerson = {
            name: req.body.name,
            cars_sold: req.body.cars_sold
        };

        SalesService.getSalesPeopleById(database, id)
            .then( salesPerson => {
                if(salesPerson.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                SalesService.patchSalesPeople(database, patchSalesPerson, id)
                    .then( patchedSalesPerson => {
                        return patchedSalesPerson;
                    } );
            });
    })
    .delete((req,res) => {
        const database = req.app.get("db");
        const id = req.params.id;

        SalesService.getSalesPeopleById(database, id)
            .then( salesPerson => {
                if(salesPerson.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                SalesService.deleteSalesPersonById(database, id)
                    .then( patchedSalesPerson => {
                        return patchedSalesPerson;
                    } );
            });
    });

module.exports = SalesRouter;