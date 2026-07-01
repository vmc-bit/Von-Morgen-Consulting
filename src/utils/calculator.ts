import { CalculatorInputs, Lead } from '../types';

/**
 * Calculates financial estimates for Photovoltaics (PV) and Heat Pumps (Wärmepumpen)
 * based on realistic German market conditions, tariffs, and subsidy guidelines (Bafa / KfW 2026).
 */
export function calculateEnergySavings(inputs: CalculatorInputs) {
  const electricityPrice = inputs.electricityPrice || 0.36; // €/kWh
  const yieldPerSqm = 180; // realistic yield in kWh/sqm/year in Germany
  const feedInTariff = 0.082; // feed-in tariff in €/kWh (EEG 2026)
  
  // 1. PV Calculations
  const pvCapacitykWp = Math.round((inputs.roofSize * 0.2) * 10) / 10; // ~5 sqm per kWp
  const annualPvYieldKwh = Math.round(inputs.roofSize * yieldPerSqm);
  
  // Self-consumption rate: ~30% without battery, ~75% with battery
  const pvSelfConsumptionRate = inputs.hasBattery ? 0.75 : 0.30;
  const selfConsumedKwh = Math.min(inputs.annualElectricity, annualPvYieldKwh * pvSelfConsumptionRate);
  const gridFeedInKwh = Math.max(0, annualPvYieldKwh - selfConsumedKwh);
  
  const pvAnnualSavingsEur = (selfConsumedKwh * electricityPrice) + (gridFeedInKwh * feedInTariff);
  
  // PV Investment: A 10 kWp system with a 10 kWh battery system costs somewhere between 17,000 and 23,000 € gross
  // Let's scale it dynamically around this range: at 50 sqm (10 kWp), with battery, it hits exactly 20,000 €.
  let pvInvestmentCost = 0;
  if (inputs.hasBattery) {
    // 12,000 base + 800 per kWp (10 kWp is exactly 20,000 € gross, centered perfectly in 17,000 - 23,000 €)
    pvInvestmentCost = Math.round(12000 + (pvCapacitykWp * 800));
  } else {
    // Without battery: 1,300 € per kWp (lower cost)
    pvInvestmentCost = Math.round(pvCapacitykWp * 1300);
  }
  
  // Subsidies for PV is 0% VAT rate (steuerfrei, already factored in gross price)
  const pvSubsidies = 0; 
  
  // 2. Wärmepumpe (WP) Calculations
  // Investment cost for heat pumps ranges from 34,000 € to 42,000 €.
  // Let's scale around a 38,000 € standard configuration:
  const wpBaseCost = 36000;
  const wpVarCost = Math.min(6000, Math.max(-2000, (inputs.currentHeatingCost - 2400) * 1.5));
  const wpInvestmentCost = Math.round(wpBaseCost + wpVarCost);
  
  // State subsidy (staatliche Förderung / Erstattung): up to 21,000 € (max BAFA/KfW 70% of 30,000 € eligible costs)
  // For most homeowners, the subsidy is outstandingly high (e.g. 55-60%, making net contribution 14,000 - 15,000 €)
  const wpSubsidies = Math.min(21000, Math.round(wpInvestmentCost * 0.58)); 
  
  // Annual savings: Replaces oil/gas heating which costs between 2,000 and 3,000 € per year.
  // Due to heat pump efficiency (COP ~ 4.0) and rising fossil fuel costs, yearly savings are massive:
  const wpBaseSavingsEur = inputs.currentHeatingCost * 0.60; // 60% saving compared to fossil fuel
  const wpSolarBonusSavingsEur = inputs.product === 'beratung_komplett' ? 400 : 0; 
  const wpAnnualSavingsEur = wpBaseSavingsEur + wpSolarBonusSavingsEur;
  
  // 3. Combined Logic
  let annualSavingsEur = 0;
  let investmentCostEur = 0;
  let subsidiesEur = 0;
  let co2ReducedTons = 0; // ton/year
  
  if (inputs.product === 'photovoltaik') {
    annualSavingsEur = pvAnnualSavingsEur;
    investmentCostEur = pvInvestmentCost;
    subsidiesEur = pvSubsidies;
    co2ReducedTons = (annualPvYieldKwh * 0.43) / 1000; // ~430g CO2 savings per solar kWh in DE
  } else if (inputs.product === 'waermepumpe') {
    annualSavingsEur = wpAnnualSavingsEur;
    investmentCostEur = wpInvestmentCost;
    subsidiesEur = wpSubsidies;
    co2ReducedTons = 2.4; // Average CO2 reduction for modern HP replacing gas/oil heating per year in tons
  } else if (inputs.product === 'strom_gas') {
    // Tarifoptimierung savings approximation
    annualSavingsEur = 450;
    investmentCostEur = 0;
    subsidiesEur = 0;
    co2ReducedTons = 0.8;
  } else if (inputs.product === 'immobilien') {
    // Estimating relative value increase on listing
    annualSavingsEur = 0;
    investmentCostEur = 1500; // valuation service fee
    subsidiesEur = 0;
    co2ReducedTons = 1.2;
  } else {
    // 'beratung_komplett' (Combined Solar & WP)
    annualSavingsEur = pvAnnualSavingsEur + wpAnnualSavingsEur;
    investmentCostEur = pvInvestmentCost + wpInvestmentCost;
    subsidiesEur = pvSubsidies + wpSubsidies;
    co2ReducedTons = ((annualPvYieldKwh * 0.43) / 1000) + 2.6; // slightly higher synergy bonus
  }
  
  // Cap investment costs/subsidies for visuals
  investmentCostEur = Math.round(investmentCostEur);
  subsidiesEur = Math.round(subsidiesEur);
  annualSavingsEur = Math.round(annualSavingsEur);
  co2ReducedTons = Math.round(co2ReducedTons * 10) / 10;
  
  const netInvestment = Math.max(0, investmentCostEur - subsidiesEur);
  const paybackYears = Math.round((netInvestment / Math.max(100, annualSavingsEur)) * 10) / 10;
  const wpSubsidiesRate = wpInvestmentCost > 0 ? (wpSubsidies / wpInvestmentCost) : 0;
  
  return {
    annualSavingsEur,
    investmentCostEur,
    subsidiesEur,
    paybackYears: isNaN(paybackYears) || paybackYears === 0 ? 1 : paybackYears,
    co2ReducedTons,
    pvCapacitykWp,
    wpSubsidiesRatePercent: Math.round(wpSubsidiesRate * 100)
  };
}

/**
 * Calculates savings for a Lead object based on its form values
 */
export function calculateLeadSavings(lead: Partial<Lead>): Lead['calculatedSavings'] {
  const electricityKwh = lead.annualElectricity || 4000;
  const sizeSqm = lead.roofSize || 45;
  const product = lead.product || 'photovoltaik';
  const hasBattery = lead.batteryStorage ?? true;
  
  // Approximate a budget or inputs
  const inputs: CalculatorInputs = {
    product,
    electricityPrice: 0.36,
    annualElectricity: electricityKwh,
    currentHeatingCost: product === 'waermepumpe' || product === 'beratung_komplett' ? 2200 : 0,
    roofSize: sizeSqm,
    hasBattery,
    budget: lead.budget || 15000
  };
  
  const result = calculateEnergySavings(inputs);
  
  return {
    annualSavingsEur: result.annualSavingsEur,
    investmentCostEur: result.investmentCostEur,
    subsidiesEur: result.subsidiesEur,
    paybackYears: result.paybackYears,
    co2ReducedTons: result.co2ReducedTons
  };
}
