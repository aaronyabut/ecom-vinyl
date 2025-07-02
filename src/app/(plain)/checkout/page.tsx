'use client'

import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { useEffect } from 'react';
import styles from './page.module.scss';

interface FormData {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
}

export default function Checkout () {
  const {
    register,
    handleSubmit,
    watch,
    // clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      country: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
    },
  });

  const formValues = watch(); // Watch all fields

  // useEffect (() => {
  //   const checker = () => {
  //     // console.log("formValues.email: ", formValues.email)
  //     // console.log("errors.email: ", errors.email)
  //     // clearErrors('email');
  //     // if (formValues.email && errors.email) {
  //     //   console.log('Clearing email error:', formValues.email);
  //     //   clearErrors('email');
  //     // }
  //   }
  //   checker();
  // }, [formValues.email, errors.email, clearErrors])


  const onSubmit: SubmitHandler<FormData> = (data) => {
    // console.log(data);
    alert(JSON.stringify(data));
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
          <form className={styles.forms}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.expressHeader}>Express checkout</div>
            <div className={styles.expressPayments}>
              <div>SHOP</div>
              <div>PAYPAL</div>
              <div>G PAY</div>
              <div>VENMO</div>
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
                  <input type="checkbox" id="subscribeCheckbox" />
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
                <div className={styles.firstname}>
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
                <div className={styles.lastname}>
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
                {/* <div className={styles.checkbox}>Checkbox</div> */}
                <div className={styles.checkboxInput}>
                  <input type="checkbox" id="textCheckbox" />
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
                <div className={styles.alertMessage}>Text me with news and offers</div>
              </div>
              <div className={styles.shippingHeader}>Shipping method</div>
              <div className={styles.shippingMessage}>Please double-check your address. You won’t be able to change it later.</div>
              <div className={styles.shippingOptions}>
                <div className={styles.usps}>
                  <div className={styles.radioButton}>Radio button</div>
                  <div className={styles.uspsTitle}>USPS Media Mail Parcel</div>
                  <div className={styles.price}>$5.99</div>
                </div>
                <div className={styles.expressShipping}>
                  <div className={styles.radioButton}>Radio button</div>
                  <div className={styles.expressTitle}>48-Hour Express Delivery</div>
                  <div className={styles.price}>$25.99</div>
                </div>
              </div>
              <div className={styles.unselectedShipping}>Enter your shipping address to view available shipping methods.</div>
            </div>
            <div >
              <div>Payment</div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className={styles.itemsContainer}>
          <div className={styles.items}>asd</div>
        </div>
      </div>
    </div>
  )
}