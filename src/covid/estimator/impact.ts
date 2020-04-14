import getDays from "./normalise";

export interface Region {
  name: string;
  avgAge?: number;
  avgDailyIncomeInUSD: number;
  avgDailyIncomePopulation: number;
}

export interface Data {
  region: Region;
  periodType: string;
  timeToElapse: number;
  reportedCases: number;
  population: number;
  totalHospitalBeds: number;
}

export interface Estimator {
  currentlyInfected: number;
  infectionsByRequestedTime: number;
  severeCasesByRequestedTime: number;
  hospitalBedsByRequestedTime: number;
  casesForICUByRequestedTime: number;
  casesForVentilatorsByRequestedTime: number;
  dollarsInFlight: number;
}

function getExpectedData(data: Data, expectedInfections: number): Estimator {
  const days = getDays(data.periodType, data.timeToElapse);
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  const currentlyInfected = data.reportedCases * expectedInfections;
  const factor = Math.floor(days / 3);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.floor(0.15 * infectionsByRequestedTime);
  const hospitalBedsByRequestedTime = Math.trunc((0.35 * data.totalHospitalBeds) - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.floor(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.floor(0.02 * infectionsByRequestedTime);
  const dollarsInFlight =
  Math.floor((avgDailyIncomeInUSD * infectionsByRequestedTime * avgDailyIncomePopulation) / days);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
}
export default getExpectedData;
