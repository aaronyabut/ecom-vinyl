'use client'

import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

interface FormData {
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

export default function Checkout () {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: 'TEST@TEST.com',
      subscribe: true,
      country: 'TEST',
      firstName: 'TEST',
      lastName: 'TEST',
      address: '123 TEST',
      apartment: '',
      city: 'TEST',
      state: 'TE',
      zipcode: '12345',
      phone: '',
      textAlert: false,
      textMePhoneNumber: '',
      shippingOption: 'usps',
      paymentOption:'creditCard',
      creditCardNumber: '',
      expirationDate: '',
      securityCode: '',
      nameOnCard: '',
      shippingSameAsBilling: false,
      billingCountryRegion: '',
      billingFirstName: '',
      billingLastName: '',
      billingAddress: '',
      billingApartment: '',
      billingCity: '',
      billingState: '',
      billingZipcode: '',
      billingPhone: '',
      saveInfo: false,
      rememberMeContact: '+1 ',
      billingAddressOption: 'differentBilling'
    },
  });

  const formValues = watch(); // Watch all fields

  const [showShipping, setShowShipping] = useState(false);

  const differentBilling = formValues.billingAddressOption==='differentBilling' && formValues.paymentOption !== 'creditCard';

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // alert(JSON.stringify(data));
    alert(formValues.paymentOption);
    console.log(formValues.paymentOption);
    console.log(JSON.stringify(data));
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.navContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0704/2026/7313/files/Vinyl_1_x320.png?v=1692630836"
              height={40}
              width={168}
              alt="Vinyl logo"
              priority
            />
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
              <div>SHOP</div>
              <div>PAYPAL</div>
              <div>G PAY</div>
              <div>VENMO</div>
              <div>{formValues.paymentOption}</div>
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
                <div className={styles.inputContainer}>
                  <label className={`${styles.inputLabel} ${formValues.country ? styles.showLabel : ""}`}>Country/Region</label>
                  <input className={`${styles.inputText} ${formValues.country !== "" ? styles.inputUpdate : ""} ${errors.country ? styles.wrongEntry : ""}`}
                    type='text'
                    placeholder="Country/Region"
                    {...register('country', {
                      required: 'Enter a country',
                      pattern: {
                        value: /^[A-Za-z\s-]+(?:\([A-Za-z\s-]+\))?$/,
                        message: 'Enter a valid country',
                      },
                    })}
                  />
                </div>
                {
                  errors.country ?
                  <div className={styles.wrongEntryMessage} >
                    {errors.country.message}
                  </div>
                  : null
                }
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
                <div className={styles.state}>
                  <div className={styles.inputContainer}>
                    <label className={`${styles.inputLabel} ${formValues.state ? styles.showLabel : ""}`}>State</label>
                    <input className={`${styles.inputText} ${formValues.state !== "" ? styles.inputUpdate : ""} ${errors.state ? styles.wrongEntry : ""}`}
                      type='text'
                      placeholder="State"
                      {...register('state', {
                        required: 'Select a state / province',
                        pattern: {
                          value: /^[A-Z]{2}$/,
                          message: 'Enter a valid state',
                        },
                      })}
                    />
                  </div>
                  {
                    errors.state ?
                    <div className={styles.wrongEntryMessage} >
                      {errors.state.message}
                    </div>
                    : null
                  }
                </div>
                <div className={styles.zip}>
                  <div className={styles.inputContainer}>
                    <label className={`${styles.inputLabel} ${formValues.zipcode ? styles.showLabel : ""}`}>ZIP code</label>
                    <input className={`${styles.inputText} ${formValues.zipcode !== "" ? styles.inputUpdate : ""} ${errors.zipcode ? styles.wrongEntry : ""}`}
                      type='text'
                      placeholder="ZIP code"
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
                          value: /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
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
                      required: formValues.textAlert ? 'The specified phone number does not match the expected pattern.' : false,
                      pattern: {
                        value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                        message: 'The specified phone number does not match the expected pattern.',
                      },
                    })}
                    />
                </div>
                {
                  errors.rememberMeContact ?
                  <div className={styles.wrongEntryMessage} >
                    {errors.rememberMeContact.message}
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
              {showShipping ?
                <div className={styles.shippingOptions}>
                  <div className={`${styles.usps} ${formValues.shippingOption==="usps" && styles.chosenShipping}`}>
                    <div className={styles.radioButton}>
                      <input
                        type='radio'
                        value='usps'
                        {...register("shippingOption")}
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
                    />
                  </div>
                  <div className={styles.title}>Credit card</div>
                  <div>logo</div>
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
                              value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
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
                          <label className={`${styles.inputLabel} ${formValues.expirationDate ? styles.showLabel : ""}`}>Expiration date (MM /YY)</label>
                          <input className={`${styles.inputText} ${formValues.expirationDate !== "" ? styles.inputUpdate : ""} ${errors.expirationDate ? styles.wrongEntry : ""}`}
                            type='text'
                            placeholder="Expiration date (MM /YY)"
                            {...register('expirationDate', {
                              required: formValues.paymentOption==='creditCard' ? 'Enter expiration date' : false,
                              pattern: {
                                value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
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
                                value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
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
                          <div className={styles.inputContainer}>
                            <label className={`${styles.inputLabel} ${formValues.billingCountryRegion ? styles.showLabel : ""}`}>Country / Region</label>
                            <input className={`${styles.inputText} ${formValues.billingCountryRegion !== "" ? styles.inputUpdate : ""} ${errors.billingCountryRegion ? styles.wrongEntry : ""}`}
                              type='text'
                              placeholder="Country / Region"
                              {...register('billingCountryRegion', {
                                required: formValues.paymentOption==='creditCard' ? 'Enter Country / Region' : false,
                                pattern: {
                                  value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                                  message: 'Enter a country / region',
                                },
                              })}
                            />
                          </div>
                          {
                            errors.billingCountryRegion ?
                            <div className={styles.wrongEntryMessage} >
                              {errors.billingCountryRegion.message}
                            </div>
                            : null
                          }
                        </div>
                        <div className={styles.billingNameWrapper}>
                          <div className={styles.firstName}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingFirstName ? styles.showLabel : ""}`}>First name</label>
                              <input className={`${styles.inputText} ${formValues.billingFirstName !== "" ? styles.inputUpdate : ""} ${errors.billingFirstName ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="First name"
                                {...register('billingFirstName', {
                                  required: formValues.paymentOption==='creditCard' ? 'Enter a first name' : false,
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
                                  required: formValues.paymentOption==='creditCard' ? 'Enter a last name' : false,
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
                                required: formValues.paymentOption==='creditCard' ? 'Enter an address' : false,
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
                                  required: formValues.paymentOption==='creditCard' ? 'Enter a city' : false,
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
                          <div className={styles.state}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingState ? styles.showLabel : ""}`}>State</label>
                              <input className={`${styles.inputText} ${formValues.billingState !== "" ? styles.inputUpdate : ""} ${errors.billingState ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="State"
                                {...register('billingState', {
                                  required: formValues.paymentOption==='creditCard' ? 'Select a state / province' : false,
                                  pattern: {
                                    value: /^[A-Z]{2}$/,
                                    message: 'Enter a valid state',
                                  },
                                })}
                              />
                            </div>
                            {
                              errors.billingState ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingState.message}
                              </div>
                              : null
                            }
                          </div>
                          <div className={styles.zip}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingZipcode ? styles.showLabel : ""}`}>ZIP code</label>
                              <input className={`${styles.inputText} ${formValues.billingZipcode !== "" ? styles.inputUpdate : ""} ${errors.billingZipcode ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="ZIP code"
                                {...register('billingZipcode', {
                                  required: formValues.paymentOption==='creditCard' ? 'Enter a ZIP / postal code' : false,
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
                                  value: /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
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
                    />
                  </div>
                  <div className={styles.title}>PayPal</div>
                  <div>logo</div>
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
                    />
                  </div>
                  <div className={styles.title}>Shop Pay</div>
                  <div>logo</div>
                </div>
                <div className={`${styles.afterPay} ${formValues.paymentOption==="afterPay" && styles.chosenPayment}`}>
                  <div className={styles.radioButton}>
                    <input
                      type='radio'
                      value='afterPay'
                      {...register("paymentOption")}
                    />
                  </div>
                  <div className={styles.title}>Afterpay</div>
                  <div>logo</div>
                </div>
                <div className={`${styles.dropdownAfterPay} ${formValues.paymentOption==="afterPay" && styles.open}`}>
                  <div className={styles.container}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-252.3 356.1 163 80.9" className={styles.paymentSVG}><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"></path><circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"></path></svg>
                    <div className={styles.paymentText}>After clicking “Pay now”, you will be redirected to Afterpay to complete your purchase securely.</div>
                  </div>
                </div>
              </div>
              {formValues.paymentOption === 'creditCard' ?
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
                      <div className={styles.subscribe}>
                        Save my information for a faster checkout {formValues.saveInfo && "with a Shop account"}
                      </div>
                    </div>
                    <div className={`${styles.dropdownRememberMe} ${formValues.saveInfo && styles.open}`}>
                      <div className={styles.rememberMeContact}>
                        <div className={styles.inputContainer}>
                          <span className={styles.icon}>
                          <svg fill="#707070" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M17,23a2,2,0,0,0,2-2V3a2,2,0,0,0-2-2H7A2,2,0,0,0,5,3V21a2,2,0,0,0,2,2ZM7,3H9.5L10,4h4l.5-1H17V21H7Zm6,16a1,1,0,1,1-1-1A1,1,0,0,1,13,19Z"></path></g></svg>
                          </span>
                          <label className={`${styles.inputLabel} ${formValues.rememberMeContact ? styles.showLabel : ''}`}>Mobile phone number</label>
                          <input className={`${styles.inputText} ${formValues.rememberMeContact !== "" ? styles.inputUpdate : ''} ${errors.rememberMeContact ? styles.wrongEntry : ""}`}
                            type='text'
                            placeholder='Mobile phone number'
                            {...register('rememberMeContact', {
                              required: formValues.saveInfo ? 'The specified phone number does not match the expected pattern.' : false,
                              pattern: {
                                value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                                message: 'The specified phone number does not match the expected pattern.',
                              },
                            })}
                            />
                        </div>
                        {
                          errors.rememberMeContact ?
                          <div className={styles.wrongEntryMessage} >
                            {errors.rememberMeContact.message}
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 50 20" fill="rgba(255, 255, 255, 0.66)"><path  d="m9.095 6.766-2.33 1.186C6.233 7.035 5.5 6.565 4.48 6.565q-1.665 0-1.665 1.007c0 .716.821.873 2.663 1.275 1.842.403 3.931.985 3.931 3.29 0 2.238-1.73 3.58-4.593 3.58-2.308 0-4.02-.984-4.816-2.73l2.33-1.163c.488 1.077 1.331 1.633 2.486 1.633 1.198 0 1.797-.335 1.797-1.052 0-.716-.823-.872-2.668-1.275C2.101 10.727.02 10.145.02 7.84c0-2.17 1.709-3.536 4.46-3.536 2.153 0 3.773.873 4.615 2.462M11.05.5h2.884v5.102c.754-.828 1.842-1.298 3.085-1.298 2.485 0 4.26 1.925 4.26 4.655v6.646h-2.884V8.959c0-1.275-.932-2.216-2.22-2.216-1.287 0-2.24.962-2.24 2.216v6.646h-2.886zM23.166 5.11c.954-.671 2.33-1.14 3.795-1.14 3.906 0 6.746 2.663 6.746 6.311 0 3.401-2.441 5.774-5.837 5.774-2.907 0-4.992-1.97-4.992-4.61 0-1.79 1.067-3.111 2.574-3.626l1.22 2.082c-.82.38-1.13.94-1.13 1.633 0 1.14.955 1.947 2.33 1.947 1.687 0 3.018-1.343 3.018-3.155 0-2.127-1.664-3.737-3.927-3.737a4.5 4.5 0 0 0-2.508.738zM38.19 14.33v5.17h-2.885V4.417h2.818V5.78c.866-.94 2.086-1.477 3.462-1.477 3.04 0 5.415 2.484 5.415 5.707s-2.375 5.707-5.415 5.707c-1.354 0-2.53-.515-3.395-1.388m5.947-4.341c0-1.858-1.287-3.223-3.04-3.223-1.731 0-3.04 1.388-3.04 3.223s1.309 3.223 3.04 3.223c1.753 0 3.042-1.366 3.042-3.223z"></path></svg>
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
                          <div className={styles.inputContainer}>
                            <label className={`${styles.inputLabel} ${formValues.billingCountryRegion ? styles.showLabel : ""}`}>Country / Region</label>
                            <input className={`${styles.inputText} ${formValues.billingCountryRegion !== "" ? styles.inputUpdate : ""} ${errors.billingCountryRegion ? styles.wrongEntry : ""}`}
                              type='text'
                              placeholder="Country / Region"
                              {...register('billingCountryRegion', {
                                required: differentBilling ? 'Enter a country / region' : false,
                                pattern: {
                                  value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                                  message: 'Enter a valid name',
                                },
                              })}
                            />
                          </div>
                          {
                            errors.billingCountryRegion ?
                            <div className={styles.wrongEntryMessage} >
                              {errors.billingCountryRegion.message}
                            </div>
                            : null
                          }
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
                          <div className={styles.state}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingState ? styles.showLabel : ""}`}>State</label>
                              <input className={`${styles.inputText} ${formValues.billingState !== "" ? styles.inputUpdate : ""} ${errors.billingState ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="State"
                                {...register('billingState', {
                                  required: differentBilling ? 'Select a state / province' : false,
                                  pattern: {
                                    value: /^[A-Z]{2}$/,
                                    message: 'Enter a valid state',
                                  },
                                })}
                              />
                            </div>
                            {
                              errors.billingState ?
                              <div className={styles.wrongEntryMessage} >
                                {errors.billingState.message}
                              </div>
                              : null
                            }
                          </div>
                          <div className={styles.zip}>
                            <div className={styles.inputContainer}>
                              <label className={`${styles.inputLabel} ${formValues.billingZipcode ? styles.showLabel : ""}`}>ZIP code</label>
                              <input className={`${styles.inputText} ${formValues.billingZipcode !== "" ? styles.inputUpdate : ""} ${errors.billingZipcode ? styles.wrongEntry : ""}`}
                                type='text'
                                placeholder="ZIP code"
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
                                  value: /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
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
            differentBilling: {JSON.stringify(differentBilling)}
            {
              formValues.paymentOption === 'paypal'
              ?
              <button type="submit" className={styles.payWithPaypalButton}>Pay with PayPal</button>
              :
              <button type="submit" className={styles.payNowButton}>Pay now</button>
            }
          </form>
        </div>
        <div className={styles.itemsContainer}>
          <div className={styles.items}>asd</div>
        </div>
      </div>
    </div>
  )
}