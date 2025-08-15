const express = require("express");
const InitialLoadRouter =  express.Router();
const SalesPeopleService = require("../../DbServices/SalesPeopleService");
const SalesService = require("../../DbServices/SalesService");
const TeamsService = require("../../DbServices/TeamsService");

InitialLoadRouter
    .route("/load")
    .get((req, res)=>{
        const database = req.app.get("db");

        SalesPeopleService.getAllSalesPeople(database)
            .then( people => {
                SalesService.getAllsales(database)
                    .then( salesData => {
                         TeamsService.getAllTeams(database)
                            .then( teams => {

                                return res.status(200).json({
                                    people,
                                    salesData,
                                    teams
                                });
                            });
                    });
            })
    });

module.exports = InitialLoadRouter;