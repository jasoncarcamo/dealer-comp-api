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
            date,
            sales
        } = req.body;
        
        const createSale = {
            date,
            sales
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

        SalesService.getSaleById(database, id)
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
            sales: req.body.sales,
            date: req.body.date,
        };

        patchSale.id = id;

        SalesService.getSaleById(database, id)
            .then( sale => {
                if(sale.length === 0){
                    return res.status(404).json({
                        error: "Sale not found"
                    });
                };
                console.log("Line 87", patchSale)
                SalesService.patchSaleById(database, patchSale, id)
                    .then( patchedSale => {
                        console.log("Line 92", patchedSale)
                        return res.status(200).json(patchSale);
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

                SalesService.deleteSaleById(database, id)
                    .then( deletedSale => {
                        return deletedSale;
                    } );
            });
    });

module.exports = SalesRouter;