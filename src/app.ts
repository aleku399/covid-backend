import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as morganLogger from "morgan";
// import * as helmet from "helmet";
import * as xml from "xml";
import covid19ImpactEstimator from "./covid/estimator";
import estimatedData from "./covid/estimator/estimatedData";
import cors from "./middleware/cors";
import routers from "./routers";

const app = express();

const port = 4001;

app.set("trust proxy", "loopback");
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
// app.use(helmet());
app.use(morganLogger("dev"));

app.use(routers);

app.get("/api/v1/on-covid-19/json", (_req, res) => {
  return res.json({data: estimatedData});
});

app.get("/api/v1/on-covid-19/xml", (_req, res) => {
  return res.send(xml(estimatedData));
});

app.post("/api/v1/on-covid-19", (req, res, next) => {
  return covid19ImpactEstimator(req.body)
    .then(data => res.json({ data }))
    .catch(next);
});

app.listen(port, () => {
  console.info(`Listening on http://localhost:${port}. Press CTRL-C to stop\n`);
});
