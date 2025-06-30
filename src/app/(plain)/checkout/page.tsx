'use client'

import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { useEffect } from 'react';
import styles from './page.module.scss';

interface FormData {
  email: string;
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
                      required: '',
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
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox" className={styles.icon}>
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
              <input className={styles.inputText} type='text'/>
              <label>Country/Region</label>
              </div>
              <div className={styles.nameWrapper}>
                <div className={styles.firstname}>
                  <input className={styles.inputText} type='text'/>
                  <label>First name</label>
                </div>
                <div className={styles.lastname}>
                  <input className={styles.inputText} type='text'/>
                  <label>Last name</label>
                </div>
              </div>
              <div className={styles.address}>
                <input className={styles.inputText} type='text'/>
                <label>Address</label>
                </div>
              <div className={styles.apartment}>
                <input className={styles.inputText} type='text'/>
                <label>Apartment, suite, etc. (optional)</label>
                </div>
              <div className={styles.region}>
                <div className={styles.city}>
                  <input className={styles.inputText} type='text'/>
                  <label>City</label>
                  </div>
                <div className={styles.state}>
                  <input className={styles.inputText} type='text'/>
                  <label>State</label>
                  </div>
                <div className={styles.zip}>
                  <input className={styles.inputText} type='text'/>
                  <label>ZIP code</label>
                  </div>
              </div>
              <div className={styles.phone}>
                <input className={styles.inputText} type='text'/>
                <label>Phone (optional)</label>
                </div>
              <div className={styles.alerts}>
                <div className={styles.checkbox}>Checkbox</div>
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