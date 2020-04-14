import { Router } from "express";
import * as xml from "xml";
import covid19ImpactEstimator from "./estimator";
import estimatedData from "./estimator/estimatedData";

const router = Router();

router.get("/", (_req, res) => {
  console.log("router", estimatedData);
  return res.json({data: estimatedData});
});

router.get("/xml", (_req, res) => {
  return res.send(xml( estimatedData));
});

router.post("/", (req, res, next) => {
  return covid19ImpactEstimator(req.body)
    .then(data => res.json({ data }))
    .catch(next);
});

export default router;
