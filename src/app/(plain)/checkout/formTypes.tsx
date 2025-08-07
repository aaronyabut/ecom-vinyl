import { Dispatch, SetStateAction } from 'react';

export interface FormData {
  email: string;
  subscribe: boolean;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  textAlert: boolean;
  textMePhoneNumber: string;
  shippingOption: string;
  paymentOption: string;
  creditCardNumber: string;
  expirationDate:string;
  securityCode: string;
  nameOnCard: string;
  shippingSameAsBilling: boolean;
  billingCountryRegion: string;
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingApartment: string;
  billingCity: string;
  billingState: string;
  billingZipcode: string;
  billingPhone: string;
  saveInfo: boolean;
  rememberMeContact: string;
  billingAddressOption:string;
}
export interface FormValueTypes {
  label: string;
  value: string;
}
export interface FormState {
  statesProvince: FormValueTypes[];
  statesProvinceLabel: string;
  postLabel: string;
}

export const Countries_Regions: FormValueTypes[] =[
  { label: "Australia", value: "AU" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" }
]

export const US_States:FormValueTypes[] = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "American Samoa", value: "AS" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Micronesia", value: "FM" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Guam", value: "GU" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Palau", value: "PW" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Puerto Rico", value: "PR" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "Washington DC", value: "DC" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
  { label: "U.S. Virgin Islands", value: "VI" },
  { label: "Armed Forces Americas", value: "AA" },
  { label: "Armed Forces Europe", value: "AE" },
  { label: "Armed Forces Pacific", value: "AP" }
]

export const CA_Province:FormValueTypes[] = [
  { label: "Alberta", value: "AB" },
  { label: "British Columbia", value: "BC" },
  { label: "Manitoba", value: "MB" },
  { label: "New Brunswick", value: "NB" },
  { label: "Newfoundland and Labrador", value: "NL" },
  { label: "Northwest Territories", value: "NT" },
  { label: "Nova Scotia", value: "NS" },
  { label: "Nunavut", value: "NU" },
  { label: "Ontario", value: "ON" },
  { label: "Prince Edward Island", value: "PE" },
  { label: "Quebec", value: "QC" },
  { label: "Saskatchewan", value: "SK" },
  { label: "Yukon", value: "YT" }
]

export const AU_States:FormValueTypes[] = [
  { label: "Australian Capital Territory", value: "ACT" },
  { label: "New South Wales", value: "NSW" },
  { label: "Northern Territory", value: "NT" },
  { label: "Queensland", value: "QLD" },
  { label: "South Australia", value: "SA" },
  { label: "Tasmania", value: "TAS" },
  { label: "Victoria", value: "VIC" },
  { label: "Western Australia", value: "WA" }
]


export const stateUpdate = (
  setState: Dispatch<SetStateAction<FormState>>,
  statesProvinceValue: FormValueTypes[],
  statesProvinceLabelValue: string,
  postLabelValue: string
) => {
  return setState((prev) => ({
    ...prev,
    statesProvince: statesProvinceValue,
    statesProvinceLabel: statesProvinceLabelValue,
    postLabel: postLabelValue,
  }))
}