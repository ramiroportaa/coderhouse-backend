import usersService from "../services/users.service.js";
import WSresponse from "../libs/WSresponse.js";
import logger from "../utils/logger.js";

const getById = async (req, res)=>{
    try {
        const idUser = req.params.id;
        const data = await usersService.getById(idUser);
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const getByEmail = async (req, res)=>{
    try {
        const email = req.params.email;
        const data = await usersService.getByEmail(email);
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const registerUser = async (req, res)=>{
    try {
        const newUser = req.body;
    
        await usersService.registerUser(newUser);

        //res.status(201).json(new WSresponse(data, "success"));     
        res.redirect("/login");
        
    } catch (error) {
        // res.status(error.status).json(new WSresponse(null, error.message, true));
        if (error.status == 403) res.render("error.ejs", {error: error.message});
        logger.warn(error);
    }
};

const updateById = async (req, res)=>{
    try {
        const idUser = req.params.id;
        const newDataObj = req.body;
        await usersService.updateById(idUser, newDataObj);
        res.status(201).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

export default {
    getByEmail,
    getById,
    registerUser,
    updateById
}