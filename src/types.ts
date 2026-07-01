export type ProductType = 'photovoltaik' | 'waermepumpe' | 'strom_gas' | 'immobilien' | 'beratung_komplett';
export type HouseType = 'einfamilienhaus' | 'zweifamilienhaus' | 'mehrfamilienhaus' | 'wohnung' | 'grundstueck' | 'gewerbe';
export type OwnershipType = 'eigentuemer' | 'mieter' | 'interessent';
export type HeatingType = 'gas' | 'oel' | 'strom' | 'holz' | 'waermepumpe' | 'andere';

export interface Lead {
  id: string;
  product: ProductType;
  houseType: HouseType;
  ownership: OwnershipType;
  heatingType: HeatingType;
  annualElectricity: number; // in kWh
  roofSize: number; // in sqm
  batteryStorage: boolean;
  
  // Strom & Gas specific fields
  energyCurrentCost?: number; // annual current spend
  energySwitchSubsidies?: boolean;
  
  // Immobilien specific fields
  propertyAction?: 'verkaufen' | 'kaufen' | 'vermieten' | 'bewertung' | 'beratung';
  propertyAreaSqm?: number;
  propertyEstimatedValue?: number;

  currentSituation: string;
  targetSituation: string;
  subsidiesInterest: boolean;
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  budget: number;
  createdAt: string;
  status: 'neu' | 'kontaktiert' | 'berechnung_erstellt' | 'bereit_fuer_installateur' | 'abgeschlossen';
  notes?: string;
  calculatedSavings?: {
    annualSavingsEur: number;
    investmentCostEur: number;
    subsidiesEur: number;
    paybackYears: number;
    co2ReducedTons: number;
  };
}

export interface CalculatorInputs {
  product: ProductType;
  electricityPrice: number; // €/kWh
  annualElectricity: number; // kWh
  currentHeatingCost: number; // €/Jahr
  roofSize: number; // sqm
  hasBattery: boolean;
  budget: number;
  gasPrice?: number; // €/kWh
  annualGas?: number; // kWh
}
