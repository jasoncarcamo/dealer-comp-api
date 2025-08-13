const express = require('express');
const LogInRouter = express.Router();
const TokenService = require("../../securityService/TokenService");
const PasswordHasher = require('../../securityService/PasswordHasher');
const SalesPeopleService = require("../../DbServices/SalesPeopleService");

LogInRouter
    .route("/login")
    .post((req, res)=>{
        const {
            email,
            password
        } = req.body;


        const customer = {
            email,
            password
        };
        const database = req.app.get("db");

        for(const [key, value] of Object.entries(customer)){
            if(!value){
                return res.status(400).json({
                    error: `Missing ${key}`
                });
            };
        };

        SalesPeopleService.getCustomerByEmail(database, customer.email)
            .then( dbCustomer => {
                
                if(!dbCustomer){
                    return res.status(404).json({
                        error: `${customer.email} not found`
                    });
                };

                PasswordHasher.comparePassword(customer.password, dbCustomer.password)
                    .then( passwordMatches => {

                        if(!passwordMatches){
                            return res.status(400).json({
                                error: `Incorrect password`
                            });
                        };

                        delete dbCustomer.password;

                        const subject = dbCustomer.email;
                        const payload = {
                            user: dbCustomer.email,
                            type: "customer"
                        };

                        return res.status(200).json({
                            token: TokenService.createToken(subject, payload),
                            customer:  dbCustomer
                        });
                    });
            });

    });

module.exports = LogInRouter;