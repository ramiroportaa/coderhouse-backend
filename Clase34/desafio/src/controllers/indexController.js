const getIndex = (req, res)=>{
    res.render("index.ejs", {name: req.user.username, email: req.user.email })
}

export default {getIndex};