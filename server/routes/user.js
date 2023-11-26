const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router
    .route("/login")
    .get((req, res) => {
        return res.render("login");
    })
    .post(async (req, res) => {
        const { email, password } = req.body;
        try {
            const token = await User.matchPasswordAndGenerateToken(email, password);

            return res.cookie("token", token).redirect("/");
        } catch (error) {
            return res.render("login", {
                error: "Incorrect email or password"
            } );
        }
    })


router
    .route("/signup")
    .get((req, res) => {
        return res.render("signup");
    })
    .post(async (req, res) => {
        const { fullName, email, password } = req.body;
        await User.create({
            fullName,
            email,
            password,
        })
        return res.redirect("/");
    });


router.get(("/logout"),(req,res)=>{
        res.clearCookie("token").redirect("/");
    })

module.exports = router;