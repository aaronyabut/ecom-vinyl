'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Items from './Components/items';
import { useShoppingCart } from '@/app/ShoppingCart';
import {
  FormData, FormValueTypes,
  Countries_Regions, US_States,
  CA_Province, AU_States,
  stateUpdate, phoneNumberFormat
} from './formTypes';

{/*
    *[DONE] Ensure shipping value updates cart subtotal of checkout page
    ***[DONE] This should affect the tax
    *[DONE] Ensure cart page does not take in the shipping preferences in the checkout page
    *[DONE] Ensure FREE is only shown when above spending limit
    *[DONE] Update styling to make sure curves are at top
    *[DONE] Fix interface and country/states/provinces
    *[DONE] Check to see if billing's same as shipping
    *[DONE] create helper func
    *[DONE] update regex for epxiration date and phonenumber
    * Rec carousel on product page add to cart dropdown when added
*/}

export default function Checkout () {
  const { shipping, setShipping, freeShipping } = useShoppingCart();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      subscribe: true,
      country: 'US',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      textAlert: false,
      textMePhoneNumber: '',
      shippingOption: shipping ? 'usps' : 'free',
      paymentOption:'creditCard',
      creditCardNumber: '',
      expirationDate: '',
      securityCode: '',
      nameOnCard: '',
      shippingSameAsBilling: false,
      billingCountryRegion: 'US',
      billingFirstName: '',
      billingLastName: '',
      billingAddress: '',
      billingApartment: '',
      billingCity: '',
      billingState: '',
      billingZipcode: '',
      billingPhone: '',
      saveInfo: false,
      rememberMePhone: '',
      billingAddressOption: 'differentBilling'
    },
  });

  const formValues = watch(); // Watch all fields

  const [showShipping, setShowShipping] = useState(false);

  const [deliveryFormStates, setDeliveryFormStates] = useState({
    statesProvince: US_States,
    statesProvinceLabel: "State",
    postLabel: "ZIP Code",
  })

  const [billingFormStates, setBillingFormStates] = useState({
    statesProvince: US_States,
    statesProvinceLabel: "State",
    postLabel: "ZIP Code",
  })

  const creditCardBilling = formValues.paymentOption==='creditCard' && formValues.shippingSameAsBilling===false;
  const differentBilling = formValues.billingAddressOption==='differentBilling' && formValues.paymentOption !== 'creditCard';

  // create helper func
  // rec carousel on product page add to cart dropdown when added
  // update regex for epxiration date and phonenumber
  useEffect(() => {
    const updatePhoneNumber = () => {
      phoneNumberFormat(setValue, "textMePhoneNumber", formValues.textMePhoneNumber);
      phoneNumberFormat(setValue, "phone", formValues.phone);
      phoneNumberFormat(setValue, "billingPhone", formValues.billingPhone);
      phoneNumberFormat(setValue, "rememberMePhone", formValues.rememberMePhone);
    }
    updatePhoneNumber();
  }, [formValues.textMePhoneNumber, formValues.phone, formValues.billingPhone, formValues.rememberMePhone, setValue])

  useEffect(() => {
    const expirationDateUpdate = () => {
      let value = formValues.expirationDate;

      if (value.length === 1 && value !== '1' && value !== '0' && parseInt(value) >= 0 ) {
        value = `0${value}`; // Add leading zero for 2-9
      } else if (value.length === 1 && isNaN(parseInt(value))) {
        value = value.slice(0,0);
      }

      if (value.length >= 2) {
        const month = value.slice(0, 2);

        if (parseInt(month) >= 1 && parseInt(month) <= 12) {
          if (value.length === 2) {
            value = `${month} / `; // Add / after month
          } else if (value.length === 4) {
            value = value.slice(0,1); // removes / when backspacing
          } else if (value.length > 7) {
            value = value.slice(0,7); //prevents adding more
          }
          setValue("expirationDate", value);

        } else {
          setValue("expirationDate", month); // Keep only valid month digits
        }
      } else {
        setValue("expirationDate", value); // Allow raw digits for backspacing
      }
    };
    expirationDateUpdate();
  }, [formValues.expirationDate])

  useEffect(() => {
    const billingStateUpdate = () => {
      if (formValues.billingCountryRegion === 'AU') {
        stateUpdate(setBillingFormStates, AU_States, "State/territory", "Postcode");
      } else if (formValues.billingCountryRegion === 'CA') {
        stateUpdate(setBillingFormStates, CA_Province, "Province", "Postal code");
      } else if (formValues.billingCountryRegion === 'GB') {
        stateUpdate(setBillingFormStates, [], "", "Postcode");
      } else if (formValues.billingCountryRegion === 'US') {
        stateUpdate(setBillingFormStates, US_States, "State", "ZIP Code");
      }
    }
    billingStateUpdate();
  }, [formValues.billingCountryRegion])

  useEffect(() => {
    const deliveryStateUpdate = () => {
      if (formValues.country === 'AU') {
        stateUpdate(setDeliveryFormStates, AU_States, "State/territory", "Postcode");
      } else if (formValues.country === 'CA') {
        stateUpdate(setDeliveryFormStates, CA_Province, "Province", "Postal code");
      } else if (formValues.country === 'GB') {
        stateUpdate(setDeliveryFormStates, [], "", "Postcode");
      } else if (formValues.country === 'US') {
        stateUpdate(setDeliveryFormStates, US_States, "State", "ZIP Code");
      }
    }
    deliveryStateUpdate();
  }, [formValues.country])

  useEffect (() => {
    const checker = () => {

      const address = !!formValues.address
      const city = !!formValues.city
      const state = !!formValues.state
      const zipcode = !!formValues.zipcode

      if (address && city && state && zipcode) {
        setShowShipping(true);
      } else {
        setShowShipping(false);
      }
      // console.log("showShipping:",showShipping)
    }
    checker();
  }, [formValues.address,formValues.city,formValues.state,formValues.zipcode,showShipping])

  useEffect (() => {
    const sameAsBilling = () => {
      if (formValues.shippingSameAsBilling || formValues.billingAddressOption==="sameAsShipping") {
        setTimeout(()=> {
          setValue("billingCountryRegion", formValues.country);
          setValue("billingFirstName", formValues.firstName);
          setValue("billingLastName", formValues.lastName);
          setValue("billingAddress", formValues.address);
          setValue("billingApartment", formValues.apartment);
          setValue("billingCity", formValues.city);
          setValue("billingState", formValues.state);
          setValue("billingZipcode", formValues.zipcode);
          setValue("billingPhone", formValues.phone);
        }, 1000);
      } else if ((!formValues.shippingSameAsBilling || formValues.billingAddressOption==="differentBilling")) {
        setTimeout(()=> {
          setValue("billingCountryRegion", "US");
          setValue("billingFirstName", "");
          setValue("billingLastName", "");
          setValue("billingAddress", "");
          setValue("billingApartment", "");
          setValue("billingCity", "");
          setValue("billingState", "");
          setValue("billingZipcode", "");
          setValue("billingPhone", "");
        }, 1000);
      }

      // when credit card is chosen reset formValues.billingAddressOption
      // when anything else but credit card is chosen reset formValues.shippingSameAsBilling
    }
    sameAsBilling();
  }, [formValues.shippingSameAsBilling, formValues.billingAddressOption, formValues.paymentOption])

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // alert(JSON.stringify(data));
    // alert(formValues.paymentOption);
    // alert("asd");
    // console.log(formValues.paymentOption);
    console.log(JSON.stringify(data));
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.navContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link href={`/`}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0704/2026/7313/files/Vinyl_1_x320.png?v=1692630836"
                height={40}
                width={168}
                alt="Vinyl logo"
                priority
              />
            </Link>
          </div>
          <div className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}>
              <path d="m2.007 10.156.387-4.983a1 1 0 0 1 .997-.923h7.218a1 1 0 0 1 .997.923l.387 4.983c.11 1.403-1.16 2.594-2.764 2.594H4.771c-1.605 0-2.873-1.19-2.764-2.594"></path>
              <path d="M5 3.5c0-1.243.895-2.25 2-2.25S9 2.257 9 3.5V5c0 1.243-.895 2.25-2 2.25S5 6.243 5 5z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.formContainer}>
          <form
            className={styles.forms}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.expressHeader}>Express checkout</div>
            <div className={styles.expressPayments}>
              <div className={styles.shopPay}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="inherit" aria-hidden="true" preserveAspectRatio="xMidYMid" viewBox="0 0 341 80.035" className={styles.shopPayIcon}><path fillRule="evenodd" d="M227.297 0c-6.849 0-12.401 5.472-12.401 12.223v55.59c0 6.75 5.552 12.222 12.401 12.222h101.06c6.849 0 12.401-5.472 12.401-12.222v-55.59c0-6.75-5.552-12.223-12.401-12.223zm17.702 55.892v-14.09h8.994c8.217 0 12.586-4.542 12.586-11.423s-4.369-11-12.586-11h-14.788v36.513zm0-31.084h7.664c5.319 0 7.932 2.154 7.932 5.758s-2.518 5.758-7.695 5.758h-7.901zm31.796 31.833c4.417 0 7.314-1.92 8.644-5.196.38 3.65 2.613 5.523 7.457 4.26l.048-3.886c-1.948.187-2.328-.515-2.328-2.528v-9.55c0-5.617-3.752-8.94-10.686-8.94-6.84 0-10.782 3.37-10.782 9.08h5.32c0-2.714 1.947-4.353 5.367-4.353 3.609 0 5.272 1.545 5.224 4.214v1.217l-6.127.655c-6.887.749-10.686 3.324-10.686 7.818 0 3.698 2.659 7.209 8.549 7.209m1.187-4.213c-2.992 0-4.179-1.592-4.179-3.184 0-2.153 2.47-3.136 7.314-3.698l3.8-.421c-.238 4.12-3.04 7.303-6.935 7.303m32.555 5.29c-2.422 5.804-6.317 7.536-12.396 7.536h-2.613V60.48h2.803c3.324 0 4.939-1.03 6.697-3.979l-10.782-24.95h5.984l7.695 18.21 6.839-18.21h5.842z" clipRule="evenodd"></path><path d="M29.514 35.18c-7.934-1.697-11.469-2.36-11.469-5.374 0-2.834 2.392-4.246 7.176-4.246 4.207 0 7.283 1.813 9.546 5.363.171.274.524.369.812.222l8.927-4.447a.616.616 0 0 0 .256-.864c-3.705-6.332-10.55-9.798-19.562-9.798-11.843 0-19.2 5.752-19.2 14.898 0 9.714 8.96 12.169 16.904 13.865 7.944 1.697 11.49 2.36 11.49 5.374s-2.584 4.435-7.742 4.435c-4.763 0-8.297-2.15-10.433-6.321a.63.63 0 0 0-.843-.274L6.47 52.364a.623.623 0 0 0-.278.843c3.535 7.006 10.785 10.947 20.47 10.947 12.334 0 19.787-5.658 19.787-15.088s-9.001-12.169-16.935-13.865zM77.353 16.036c-5.062 0-9.536 1.77-12.75 4.92-.203.19-.534.053-.534-.221V.622a.62.62 0 0 0-.63-.622h-11.17a.62.62 0 0 0-.63.622v62.426a.62.62 0 0 0 .63.621h11.17a.62.62 0 0 0 .63-.621V35.664c0-5.289 4.11-9.345 9.653-9.345 5.542 0 9.557 3.972 9.557 9.345v27.384a.62.62 0 0 0 .63.621h11.17a.62.62 0 0 0 .63-.621V35.664c0-11.505-7.646-19.618-18.356-19.618zM118.389 14.255c-6.065 0-11.767 1.823-15.847 4.467a.62.62 0 0 0-.202.833l4.922 8.292c.182.295.566.4.865.22a19.8 19.8 0 0 1 10.262-2.78c9.749 0 16.914 6.785 16.914 15.75 0 7.64-5.734 13.297-13.006 13.297-5.926 0-10.037-3.403-10.037-8.207 0-2.75 1.185-5.005 4.271-6.596a.607.607 0 0 0 .246-.864l-4.645-7.754a.63.63 0 0 0-.759-.264c-6.225 2.276-10.593 7.755-10.593 15.109 0 11.126 8.981 19.428 21.507 19.428 14.629 0 25.147-9.998 25.147-24.338 0-15.372-12.237-26.603-29.066-26.603zM180.098 15.952c-5.649 0-10.689 2.054-14.373 5.678a.313.313 0 0 1-.534-.22v-4.363a.62.62 0 0 0-.63-.621H153.68a.62.62 0 0 0-.63.621v62.331a.62.62 0 0 0 .63.622h11.169a.62.62 0 0 0 .631-.622v-20.44c0-.274.331-.41.533-.231 3.674 3.371 8.532 5.342 14.096 5.342 13.102 0 23.321-10.463 23.321-24.054 0-13.592-10.23-24.054-23.321-24.054zm-2.103 37.54c-7.454 0-13.103-5.848-13.103-13.582 0-7.733 5.638-13.58 13.103-13.58s13.091 5.752 13.091 13.58-5.553 13.581-13.102 13.581z"></path></svg>
              </div>
              <div className={styles.paypal}>
                <svg className="label" viewBox="-24 -30.25 123.75 48"><svg className="wordmark" viewBox="0 0 101 32" width="75.75" height="24" data-baseline-offset="-18.25" xmlns="http://www.w3.org/2000/svg" x="0" y="-18.25"><path className={styles.pay} d="M12.24 2.8h-7.8c-.5 0-1 .4-1.1.9l-3.1 20c-.1.4.2.7.6.7h3.7c.5 0 1-.4 1.1-.9l.8-5.4c.1-.5.5-.9 1.1-.9h2.5c5.1 0 8.1-2.5 8.9-7.4.3-2.1 0-3.8-1-5-1.1-1.3-3.1-2-5.7-2Zm.9 7.3c-.4 2.8-2.6 2.8-4.6 2.8h-1.2l.8-5.2c0-.3.3-.5.6-.5h.5c1.4 0 2.7 0 3.4.8.5.4.7 1.1.5 2.1Zm22.3-.1h-3.7c-.3 0-.6.2-.6.5l-.2 1-.3-.4c-.8-1.2-2.6-1.6-4.4-1.6-4.1 0-7.6 3.1-8.3 7.5-.4 2.2.1 4.3 1.4 5.7 1.1 1.3 2.8 1.9 4.7 1.9 3.3 0 5.2-2.1 5.2-2.1l-.2 1c-.1.4.2.8.6.8h3.4c.5 0 1-.4 1.1-.9l2-12.8c.1-.2-.3-.6-.7-.6Zm-5.1 7.2c-.4 2.1-2 3.6-4.2 3.6-1.1 0-1.9-.3-2.5-1-.6-.7-.8-1.6-.6-2.6a4.2 4.2 0 0 1 4.2-3.6c1.1 0 1.9.4 2.5 1 .5.7.7 1.6.6 2.6Zm25-7.2h-3.7c-.4 0-.7.2-.9.5l-5.2 7.6-2.2-7.3c-.1-.5-.6-.8-1-.8h-3.7c-.4 0-.8.4-.6.9l4.1 12.1-3.9 5.4c-.3.4 0 1 .5 1h3.7c.4 0 .7-.2.9-.5l12.5-18c.3-.3 0-.9-.5-.9Z"></path><path className={styles.pal} d="M67.74 2.8h-7.8c-.5 0-1 .4-1.1.9l-3.1 19.9c-.1.4.2.7.6.7h4c.4 0 .7-.3.7-.6l.9-5.7c.1-.5.5-.9 1.1-.9h2.5c5.1 0 8.1-2.5 8.9-7.4.3-2.1 0-3.8-1-5-1.2-1.2-3.1-1.9-5.7-1.9Zm.9 7.3c-.4 2.8-2.6 2.8-4.6 2.8h-1.2l.8-5.2c0-.3.3-.5.6-.5h.5c1.4 0 2.7 0 3.4.8.5.4.6 1.1.5 2.1Zm22.3-.1h-3.7c-.3 0-.6.2-.6.5l-.2 1-.3-.4c-.8-1.2-2.6-1.6-4.4-1.6-4.1 0-7.6 3.1-8.3 7.5-.4 2.2.1 4.3 1.4 5.7 1.1 1.3 2.8 1.9 4.7 1.9 3.3 0 5.2-2.1 5.2-2.1l-.2 1c-.1.4.2.8.6.8h3.4c.5 0 1-.4 1.1-.9l2-12.8c0-.2-.3-.6-.7-.6Zm-5.2 7.2c-.4 2.1-2 3.6-4.2 3.6-1.1 0-1.9-.3-2.5-1-.6-.7-.8-1.6-.6-2.6a4.2 4.2 0 0 1 4.2-3.6c1.1 0 1.9.4 2.5 1 .6.7.8 1.6.6 2.6Zm9.6-13.9-3.2 20.3c-.1.4.2.7.6.7h3.2c.5 0 1-.4 1.1-.9l3.2-19.9c.1-.4-.2-.7-.6-.7h-3.6c-.4 0-.6.2-.7.5Z"></path></svg></svg>
              </div>
              <div className={styles.gpay}>
                <svg className={styles.gpayIcon} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 126 50" fill="none" focusable="false"><g clipPath="url(#gpay-light__a)" fillRule="evenodd" clipRule="evenodd"><path d="M59.62 7.342v12.636h7.793c1.857 0 3.392-.625 4.605-1.872 1.247-1.244 1.872-2.73 1.872-4.447 0-1.684-.625-3.15-1.872-4.401-1.213-1.278-2.748-1.919-4.605-1.919H59.62v.003Zm0 17.083v14.657h-4.654V2.895h12.348c3.135 0 5.796 1.043 7.99 3.132 2.228 2.089 3.343 4.633 3.343 7.632 0 3.066-1.115 5.629-3.343 7.68-2.157 2.059-4.824 3.083-7.993 3.083h-7.69v.003Zm23.73 7.078c0 1.213.514 2.222 1.545 3.033 1.027.804 2.234 1.21 3.615 1.21 1.959 0 3.7-.724 5.236-2.17 1.538-1.451 2.302-3.153 2.302-5.106-1.451-1.145-3.475-1.718-6.072-1.718-1.887 0-3.466.458-4.728 1.368-1.266.91-1.897 2.034-1.897 3.383Zm6.023-17.996c3.441 0 6.155.92 8.148 2.754 1.987 1.838 2.984 4.358 2.984 7.558v15.263h-4.454v-3.435h-.2c-1.926 2.828-4.488 4.246-7.694 4.246-2.73 0-5.017-.811-6.855-2.427-1.838-1.618-2.758-3.64-2.758-6.065 0-2.563.97-4.6 2.91-6.116 1.94-1.516 4.527-2.274 7.767-2.274 2.76 0 5.042.504 6.827 1.516v-1.064c0-1.616-.64-2.99-1.922-4.116a6.598 6.598 0 0 0-4.502-1.693c-2.6 0-4.655 1.092-6.174 3.287l-4.098-2.581c2.26-3.234 5.602-4.853 10.02-4.853m36.683.81L110.519 50h-4.806l5.769-12.484-10.219-23.198h5.06l7.387 17.791h.099l7.186-17.794 5.06.003Z" fill="#5F6368"></path><path d="M40.81 21.267c0-1.464-.123-2.878-.359-4.228H20.818v8.01h11.247a9.623 9.623 0 0 1-4.16 6.319v5.199h6.713c3.93-3.62 6.192-8.975 6.192-15.3" fill="#4285F4"></path><path d="M20.819 41.585c5.62 0 10.348-1.841 13.799-5.016l-6.713-5.203c-1.866 1.257-4.27 1.99-7.087 1.99-5.428 0-10.039-3.658-11.685-8.584H2.219v5.357a20.821 20.821 0 0 0 18.6 11.46" fill="#34A853"></path><path d="M9.133 24.771a12.484 12.484 0 0 1 0-7.96v-5.356H2.219A20.667 20.667 0 0 0 0 20.788c0 3.358.805 6.53 2.219 9.337l6.914-5.357v.003Z" fill="#FABB05"></path><path d="M20.818 8.229c3.07 0 5.818 1.052 7.985 3.12v.002l5.942-5.935C31.142 2.06 26.438 0 20.82 0A20.821 20.821 0 0 0 2.222 11.457l6.914 5.357c1.646-4.927 6.257-8.585 11.685-8.585" fill="#E94235"></path></g><defs><clipPath id="gpay-light__a"><rect width="126" height="50" fill="#fff"></rect></clipPath></defs></svg>
              </div>
              <div className={styles.venmo}>
                <svg className="label" viewBox="-24 -30.25 123.75 48"><svg className="wordmark" viewBox="0 0 101 32" width="75.75" height="24" data-baseline-offset="-18.25" xmlns="http://www.w3.org/2000/svg" x="0" y="-18.25"><path className={styles.venmoIcon} d="M16.67 6.18c.68 1.16.98 2.35.98 3.86 0 4.81-3.98 11.06-7.21 15.45H3.06L.1 7.23l6.46-.63 1.57 12.99c1.46-2.46 3.26-6.32 3.26-8.95a7.4 7.4 0 0 0-.61-3.23l5.89-1.23Zm8.24 11.51c0 2.15 1.15 2.99 2.68 2.99 1.67 0 3.27-.42 5.35-1.51l-.79 5.47a14.2 14.2 0 0 1-5.95 1.23c-5.61 0-7.62-3.5-7.62-7.9 0-5.68 3.27-11.72 10-11.72 3.71 0 5.78 2.14 5.78 5.13 0 4.8-5.98 6.28-9.45 6.31Zm.13-3.47c1.2 0 4.19-.56 4.19-2.32 0-.84-.58-1.26-1.26-1.26-1.2 0-2.76 1.47-2.93 3.58Zm27.98-3.76c0 .7-.1 1.72-.2 2.39l-1.95 12.64h-6.3l1.78-11.59c.03-.31.13-.94.13-1.3 0-.84-.5-1.05-1.12-1.05a5 5 0 0 0-2.18.67l-2 13.27h-6.33l2.89-18.92h5.48l.07 1.5c1.29-.87 3-1.82 5.4-1.82 3.2 0 4.33 1.68 4.33 4.21ZM71.7 8.32a9.2 9.2 0 0 1 5.86-2.07c3.23 0 4.35 1.68 4.35 4.21 0 .7-.1 1.72-.2 2.39l-1.94 12.64h-6.3l1.8-11.83c.04-.32.1-.7.1-.95 0-.95-.5-1.16-1.12-1.16a4.7 4.7 0 0 0-2.14.67l-2 13.27h-6.3l1.8-11.83c.04-.32.1-.7.1-.95 0-.95-.5-1.16-1.12-1.16a5 5 0 0 0-2.18.67l-2 13.27h-6.33l2.89-18.92h5.41l.17 1.58a8.53 8.53 0 0 1 5.24-1.9c1.97 0 3.27.88 3.91 2.07Zm11.85 9.48c0-5.97 3.06-11.55 10.1-11.55 5.31 0 7.25 3.23 7.25 7.69 0 5.9-3.02 12-10.24 12-5.34 0-7.1-3.61-7.1-8.14Zm10.89-3.97c0-1.54-.38-2.6-1.5-2.6-2.48 0-3 4.53-3 6.85 0 1.76.48 2.84 1.6 2.84 2.35 0 2.9-4.77 2.9-7.09Z"></path></svg></svg>
              </div>
              {/* <div>{formValues.paymentOption}</div> */}
            </div>
            <div className={styles.cardPaymentHeader}>
              <div className={styles.header}>
                Or Pay With Credit Card Below
              </div>
            </div>
            <div className={styles.contactContainer}>
              <div className={styles.headerContainer}>
                <h2 className={styles.header}>Contact</h2>
                <div className={styles.login}>Log in</div>
              </div>
              <div className={styles.email}>
                <div className={styles.inputContainer}>
                  <label className={`${styles.inputLabel} ${formValues.email ? styles.showLabel : ""}`}>Email</label>
                  <input className={`${styles.inputText} ${formValues.email !== "" ? styles.inputUpdate : ""} ${errors.email ? styles.wrongEntry : ""}`}
                    type="text"
                    placeholder="Email"
                    {...register('email', {
                      required: 'Enter email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                  />
                </div>
                {
                  errors.email ?
                  <div className={styles.wrongEntryMessage} >
                    {errors.email.message}
                  </div>
                  : null
                }
              </div>
              <div className={styles.marketing}>
                <div className={styles.checkboxInput}>
                  <input
                    type="checkbox"
                    id="subscribeCheckbox"
                    {...register('subscribe')}
                  />
                  <label htmlFor="subscribeCheckbox" className={styles.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 14"
                      focusable="false"
                      aria-hidden="true"
                      className={styles.svg}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m1.5 7.097 3.596 3.602c.104.105.156.157.216.175a.25.25 0 0 0 .16-.004c.059-.022.108-.077.206-.188L12.5 3"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className={styles.subscribe}>Subscribe to receive exclusive discounts & more</div>
              </div>
            </div>
            <div className={styles.deliveryContainer}>
              <h2 className={styles.deliveryHeader}>Delivery</h2>
              <div className={styles.country}>
                <label className={`${styles.label} ${formValues.country && styles.selected}`}>
                  Country/Region
                </label>
                <select {...register("country")} className={styles.select}>
                  <option hidden value="">&nbsp;</option>
                  {Countries_Regions.map((country:FormValueTypes, i:number) => {
                    return (
                      <option value={country.value} key={i}>{country.label}</option>
                    )
                  })}
                </select>
                <div className={styles.svgContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"></path></svg>
                </div>
              </div>
              <div className={styles.nameWrapper}>
                <div className={styles.firstName}>
                  <div className={styles.inputContainer}>
                    <label className={`${styles.inputLabel} ${formValues.firstName ? styles.showLabel : ""}`}>First name</label>
                    <input className={`${styles.inputText} ${formValues.firstName !== "" ? styles.inputUpdate : ""} ${errors.firstName ? styles.wrongEntry : ""}`}
                      type='text'
                      placeholder="First name"
                      {...register('firstName', {
                        required: 'Enter a first name',
                        pattern: {
                          value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                          message: 'Enter a valid first name',
                        },
                      })}
                      />
                  </div>
                  {
                    errors.firstName ?
                    <div className={styles.wrongEntryMessage} >
                      {errors.firstName.message}
                    </div>
                    : null
                  }
                </div>
                <div className={styles.lastName}>
                  <div className={styles.inputContainer}>
                    <label className={`${styles.inputLabel} ${formValues.lastName ? styles.showLabel : ""}`}>Last name</label>
                    <input className={`${styles.inputText} ${formValues.lastName !== "" ? styles.inputUpdate : ""} ${errors.lastName ? styles.wrongEntry : ""}`}
                      type='text'
                      placeholder="Last name"
                      {...register('lastName', {
                        required: 'Enter a last name',
                        pattern: {
                          value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                          message: 'Enter a last name',
                        },
                      })}
                      />
                  </div>
                  {
                    errors.lastName ?
                    <div className={styles.wrongEntryMessage} >
                      {errors.lastName.message}
                    </div>
                    : null
                  }
                </div>
              </div>
              <div className={styles.address}>
                <div className={styles.inputContainer}>
                  <label className={`${styles.inputLabel} ${formValues.address ? styles.showLabel : ""}`}>Address</label>
                  <input className={`${styles.inputText} ${formValues.address !== "" ? styles.inputUpdate : ""} ${errors.address ? styles.wrongEntry : ""}`}
                    type='text'
                    placeholder="Address"
                      {...register('address', {
                        required: 'Enter an address',
                        pattern: {
                          value: /^\d+\s+[A-Za-z\s]+(?:[A-Za-z0-9#-.]+)?$/,
                          message: 'Enter a address',
                        },
                      })}
                  />
                </div>
                {
                  errors.address ?
                  <div className={styles.wrongEntryMessage} >
                    {errors.address.message}
                  </div>
                  : null
                }
              </div>
              <div className={styles.apartment}>
                <div className={styles.inputContainer}>
                  <label className={`${styles.inputLabel} ${formValues.apartment ? styles.showLabel : ""}`}>Apartment, suite, etc. (optional)</label>
                  <input className={`${styles.inputText} ${formValues.apartment !== "" ? styles.inputUpdate : ""} ${errors.apartment ? styles.wrongEntry : ""}`}
                    type='text'
                    placeholder="Apartment, suite, etc. (optional)"
                      {...register('apartment')}
                  />
                </div>
              </div>
              <div className={styles.region}>
                <div className={styles.city}>
                  <div className={styles.inputContainer}>
                    <label className={`${styles.inputLabel} ${formValues.city ? styles.showLabel : ""}`}>City</label>
                    <input className={`${styles.inputText} ${formValues.city !== "" ? styles.inputUpdate : ""} ${errors.city ? styles.wrongEntry : ""}`}
                      type='text'
                      placeholder="City"
                      {...register('city', {
                        required: 'Enter a city',
                        pattern: {
                          value: /^[A-Za-z\s-]+$/,
                          message: 'Enter a valid city',
                        },
                      })}
                    />
                  </div>
                  {
                    errors.city ?
                    <div className={styles.wrongEntryMessage} >
                      {errors.city.message}
                    </div>
                    : null
                  }
                </div>
                {
                  formValues.country !== "GB" &&
                  <div className={styles.state}>
                    <label className={`${styles.label} ${formValues.state && styles.selected}`}>
                      {deliveryFormStates.statesProvinceLabel}
                    </label>
                    <select {...register("state")} className={styles.select}>
                      <option hidden value="">&nbsp;</option>
                      {deliveryFormStates.statesProvince.map((state:FormValueTypes, i:number) => {
                        return (
                          <option value={state.value} key={i}>{state.label}</option>
                        )
                      })}
                    </select>
                    <div className={styles.svgContainer}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"></path></svg>
                    </div>
                  </div>
                }
                <div className={styles.zip}>
                  <div className={styles.inputContainer}>
                    <label className={`${styles.inputLabel} ${formValues.zipcode ? styles.showLabel : ""}`}>{deliveryFormStates.postLabel}</label>
                    <input className={`${styles.inputText} ${formValues.zipcode !== "" ? styles.inputUpdate : ""} ${errors.zipcode ? styles.wrongEntry : ""}`}
                      type='text'
                      placeholder={deliveryFormStates.postLabel}
                      {...register('zipcode', {
                        required: 'Enter a ZIP / postal code',
                        pattern: {
                          value: /^\d{5}(?:-\d{4})?$/,
                          message: 'Enter a valid zip code',
                        },
                      })}
                    />
                  </div>
                  {
                    errors.zipcode ?
                    <div className={styles.wrongEntryMessage} >
                      {errors.zipcode.message}
                    </div>
                    : null
                  }
                </div>
              </div>
              <div className={styles.phone}>
                <div className={styles.inputContainer}>
                  <label className={`${styles.inputLabel} ${formValues.phone ? styles.showLabel : ""}`}>Phone (optional)</label>
                  <input className={`${styles.inputText} ${formValues.phone !== "" ? styles.inputUpdate : ""} ${errors.phone ? styles.wrongEntry : ""}`}
                    type='text'
                    placeholder="Phone (optional)"
                      {...register('phone', {
                        pattern: {
                          value: /^(1\s)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
                          message: 'Enter a valid phone number',
                        },
                      })}
                  />
                </div>
              </div>
              <div className={styles.alerts}>
                <div className={styles.checkboxInput}>
                  <input
                    type="checkbox"
                    id="textCheckbox"
                    {...register('textAlert')}
                  />
                  <label htmlFor="textCheckbox" className={styles.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 14"
                      focusable="false"
                      aria-hidden="true"
                      className={styles.svg}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m1.5 7.097 3.596 3.602c.104.105.156.157.216.175a.25.25 0 0 0 .16-.004c.059-.022.108-.077.206-.188L12.5 3"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className={styles.alertMessage}>
                  Text me with news and offers
                </div>
              </div>
              <div className={`${styles.dropdownTextMe} ${formValues.textAlert===true && styles.open}`}>
                <div className={styles.inputContainer}>
                  <span className={styles.icon}>
                  <svg fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M17,23a2,2,0,0,0,2-2V3a2,2,0,0,0-2-2H7A2,2,0,0,0,5,3V21a2,2,0,0,0,2,2ZM7,3H9.5L10,4h4l.5-1H17V21H7Zm6,16a1,1,0,1,1-1-1A1,1,0,0,1,13,19Z"></path></g></svg>
                  </span>
                  <label className={`${styles.inputLabel} ${formValues.textMePhoneNumber !== "" ? styles.showLabel : ''}`}>Mobile phone number</label>
                  <input className={`${styles.inputText} ${formValues.textMePhoneNumber !== "" ? styles.inputUpdate : ''} ${errors.textAlert ? styles.wrongEntry : ""}`}
                    type='text'
                    placeholder='Mobile phone number'
                    {...register('textMePhoneNumber', {
                      required: formValues.textAlert ? 'Enter a phone number' : false,
                      pattern: {
                        value: /^(1\s)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
                        message: 'The specified phone number does not match the expected pattern.',
                      },
                    })}
                    />
                </div>
                {
                  errors.textMePhoneNumber ?
                  <div className={styles.wrongEntryMessage} >
                    {errors.textMePhoneNumber.message}
                  </div>
                  : null
                }
                <div className={styles.textMeDescription}>
                  By signing up via text, you agree to receive recurring automated marketing messages, including cart reminders, at the phone number provided. Consent is not a condition of purchase. Reply STOP to unsubscribe. Reply HELP for help. Message frequency varies. Msg & data rates may apply. View our{" "}
                  <span className={styles.privacy}>Privacy</span>
                  {" "}and {" "}
                  <span className={styles.termsOfService}>Terms of Service</span>
                  .
                </div>
              </div>
              <h3 className={styles.shippingHeader}>Shipping method</h3>
              <div className={styles.shippingMessage}>Please double-check your address. You won’t be able to change it later.</div>
              {
                showShipping ?
                <div className={styles.shippingOptions}>
                  {
                    freeShipping<=0 &&
                    <div className={`${styles.free} ${formValues.shippingOption==="free" && styles.chosenShipping}`}>
                      <div className={styles.radioButton}>
                        <input
                          type='radio'
                          value='free'
                          {...register("shippingOption")}
                          onClick={()=>setShipping(0)}
                        />
                      </div>
                      <div className={styles.title}>FREE Shipping</div>
                      <div className={styles.price}><strong>FREE</strong></div>
                    </div>
                  }
                  <div className={`${freeShipping>0 ? styles.usps : styles.uspsFreeShipping} ${formValues.shippingOption==="usps" && styles.chosenShipping}`}>
                    <div className={styles.radioButton}>
                      <input
                        type='radio'
                        value='usps'
                        {...register("shippingOption")}
                        onClick={()=>setShipping(4.99)}
                      />
                    </div>
                    <div className={styles.title}>USPS Media Mail Parcel</div>
                    <div className={styles.price}><strong>$5.99</strong></div>
                  </div>
                  <div className={`${styles.expressShipping} ${formValues.shippingOption==="express" && styles.chosenShipping}`}>
                    <div className={styles.radioButton}>
                      <input
                        type='radio'
                        value='express'
                        {...register("shippingOption")}
                        onClick={()=>setShipping(25.99)}
                      />
                    </div>
                    <div className={styles.title}>48-Hour Express Delivery</div>
                    <div className={styles.price}><strong>$25.99</strong></div>
                  </div>
                </div>
                :
                <div className={styles.unselectedShipping}>
                  <p className={styles.message}>Enter your shipping address to view available shipping methods.</p>
                </div>
              }
            </div>
            <div className={styles.paymentContainer}>
              <div className={styles.headerContainer}>
                <h2 className={styles.header}>Payment</h2>
                <p className={styles.subHeader}>All transaction are secure and encrypted.</p>
              </div>
              <div className={styles.paymentOptionContainer}>
                <div className={`${styles.creditCard} ${formValues.paymentOption==="creditCard" && styles.chosenPayment}`}>
                  <div className={styles.radioButton}>
                    <input
                      type='radio'
                      value='creditCard'
                      {...register("paymentOption")}
                      onClick={()=>setValue("billingAddressOption", "differentBilling")}
                    />
                  </div>
                  <div className={styles.title}>Credit card</div>
                  <div className={styles.logos}>
                    <span>

                      <Image
                        src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.sxIq5Dot.svg"
                        width={38}
                        height={24}
                        alt='Visa image'
                      />
                    </span>
                    <span>
                      <Image
                        src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/mastercard.1c4_lyMp.svg"
                        width={38}
                        height={24}
                        alt='Mastercard image'
                      />
                    </span>
                    <span>
                      <Image
                        src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/amex.Csr7hRoy.svg"
                        width={38}
                        height={24}
                        alt='AMEX image'
                      />
                    </span>
                  </div>
                </div>
                <div className={`${styles.dropdownCreditCard} ${formValues.paymentOption==="creditCard" && styles.open}`}>
                  <div className={styles.container}>
                    <div className={styles.creditCardNumber}>
                      <div className={styles.inputContainer}>
                        <label className={`${styles.inputLabel} ${formValues.creditCardNumber ? styles.showLabel : ""}`}>Card number</label>
                        <input className={`${styles.inputText} ${formValues.creditCardNumber !== "" ? styles.inputUpdate : ""} ${errors.creditCardNumber ? styles.wrongEntry : ""}`}
                          type='text'
                          placeholder="Card number"
                          {...register('creditCardNumber', {
                            required: formValues.paymentOption==='creditCard' ? 'Enter card number' : false,
                            pattern: {
                              value: /^[0-9]{13,19}$/,
                              message: 'Enter a valid card number',
                            },
                          })}
                          />
                      </div>
                      {
                        errors.creditCardNumber ?
                        <div className={styles.wrongEntryMessage} >
                          {errors.creditCardNumber.message}
                        </div>
                        : null
                      }
                    </div>
                    <div className={styles.cardInfoContainer}>
                      <div className={styles.expirationDate}>
                        <div className={styles.inputContainer}>
                          <label className={`${styles.inputLabel} ${formValues.expirationDate ? styles.showLabel : ""}`}>Expiration date (MM / YY)</label>
                          <input className={`${styles.inputText} ${formValues.expirationDate !== "" ? styles.inputUpdate : ""} ${errors.expirationDate ? styles.wrongEntry : ""}`}
                            type='text'
                            placeholder="Expiration date (MM / YY)"
                            {...register('expirationDate', {
                              required: formValues.paymentOption==='creditCard' ? 'Enter expiration date' : false,
                              pattern: {
                                value: /^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/,
                                message: 'Enter a valid expiration date',
                              },
                            })}
                            />
                        </div>
                        {
                          errors.expirationDate ?
                          <div className={styles.wrongEntryMessage} >
                            {errors.expirationDate.message}
                          </div>
                          : null
                        }
                      </div>
                      <div className={styles.securityCode}>
                        <div className={styles.inputContainer}>
                          <label className={`${styles.inputLabel} ${formValues.securityCode ? styles.showLabel : ""}`}>Security code</label>
                          <input className={`${styles.inputText} ${formValues.securityCode !== "" ? styles.inputUpdate : ""} ${errors.securityCode ? styles.wrongEntry : ""}`}
                            type='text'
                            placeholder="Security code"
                            {...register('securityCode', {
                              required: formValues.paymentOption==='creditCard' ? 'Enter security code' : false,
                              pattern: {
                                value: /^[0-9]{3,4}$/,
                                message: 'Enter a valid security code',
                              },
                            })}
                            />
                        </div>
                        {
                          errors.securityCode ?
                          <div className={styles.wrongEntryMessage} >
                            {errors.securityCode.message}
                          </div>
                          : null
                        }
                      </div>
                    </div>
                    <div className={styles.nameOnCard}>
                      <div className={styles.inputContainer}>
                        <label className={`${styles.inputLabel} ${formValues.nameOnCard ? styles.showLabel : ""}`}>Name on card</label>
                        <input className={`${styles.inputText} ${formValues.nameOnCard !== "" ? styles.inputUpdate : ""} ${errors.nameOnCard ? styles.wrongEntry : ""}`}
                          type='text'
                          placeholder="Name on card"
                          {...register('nameOnCard', {
                            required: formValues.paymentOption==='creditCard' ? 'Enter name on card' : false,
                            pattern: {
                              value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                              message: 'Enter your name exactly as it’s written on your card',
                            },
                          })}
                        />
                      </div>
                      {
                        errors.nameOnCard ?
                        <div className={styles.wrongEntryMessage} >
                          {errors.nameOnCard.message}
                        </div>
                        : null
                      }
                    </div>
                    <div className={styles.billingAddressCheckbox}>
                      <div className={`${styles.checkboxInput} ${formValues.shippingSameAsBilling && styles.checked}`}>
                        <input
                          type="checkbox"
                          id="billingCheckbox"
                          {...register('shippingSameAsBilling')}
                        />
                        <label htmlFor="billingCheckbox" className={styles.icon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 14 14"
                            focusable="false"
                            aria-hidden="true"
                            className={styles.svg}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m1.5 7.097 3.596 3.602c.104.105.156.157.216.175a.25.25 0 0 0 .16-.004c.059-.022.108-.077.206-.188L12.5 3"
                            ></path>
                          </svg>
                        </label>
                      </div>
                      <div className={styles.alertMessage}>Use shipping address as billing address</div>
                    </div>
                    <div className={`${styles.dropdownBilling} ${formValues.shippingSameAsBilling===false && styles.open}`}>
                      <h3 className={styles.billingAddressHeader}>Billing address</h3>
                      <div className={styles.billingAddressFormContainer}>
                        <div className={styles.billingCountryRegion}>
                          <label className={`${styles.label} ${formValues.billingCountryRegion && styles.selected}`}>
                            Country/Region
                          </label>
                          <select {...register("billingCountryRegion")} className={styles.select}>
                            <option hidden value="">&nbsp;</option>
                            {Countries_Regions.map((country:FormValueTypes, i:number) => {
                              return (
                                <option value={country.value} key={i}>{country.label}</option>
                              )
                            })}
                          </select>
                          <div className={styles.svgContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"></path></svg>
                          </div>
                        </div>
                        <div className={styles.billingNameWrapper}>
                          <div className={styles.firstName}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingFirstName ? styles.showLabel : ""}`}>First name</label>
                              <input className={`${styles.inputText} ${formValues.billingFirstName !== "" ? styles.inputUpdate : ""} ${errors.billingFirstName ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="First name"
                                {...register('billingFirstName', {
                                  required: creditCardBilling ? 'Enter a first name' : false,
                                  pattern: {
                                    value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                                    message: 'Enter a valid first name',
                                  },
                                })}
                                />
                            </div>
                            {
                              errors.billingFirstName ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingFirstName.message}
                              </div>
                              : null
                            }
                          </div>
                          <div className={styles.lastName}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingLastName ? styles.showLabel : ""}`}>Last name</label>
                              <input className={`${styles.inputText} ${formValues.billingLastName !== "" ? styles.inputUpdate : ""} ${errors.billingLastName ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="Last name"
                                {...register('billingLastName', {
                                  required: creditCardBilling ? 'Enter a last name' : false,
                                  pattern: {
                                    value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                                    message: 'Enter a last name',
                                  },
                                })}
                                />
                            </div>
                            {
                              errors.billingLastName ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingLastName.message}
                              </div>
                              : null
                            }
                          </div>
                        </div>
                        <div className={styles.address}>
                          <div className={styles.inputContainer}>
                            <label className={`${styles.inputLabel} ${formValues.billingAddress ? styles.showLabel : ""}`}>Address</label>
                            <input className={`${styles.inputText} ${formValues.billingAddress !== "" ? styles.inputUpdate : ""} ${errors.billingAddress ? styles.wrongEntry : ""}`}
                              type='text'
                              placeholder="Address"
                              {...register('billingAddress', {
                                required: creditCardBilling ? 'Enter an address' : false,
                                pattern: {
                                  value: /^\d+\s+[A-Za-z\s]+(?:[A-Za-z0-9#-.]+)?$/,
                                  message: 'Enter a address',
                                },
                              })}
                            />
                          </div>
                          {
                            errors.billingAddress ?
                            <div className={styles.wrongEntryMessage} >
                              {errors.billingAddress.message}
                            </div>
                            : null
                          }
                        </div>
                        <div className={styles.apartment}>
                          <div className={styles.inputContainer}>
                            <label className={`${styles.inputLabel} ${formValues.billingApartment ? styles.showLabel : ""}`}>Apartment, suite, etc. (optional)</label>
                            <input className={`${styles.inputText} ${formValues.billingApartment !== "" ? styles.inputUpdate : ""} ${errors.billingApartment ? styles.wrongEntry : ""}`}
                              type='text'
                              placeholder="Apartment, suite, etc. (optional)"
                              {...register('billingApartment')}
                            />
                          </div>
                        </div>
                        <div className={styles.region}>
                          <div className={styles.city}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingCity ? styles.showLabel : ""}`}>City</label>
                              <input className={`${styles.inputText} ${formValues.billingCity !== "" ? styles.inputUpdate : ""} ${errors.billingCity ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="City"
                                {...register('billingCity', {
                                  required: creditCardBilling ? 'Enter a city' : false,
                                  pattern: {
                                    value: /^[A-Za-z\s-]+$/,
                                    message: 'Enter a valid city',
                                  },
                                })}
                              />
                            </div>
                            {
                              errors.billingCity ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingCity.message}
                              </div>
                              : null
                            }
                          </div>
                          {
                            formValues.billingCountryRegion !== "GB" &&
                            <div className={styles.state}>
                              <label className={`${styles.label} ${formValues.billingState && styles.selected}`}>
                                {billingFormStates.statesProvinceLabel}
                              </label>
                              <select {...register("billingState")} className={styles.select}>
                                <option hidden value="">&nbsp;</option>
                                {billingFormStates.statesProvince.map((state:FormValueTypes, i:number) => {
                                  return (
                                    <option value={state.value} key={i}>{state.label}</option>
                                  )
                                })}
                              </select>
                              <div className={styles.svgContainer}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"></path></svg>
                              </div>
                            </div>
                          }
                          <div className={styles.zip}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingZipcode ? styles.showLabel : ""}`}>{billingFormStates.postLabel}</label>
                              <input className={`${styles.inputText} ${formValues.billingZipcode !== "" ? styles.inputUpdate : ""} ${errors.billingZipcode ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder={billingFormStates.postLabel}
                                {...register('billingZipcode', {
                                  required: creditCardBilling ? 'Enter a ZIP / postal code' : false,
                                  pattern: {
                                    value: /^\d{5}(?:-\d{4})?$/,
                                    message: 'Enter a valid zip code',
                                  },
                                })}
                              />
                            </div>
                            {
                              errors.billingZipcode ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingZipcode.message}
                              </div>
                              : null
                            }
                          </div>
                        </div>
                        <div className={styles.phone}>
                          <div className={styles.inputContainer}>
                            <label className={`${styles.inputLabel} ${formValues.billingPhone ? styles.showLabel : ""}`}>Phone (optional)</label>
                            <input className={`${styles.inputText} ${formValues.billingPhone !== "" ? styles.inputUpdate : ""} ${errors.billingPhone ? styles.wrongEntry : ""}`}
                              type='text'
                              placeholder="Phone (optional)"
                              {...register('billingPhone', {
                                pattern: {
                                  value: /^(1\s)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
                                  message: 'Enter a valid phone number',
                                },
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.paypal} ${formValues.paymentOption==="paypal" && styles.chosenPayment}`}>
                  <div className={styles.radioButton}>
                    <input
                      type='radio'
                      value='paypal'
                      {...register("paymentOption")}
                      onClick={()=>setValue("shippingSameAsBilling", false)}
                    />
                  </div>
                  <div className={styles.title}>PayPal</div>
                  <div className={styles.logos}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="xMidYMid" viewBox="0 0 196 50" role="img" display="block" aria-label="PayPal" className="RULId"><g clipPath="url(#paypal-logo_svg__a)"><path fill="#253B80" fillRule="evenodd" d="M62.3 11.2H73c3.6 0 6.3 1 7.9 2.9 1.4 1.7 1.8 4.2 1.3 7.3-1 7.1-5.1 10.8-12.3 10.8h-3.4c-.7 0-1.4.5-1.5 1.3l-1 7.8c0 .8-.7 1.4-1.4 1.4h-5.2a1 1 0 0 1-.9-1.1l4.4-29c.1-.9.7-1.4 1.5-1.4Zm5.6 14.7c2.9 0 5.8 0 6.4-4.1.2-1.4 0-2.5-.5-3.2-1-1.1-2.8-1.1-4.7-1.1h-.8a1 1 0 0 0-.9.8l-1.1 7.6zm32.3-4.2h5.2c.6 0 1 .5.9 1l-2.8 18.6c-.1.8-.7 1.4-1.5 1.4h-4.6c-.6 0-1-.6-1-1.1l.3-1.5s-2.6 3-7.2 3c-2.7 0-5-.8-6.5-2.7a10.6 10.6 0 0 1-2-8.3c1-6.4 6-11 11.6-11 2.5 0 5 .6 6.2 2.3l.3.6.2-1.5a1 1 0 0 1 1-.8Zm-7.8 15.7c3 0 5.3-2 5.8-5.2.2-1.5 0-2.8-.9-3.8-.8-1-2-1.5-3.4-1.5-3 0-5.4 2.2-5.8 5.2-.3 1.5 0 2.9.8 3.8.7 1 2 1.5 3.5 1.5" clipRule="evenodd"></path><path fill="#253B80" d="M133 21.7h-5.2c-.5 0-1 .2-1.2.7l-7.2 11-3-10.6c-.3-.7-.9-1.1-1.5-1.1h-5.1c-.7 0-1 .6-.9 1.2l5.7 17.6-5.3 8c-.5.6 0 1.5.7 1.5h5.2c.5 0 1-.3 1.2-.7l17.3-26.2c.5-.6 0-1.4-.7-1.4"></path><path fill="#179BD7" fillRule="evenodd" d="M139.4 11.2h10.8c3.7 0 6.4 1 8 2.9 1.3 1.7 1.8 4.2 1.3 7.3-1 7.1-5.2 10.8-12.3 10.8h-3.4c-.8 0-1.4.5-1.5 1.3l-1.3 8.2c0 .6-.5 1-1 1h-5.6c-.5 0-1-.6-.8-1.1l4.3-29c.1-.9.8-1.4 1.5-1.4m5.7 14.7c2.8 0 5.8 0 6.4-4.1.2-1.4 0-2.5-.5-3.2-1-1.1-2.8-1.1-4.8-1.1h-.7a1 1 0 0 0-1 .8l-1 7.6zm32.3-4.2h5.2c.5 0 1 .5.9 1l-2.8 18.6c-.2.8-.8 1.4-1.5 1.4h-4.7c-.6 0-1-.6-.9-1.1l.2-1.5s-2.5 3-7.1 3c-2.7 0-5-.8-6.5-2.7a10.6 10.6 0 0 1-2-8.3c1-6.4 5.9-11 11.6-11 2.5 0 5 .6 6.1 2.3l.4.6.2-1.5a1 1 0 0 1 .9-.8m-7.9 15.7c3 0 5.3-2 5.8-5.2.3-1.5 0-2.8-.8-3.8s-2-1.5-3.5-1.5c-3 0-5.3 2.2-5.8 5.2-.2 1.5 0 2.9.8 3.8.8 1 2 1.5 3.5 1.5" clipRule="evenodd"></path><path fill="#179BD7" d="m188.7 12-4.5 29.6c0 .5.4 1 1 1h4.4c.7 0 1.4-.5 1.5-1.3l4.3-29c.1-.6-.3-1.1-.8-1.1h-5a1 1 0 0 0-1 .8Z"></path><path fill="#253B80" d="m11.5 48.3.8-5.5H1.7L7.7 2a.5.5 0 0 1 .3-.3.5.5 0 0 1 .3-.1H23c5 0 8.3 1 10.1 3.2A6 6 0 0 1 34.7 8a12 12 0 0 1 0 4.3v1.2l.9.6c.7.4 1.2.8 1.7 1.3a7 7 0 0 1 1.3 3.2 19.4 19.4 0 0 1-2 10 10.7 10.7 0 0 1-6.8 5.1q-2.1.6-4.8.6h-1.2c-.8 0-1.6.3-2.2.9a3.7 3.7 0 0 0-1.2 2.2l-.1.5-1.5 9.7v.3l-.1.2a.2.2 0 0 1-.2.1h-7.1Z"></path><path fill="#179BD7" d="m36.5 12.7-.2 1c-2 10.4-8.7 14-17.2 14h-4.4c-1 0-1.9.9-2 2l-2.3 14.8-.6 4.1c-.1.8.4 1.4 1.1 1.4h7.7c1 0 1.7-.7 1.9-1.6v-.5l1.5-9.6v-.5a2 2 0 0 1 2-1.7h1c7.5 0 13.4-3.2 15.1-12.4.7-3.8.4-7-1.5-9.3a7.4 7.4 0 0 0-2.1-1.7"></path><path fill="#222D65" d="M34.4 11.8a15 15 0 0 0-1.9-.4 23 23 0 0 0-3.8-.3H17c-.3 0-.5 0-.8.2a2 2 0 0 0-1 1.5l-2.5 16.4v.4a2 2 0 0 1 2-1.8h4.4c8.5 0 15.2-3.7 17.2-14.2l.1-.9a10 10 0 0 0-1.6-.7 15 15 0 0 0-.4-.2"></path><path fill="#253B80" d="M15.2 12.8a2 2 0 0 1 1-1.5l.8-.2h11.7c1.3 0 2.6.1 3.8.3a15 15 0 0 1 2.3.6l1.7.7c.5-3.9 0-6.5-2-9C32.1 1.2 28.1 0 23 0H8.3c-1 0-2 .8-2.1 1.9L0 42.9c-.1.8.5 1.6 1.3 1.6h9.1l2.3-15.3z"></path></g><defs><clipPath id="paypal-logo_svg__a"><path fill="#fff" d="M0 0h195.5v50H0z"></path></clipPath></defs></svg>
                  </div>
                </div>
                <div className={`${styles.dropdownPaypal} ${formValues.paymentOption==="paypal" && styles.open}`}>
                  <div className={styles.container}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-252.3 356.1 163 80.9" className={styles.paymentSVG}><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"></path><circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"></path></svg>
                    <div className={styles.paymentText}>{`After clicking "Pay with PayPal", you will be redirected to PayPal to complete your purchase securely.`}</div>
                  </div>
                </div>
                <div className={`${styles.shopPay} ${formValues.paymentOption==="shopPay" && styles.chosenPayment}`}>
                  <div className={styles.radioButton}>
                    <input
                      type='radio'
                      value='shopPay'
                      {...register("paymentOption")}
                      onClick={()=>setValue("shippingSameAsBilling", false)}
                    />
                  </div>
                  <div className={styles.title}>
                    <Image
                      src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/shop-pay-logo.B-h0fSp6.svg"
                      width={80}
                      height={18}
                      alt='Shop Pay Icon'
                    />
                    Pay in full or in installments
                  </div>
                </div>
                <div className={`${styles.afterPay} ${formValues.paymentOption==="afterPay" && styles.chosenPayment}`}>
                  <div className={styles.radioButton}>
                    <input
                      type='radio'
                      value='afterPay'
                      {...register("paymentOption")}
                      onClick={()=>setValue("shippingSameAsBilling", false)}
                    />
                  </div>
                  <div className={styles.title}>Afterpay</div>
                  <Image
                    src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/afterpay.B5PfoQU9.svg"
                    width={38}
                    height={18}
                    alt='Afterpay logo'
                  />
                </div>
                <div className={`${styles.dropdownAfterPay} ${formValues.paymentOption==="afterPay" && styles.open}`}>
                  <div className={styles.container}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-252.3 356.1 163 80.9" className={styles.paymentSVG}><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"></path><circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"></path></svg>
                    <div className={styles.paymentText}>After clicking “Pay now”, you will be redirected to Afterpay to complete your purchase securely.</div>
                  </div>
                </div>
              </div>
              {
                formValues.paymentOption === 'creditCard' ?
                <div className={styles.rememberMeContainer}>
                  <h3 className={styles.rememberMeHeader}>Remember me</h3>
                  <div className={styles.rememberMeInputContainer}>
                    <div className={styles.saveInfo}>
                      <div className={`${styles.checkboxInput} ${formValues.saveInfo && styles.checked}`}>
                        <input
                          type="checkbox"
                          id="saveInfoCheckbox"
                          {...register('saveInfo')}
                        />
                        <label htmlFor="saveInfoCheckbox" className={styles.icon}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m1.5 7.097 3.596 3.602c.104.105.156.157.216.175a.25.25 0 0 0 .16-.004c.059-.022.108-.077.206-.188L12.5 3"></path>
                          </svg>
                        </label>
                      </div>
                      <div className={styles.subscribe}>
                        Save my information for a faster checkout {formValues.saveInfo && "with a Shop account"}
                      </div>
                    </div>
                    <div className={`${styles.dropdownRememberMe} ${formValues.saveInfo && styles.open}`}>
                      <div className={styles.rememberMePhone}>
                        <div className={styles.inputContainer}>
                          <span className={styles.icon}>
                          <svg fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M17,23a2,2,0,0,0,2-2V3a2,2,0,0,0-2-2H7A2,2,0,0,0,5,3V21a2,2,0,0,0,2,2ZM7,3H9.5L10,4h4l.5-1H17V21H7Zm6,16a1,1,0,1,1-1-1A1,1,0,0,1,13,19Z"></path></g></svg></span>
                          <label className={`${styles.inputLabel} ${formValues.rememberMePhone ? styles.showLabel : ''}`}>Mobile phone number</label>
                          <input className={`${styles.inputText} ${formValues.rememberMePhone !== "" ? styles.inputUpdate : ''} ${errors.rememberMePhone ? styles.wrongEntry : ""}`}
                            type='text'
                            placeholder='Mobile phone number'
                            {...register('rememberMePhone', {
                              required: formValues.saveInfo ? 'Enter phone number' : false,
                              pattern: {
                                value: /^(1\s)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
                                message: 'The specified phone number does not match the expected pattern.',
                              },
                            })}
                          />
                        </div>
                        {
                          errors.rememberMePhone && formValues.rememberMePhone ?
                          <div className={styles.wrongEntryMessage} >
                            {errors.rememberMePhone.message}
                          </div>
                          : null
                        }
                      </div>
                    </div>
                  </div>
                  <div className={styles.secureEncryptedContainer}>
                    <div className={styles.secureEncrypted}>
                      <div className={styles.lockIcon}>
                        <svg viewBox="-3 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="rgba(255, 255, 255, 0.66)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                      </div>
                      <div className={styles.text}>Secure and encrypted</div>
                    </div>
                    <div className={styles.shopIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 50 20" fill="rgba(255, 255, 255, 0.66)"><path d="m9.095 6.766-2.33 1.186C6.233 7.035 5.5 6.565 4.48 6.565q-1.665 0-1.665 1.007c0 .716.821.873 2.663 1.275 1.842.403 3.931.985 3.931 3.29 0 2.238-1.73 3.58-4.593 3.58-2.308 0-4.02-.984-4.816-2.73l2.33-1.163c.488 1.077 1.331 1.633 2.486 1.633 1.198 0 1.797-.335 1.797-1.052 0-.716-.823-.872-2.668-1.275C2.101 10.727.02 10.145.02 7.84c0-2.17 1.709-3.536 4.46-3.536 2.153 0 3.773.873 4.615 2.462M11.05.5h2.884v5.102c.754-.828 1.842-1.298 3.085-1.298 2.485 0 4.26 1.925 4.26 4.655v6.646h-2.884V8.959c0-1.275-.932-2.216-2.22-2.216-1.287 0-2.24.962-2.24 2.216v6.646h-2.886zM23.166 5.11c.954-.671 2.33-1.14 3.795-1.14 3.906 0 6.746 2.663 6.746 6.311 0 3.401-2.441 5.774-5.837 5.774-2.907 0-4.992-1.97-4.992-4.61 0-1.79 1.067-3.111 2.574-3.626l1.22 2.082c-.82.38-1.13.94-1.13 1.633 0 1.14.955 1.947 2.33 1.947 1.687 0 3.018-1.343 3.018-3.155 0-2.127-1.664-3.737-3.927-3.737a4.5 4.5 0 0 0-2.508.738zM38.19 14.33v5.17h-2.885V4.417h2.818V5.78c.866-.94 2.086-1.477 3.462-1.477 3.04 0 5.415 2.484 5.415 5.707s-2.375 5.707-5.415 5.707c-1.354 0-2.53-.515-3.395-1.388m5.947-4.341c0-1.858-1.287-3.223-3.04-3.223-1.731 0-3.04 1.388-3.04 3.223s1.309 3.223 3.04 3.223c1.753 0 3.042-1.366 3.042-3.223z"></path></svg>
                    </div>
                  </div>
                </div>
                :
                <div className={styles.billingAddressContainer}>
                  <h3 className={styles.billingAddressHeader}>Billing address</h3>
                  <div className={styles.billingAddressOptions}>
                    <div className={`${styles.sameAsShipping} ${formValues.billingAddressOption==="sameAsShipping" && styles.chosenShipping}`}>
                      <div className={styles.radioButton}>
                        <input
                          type='radio'
                          value='sameAsShipping'
                          {...register("billingAddressOption")}
                        />
                      </div>
                      <div className={styles.title}>Same as shipping address</div>
                    </div>
                    <div className={`${styles.differentBilling} ${formValues.billingAddressOption==="differentBilling" && styles.chosenShipping}`}>
                      <div className={styles.radioButton}>
                        <input
                          type='radio'
                          value='differentBilling'
                          {...register("billingAddressOption")}
                        />
                      </div>
                      <div className={styles.title}>Use a different billing address</div>
                    </div>
                    <div className={`${styles.dropdownDifferentBilling} ${formValues.billingAddressOption==="differentBilling" && styles.open}`}>
                      <div className={styles.billingAddressFormContainer}>
                        <div className={styles.billingCountryRegion}>
                          <label className={`${styles.label} ${formValues.billingCountryRegion && styles.selected}`}>
                            Country/Region
                          </label>
                          <select {...register("billingCountryRegion")} className={styles.select}>
                            <option hidden value="">&nbsp;</option>
                            {Countries_Regions.map((country:FormValueTypes, i:number) => {
                              return (
                                <option value={country.value} key={i}>{country.label}</option>
                              )
                            })}
                          </select>
                          <div className={styles.svgContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"></path></svg>
                          </div>
                        </div>
                        <div className={styles.billingNameWrapper}>
                          <div className={styles.firstName}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingFirstName ? styles.showLabel : ""}`}>First name</label>
                              <input className={`${styles.inputText} ${formValues.billingFirstName !== "" ? styles.inputUpdate : ""} ${errors.billingFirstName ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="First name"
                                {...register('billingFirstName', {
                                  required: differentBilling ? 'Enter a first name' : false,
                                  pattern: {
                                    value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                                    message: 'Enter a valid first name',
                                  },
                                })}
                                />
                            </div>
                            {
                              errors.billingFirstName ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingFirstName.message}
                              </div>
                              : null
                            }
                          </div>
                          <div className={styles.lastName}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingLastName ? styles.showLabel : ""}`}>Last name</label>
                              <input className={`${styles.inputText} ${formValues.billingLastName !== "" ? styles.inputUpdate : ""} ${errors.billingLastName ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="Last name"
                                {...register('billingLastName', {
                                  required: differentBilling ? 'Enter a last name' : false,
                                  pattern: {
                                    value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                                    message: 'Enter a last name',
                                  },
                                })}
                                />
                            </div>
                            {
                              errors.billingLastName ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingLastName.message}
                              </div>
                              : null
                            }
                          </div>
                        </div>
                        <div className={styles.address}>
                          <div className={styles.inputContainer}>
                            <label className={`${styles.inputLabel} ${formValues.billingAddress ? styles.showLabel : ""}`}>Address</label>
                            <input className={`${styles.inputText} ${formValues.billingAddress !== "" ? styles.inputUpdate : ""} ${errors.billingAddress ? styles.wrongEntry : ""}`}
                              type='text'
                              placeholder="Address"
                              {...register('billingAddress', {
                                required: differentBilling ? 'Enter an address' : false,
                                pattern: {
                                  value: /^\d+\s+[A-Za-z\s]+(?:[A-Za-z0-9#-.]+)?$/,
                                  message: 'Enter a address',
                                },
                              })}
                            />
                          </div>
                          {
                            errors.billingAddress ?
                            <div className={styles.wrongEntryMessage} >
                              {errors.billingAddress.message}
                            </div>
                            : null
                          }
                        </div>
                        <div className={styles.apartment}>
                          <div className={styles.inputContainer}>
                            <label className={`${styles.inputLabel} ${formValues.billingApartment ? styles.showLabel : ""}`}>Apartment, suite, etc. (optional)</label>
                            <input className={`${styles.inputText} ${formValues.billingApartment !== "" ? styles.inputUpdate : ""} ${errors.billingApartment ? styles.wrongEntry : ""}`}
                              type='text'
                              placeholder="Apartment, suite, etc. (optional)"
                              {...register('billingApartment')}
                            />
                          </div>
                        </div>
                        <div className={styles.region}>
                          <div className={styles.city}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingCity ? styles.showLabel : ""}`}>City</label>
                              <input className={`${styles.inputText} ${formValues.billingCity !== "" ? styles.inputUpdate : ""} ${errors.billingCity ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="City"
                                {...register('billingCity', {
                                  required: differentBilling ? 'Enter a city' : false,
                                  pattern: {
                                    value: /^[A-Za-z\s-]+$/,
                                    message: 'Enter a valid city',
                                  },
                                })}
                              />
                            </div>
                            {
                              errors.billingCity ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingCity.message}
                              </div>
                              : null
                            }
                          </div>
                          {
                            formValues.billingCountryRegion !== "GB" &&
                            <div className={styles.state}>
                              <label className={`${styles.label} ${formValues.billingState && styles.selected}`}>
                                {billingFormStates.statesProvinceLabel}
                              </label>
                              <select {...register("billingState")} className={styles.select}>
                                <option hidden value="">&nbsp;</option>
                                {billingFormStates.statesProvince.map((state:FormValueTypes, i:number) => {
                                  return (
                                    <option value={state.value} key={i}>{state.label}</option>
                                  )
                                })}
                              </select>
                              <div className={styles.svgContainer}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"></path></svg>
                              </div>
                            </div>
                          }
                          <div className={styles.zip}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingZipcode ? styles.showLabel : ""}`}>{billingFormStates.postLabel}</label>
                              <input className={`${styles.inputText} ${formValues.billingZipcode !== "" ? styles.inputUpdate : ""} ${errors.billingZipcode ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder={billingFormStates.postLabel}
                                {...register('billingZipcode', {
                                  required: differentBilling ? 'Enter a ZIP / postal code' : false,
                                  pattern: {
                                    value: /^\d{5}(?:-\d{4})?$/,
                                    message: 'Enter a valid zip code',
                                  },
                                })}
                              />
                            </div>
                            {
                              errors.billingZipcode ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingZipcode.message}
                              </div>
                              : null
                            }
                          </div>
                        </div>
                        <div className={styles.phone}>
                          <div className={styles.inputContainer}>
                            <label className={`${styles.inputLabel} ${formValues.billingPhone ? styles.showLabel : ""}`}>Phone (optional)</label>
                            <input className={`${styles.inputText} ${formValues.billingPhone !== "" ? styles.inputUpdate : ""} ${errors.billingPhone ? styles.wrongEntry : ""}`}
                              type='text'
                              placeholder="Phone (optional)"
                              {...register('billingPhone', {
                                pattern: {
                                  value: /^(1\s)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
                                  message: 'Enter a valid phone number',
                                },
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            {/* {
              formValues.paymentOption === 'paypal' ?
              <button type="submit" className={styles.payWithPaypalButton}>Pay with PayPal</button>
              :
            } */}
            <button type="submit" className={styles.payNowButton}>Pay now</button>
            <div className={styles.border}></div>
          </form>
          <div className={styles.companyPolicies}>
            <span>Refund policy</span>
            <span>Shipping policy</span>
            <span>Privacy policy</span>
            <span>Terms of service</span>
            <span>Contact information</span>
          </div>
        </div>
        <div className={styles.itemsContainer}>
          {/* <div className={styles.items}>asd</div> */}
          <Items
            showShipping={showShipping}
          />
        </div>
      </div>
    </div>
  )
}