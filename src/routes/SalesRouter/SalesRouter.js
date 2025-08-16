const express = require("express");
const SalesRouter =  express.Router();
const SalesService = require("../../DbServices/SalesService");

SalesRouter
    .route("/sales")
    .get((req, res)=>{
        const database = req.app.get("db");

        SalesService.getAllsales(database)
            .then( salesData => {
                if(salesData.length){
                    return res.status(404).json({
                        error: "There are no sales"
                    });
                };

                return res.status(200).json({
                    salesData
                });
            });
    })
    .post((req, res)=>{
        const database = req.app.get("db");

        const {
            name,
            date,
            team,
            cars_sold
        } = req.body;
        
        const createSale = {
            name,
            date,
            team,
            cars_sold
        };

        for(const [key, value] of Object.entries(createSale)){
            if(value === undefined){
                console.log("error:", key, value)
                return res.status(400).json({
                    error: `${key.split("_").join(" ")} can only have a value or be null`
                });
            };
        };
        
        SalesService.createSale(database, createSale)
            .then( createdSale => {
                return res.status(200).json({
                    createdSale
                });
            });
    });

SalesRouter
    .route("/sales/:id")
    .get((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        SalesService.getAllsalesById(database, id)
            .then( sales => {
                if(sales.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                return res.status(200).json({
                    sales
                });
            });
    })
    .patch((req, res) => {
        const database = req.app.get("db");
        const id = req.params.id;
        const patchSale = {
            name: req.body.name,
            date: req.params.date,
            team: req.params.team,
            cars_sold: req.body.cars_sold
        };

        SalesService.getSaleById(database, id)
            .then( sale => {
                if(sale.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                SalesService.patchSaleById(database, patchSale, id)
                    .then( deletedSale => {
                        return deletedSale;
                    } );
            });
    })
    .delete((req,res) => {
        const database = req.app.get("db");
        const id = req.params.id;

        SalesService.getSalesPeopleById(database, id)
            .then( sale => {
                console.log(sale)
                if(sale.length){
                    return res.status(404).json({
                        error: "Salesperson not found"
                    });
                };

                SalesService.deleteSalesPersonById(database, id)
                    .then( deletedSale => {
                        return deletedSale;
                    } );
            });
    });

module.exports = SalesRouter;