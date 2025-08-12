const express = require("express");
const OrdersRouter =  express.Router();
const SalesPeopleService = require("../../services/SalesPeopleService/SalesPeopleService");
const {requireAuth} = require("../../middleware/jwtAuth");

OrdersRouter
    .route("/salespeople")
    .get(requireAuth, (req, res)=>{
        const database = req.app.get("db");

        SalesPeopleService.getAllSalesPeople(database)
            .then( orders => {
                if(orders.length){
                    return res.status(404).json({
                        error: "There are no sales people"
                    });
                };

                return res.status(200).json({
                    orders
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
        
        SalesPeopleService.createSalesPeople(database, newSalesPerson)
            .then( createdPerson => {
                return res.status(200).json({
                    createdPerson
                });
            });
    });