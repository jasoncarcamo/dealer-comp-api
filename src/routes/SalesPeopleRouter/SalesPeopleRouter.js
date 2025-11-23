const express = require("express");
const SalesPeopleRouter =  express.Router();
const SalesPeopleService = require("../../DbServices/SalesPeopleService");

SalesPeopleRouter
    .route("/salespeople")
    .get((req, res)=>{
        const database = req.app.get("db");

        SalesPeopleService.getAllSalesPeople(database)
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
                return res.status(400).json({
                    error: `${key.split("_").join(" ")} can only have a value or be null`
                });
            };
        };
        
        SalesPeopleService.createSalesPerson(database, newSalesPerson)
            .then( createdPerson => {
                return res.status(200).json(createdPerson);
            });
    });

SalesPeopleRouter
    .route("/salespeople/:id")
    .get((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        SalesPeopleService.getSalesPeopleById(database, id)
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

        SalesPeopleService.getSalesPeopleById(database, id)
            .then( salesPerson => {
                if(salesPerson.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                SalesPeopleService.patchSalesPeople(database, patchSalesPerson, id)
                    .then( patchedSalesPerson => {
                        return patchedSalesPerson;
                    } );
            });
    })
    .delete((req,res) => {
        const database = req.app.get("db");
        const id = req.params.id;

        SalesPeopleService.getSalesPeopleById(database, id)
            .then( salesPerson => {
                if(salesPerson.length == false){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                SalesPeopleService.deleteSalesPersonById(database, id)
                    .then( deletedPerson => {
                        return res.status(200).json(deletedPerson);
                    } );
            });
    });

module.exports = SalesPeopleRouter;