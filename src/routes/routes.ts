import { Router } from "express";
import UserController from "../controllers/User.Controller";
import passport from "passport";
import { validarCadastro } from "../middlewares/validarCadastro";

const router = Router();

router.get("/test", UserController.getUsers);
router.post("/users", UserController.createUser);
router.delete("/users", UserController.deleteUsers);
router.get("/user", passport.authenticate("jwt", { session: false }), UserController.testeAutenticacao);
router.get("/login", UserController.login);

// Rota de cadastro de usuário
router.post("/cadastro", UserController.createUser);

export default router;
