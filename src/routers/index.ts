import * as express from "express";

import covid from "../covid/router";
import cors from "../middleware/cors";

const router = express.Router();

router.use(cors);
router.use("api/v1/on-covid-19", covid);

export default router;
