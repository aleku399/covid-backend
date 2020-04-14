import * as Promise from "bluebird";

import getExpectedData, { Data, Estimator } from "./impact";
export interface EstimatedData {
  data: Data;
  impact: Estimator;
  severeImpact: Estimator;
}

function covid19ImpactEstimator(data: Data): Promise<EstimatedData>  {
  return Promise.resolve({
    data,
    impact: getExpectedData(data, 10),
    severeImpact: getExpectedData(data, 50)
  });
}

export default covid19ImpactEstimator;
