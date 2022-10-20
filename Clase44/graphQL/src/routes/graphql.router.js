//Como valido una mutation o query que solo pueda hacerla un admin o un user logueado?
// router.use(adminAuth) ???

import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import graphql from "../graphql/graphql.js";

const router = Router();

router.use("/", graphqlHTTP(graphql.graphqlOptions));


export default router;