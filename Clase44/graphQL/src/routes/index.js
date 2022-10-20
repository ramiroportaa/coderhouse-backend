import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import adminRouter from "./admin.router.js";
import tiendaRouter from "./tienda.router.js";
import loginRouter from "./login.router.js";
import logoutRouter from "./logout.router.js";
import registerRouter from "./register.router.js";
import { Router } from "express";
import { generalError, notFound } from "../middlewares/index.js";
import graphqlRouter from "./graphql.router.js";

const router = Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

router.use("/admin", adminRouter);
router.use("/tienda", tiendaRouter);

router.use("/api/productos", productsRouter);
router.use("/api/carrito", cartsRouter);
router.use("/api/user", usersRouter);

router.use("/api/graphql", graphqlRouter);

//Mid rutas no implementadas.
router.use(notFound);

//Mid de manejo de errores generales.
router.use(generalError);

export default router;
