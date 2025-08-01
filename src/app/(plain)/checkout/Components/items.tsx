'use client'

import styles from './items.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useShoppingCart } from '@/app/ShoppingCart';
import { useState, useEffect } from 'react';
// import { Vinyl } from '../../../(default)/page'
import Image from 'next/image';

interface FormData {
  discountCode: string;
  currentCode: string;
}

interface DiscountCodeType {
  code: string;
  discount: number;
}

const discountCodes:DiscountCodeType[]  = [
  {
    code: "vinylchucks",
    discount: .10
  },
  {
    code: "thegroove",
    discount: .10
  },
]

interface ShipType {
  showShipping: boolean;
}

// CANT CHANGE STATE FOR SHIP PROTECT

export default function Items ({showShipping} : ShipType) {
  const {
    shoppingCart,
    subTotal,
    shipping,
    shippingProtection,
    shippingProtectionCost,
    cartCount,
  } = useShoppingCart();

  const [subtotalPrice, setSubtotalPrice] = useState(shippingProtection ? Math.floor(((Math.floor(subTotal*100)/100)+(Math.floor(shippingProtectionCost*100)/100))*100)/100 : Math.floor(subTotal*100)/100);
  const [totalSaved, setTotalSaved] = useState(0);

  // let subtotalPrice = shippingProtection ? (subTotal+shippingProtectionCost) : subTotal;
  const taxPrice = shippingProtection ? (subtotalPrice*0.105).toFixed(2) : (subTotal*0.105).toFixed(2);
  const totalPrice = (subtotalPrice+shipping+Number(taxPrice)).toFixed(2);
  const cartTotalItems = shippingProtection ? cartCount+1 : cartCount;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      discountCode: '',
      currentCode: '',
    },
  });

  const formValues = watch();

  useEffect (()=> {
    const discountAdjust = () => {
      if (!formValues.currentCode) {
        setSubtotalPrice(
          shippingProtection ? Math.floor(((Math.floor(subTotal*100)/100)+(Math.floor(shippingProtectionCost*100)/100))*100)/100 : Math.floor(subTotal*100)/100
        );
      }
    }
    const totalSavings = () => {
      // setTotalSaved(subTotal - (subTotal*.10) )
      setTotalSaved(Math.floor((subTotal*.10)*100)/100)
    }
    discountAdjust();
    totalSavings();
  }, [formValues.currentCode])

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // alert(JSON.stringify(data));
    const exists = discountCodes.find((item) => item.code === data.discountCode.toLowerCase())

    if (exists) {
      const subtotalCalc = shippingProtection ? ((subTotal-(subTotal*exists.discount))+shippingProtectionCost).toFixed(2) : (subTotal-(subTotal*exists.discount)).toFixed(2)
      setSubtotalPrice(Number(subtotalCalc));
      // setDiscountPercentage(exists.discount)
      setValue('currentCode', data.discountCode)
    }
  };

  return (
    <div className={styles.itemsContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.itemList}>
          {
            shoppingCart.map((item, i) => {
              const totalSingleItemCost = Math.floor((item.price*item.quantity)*100)/100;
              const totalSingleItemCostWithDiscount = Math.floor((totalSingleItemCost - Math.floor((totalSingleItemCost*.10)*100)/100)*100)/100;
              // const savedAmount = Math.floor((totalSingleItemCost-totalSingleItemCostWithDiscount)*100)/100;
              const savedAmount = totalSingleItemCost-totalSingleItemCostWithDiscount;
              // const totalSingleItemCost = item.price*item.quantity;
              return (
                <div key={i} className={styles.item}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={item.vinyl_img}
                      height={64}
                      width={64}
                      alt="Album image"
                      className={styles.image}
                    />
                    <div className={styles.quantity}>{item.quantity}</div>
                  </div>
                  <div className={styles.artistTitleContainer}>
                    <div className={styles.artistTitle}>
                      {
                        item.product_id === -1 ?
                        <div>{item.vinyl_title}</div>
                        :
                        <div>{item.vinyl_artist} - {item.vinyl_title}</div>
                      }
                    </div>
                    {
                      formValues.currentCode &&
                      <div className={styles.itemInfo}>
                        <span className={styles.svgTagContainer}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svgTag}><g stroke-linejoin="round" clip-path="url(#a)"><path stroke-linecap="round" d="M10.5 1.5H7.93a2.5 2.5 0 0 0-1.8.766L1.52 7.052a1.5 1.5 0 0 0 .02 2.101l3.48 3.48a1.25 1.25 0 0 0 1.75.016l5.116-4.926a2 2 0 0 0 .613-1.441V3.5a2 2 0 0 0-2-2"></path><circle cx="9.5" cy="4.5" r="0.563" stroke-linecap="round"></circle><path d="M9.49 4.49h.02v.02h-.02z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h14v14H0z"></path></clipPath></defs></svg>
                        </span>
                        <span className={styles.discountLabel}>
                          {formValues.currentCode.toUpperCase()}
                        </span>
                        <span className={styles.savedAmount}>
                          {`(-$${savedAmount.toFixed(2)})`}
                        </span>
                      </div>
                    }
                  </div>
                  <div className={styles.priceContainer}>
                    {
                      formValues.currentCode ?
                      <div className={styles.priceContainer}>
                        <div className={styles.oldPrice}>
                          ${totalSingleItemCost.toFixed(2)}
                        </div>
                        <div className={styles.newPrice}>
                          ${totalSingleItemCostWithDiscount.toFixed(2)}
                        </div>
                      </div>
                      :
                      <div className={styles.price}>
                        ${totalSingleItemCost.toFixed(2)}
                      </div>
                    }
                  </div>
                </div>
              )
            })
          }
          {
            shippingProtection &&
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <Image
                  src={"https://cdn.shopify.com/s/files/1/0704/2026/7313/files/10020953850161_85quality_monster-protect-1_64x64.webp?v=1734325743"}
                  height={64}
                  width={64}
                  alt="Album image"
                  className={styles.image}
                />
                <div className={styles.quantity}>1</div>
              </div>
              <div className={styles.artistTitleContainer}>
                <div className={styles.artistTitle}>
                  Shipping protection
                </div>
                <div className={styles.itemInfo}>
                  {Number(shippingProtectionCost)}
                </div>
              </div>
              <div className={styles.priceContainer}>
                <div className={styles.price}>
                    ${Number(shippingProtectionCost)}
                </div>
              </div>
            </div>
          }
<></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></><></>
        </div>
        <div className={styles.discountCode}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.input}>
              <div className={styles.inputContainer}>
                <label className={`${styles.inputLabel} ${formValues.discountCode ? styles.showLabel : ""}`}>Discount code or gift card</label>
                <input className={`${styles.inputText} ${formValues.discountCode !== "" ? styles.inputUpdate : ""}`}
                  // ${errors.discountCode ? styles.wrongEntry : ""}
                  type='text'
                  placeholder="Discount code or gift card"
                  {...register('discountCode', {
                    required: 'Enter a first name',
                    pattern: {
                      value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                      message: 'Enter a valid discoount code',
                    },
                  })}
                  />
              </div>
              {/* {
                errors.discountCode ?
                <div className={styles.wrongEntryMessage} >
                  {errors.discountCode.message}
                </div>
                : null
              } */}
            </div>
            <button type='submit' className={`${formValues.discountCode ? styles.active : styles.inactive}`}>
              Apply
            </button>
          </form>
          {
            formValues.currentCode &&
            <div className={styles.discountTagContainer}>
              <div className={styles.svgTagContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svgTag}><g stroke-linejoin="round" clip-path="url(#a)"><path stroke-linecap="round" d="M10.5 1.5H7.93a2.5 2.5 0 0 0-1.8.766L1.52 7.052a1.5 1.5 0 0 0 .02 2.101l3.48 3.48a1.25 1.25 0 0 0 1.75.016l5.116-4.926a2 2 0 0 0 .613-1.441V3.5a2 2 0 0 0-2-2"></path><circle cx="9.5" cy="4.5" r="0.563" stroke-linecap="round"></circle><path d="M9.49 4.49h.02v.02h-.02z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h14v14H0z"></path></clipPath></defs></svg>
              </div>
              <div className={styles.currentCode}>
                {formValues.currentCode.toUpperCase()}
              </div>
              <div
                className={styles.svgCloseContainer}
                onClick={()=>setValue("currentCode","")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svgClose}><path stroke-linecap="round" d="M2.5 2.5 7 7m4.5 4.5L7 7m0 0 4.5-4.5M7 7l-4.5 4.5"></path></svg>
              </div>
            </div>
          }
        </div>
        <div className={styles.cartTotal}>
          <div className={styles.subtotalContainer}>
            <div className={styles.subtotal}>Subtotal · {cartTotalItems} {cartTotalItems > 1 ? "items": "item"}</div>
            <div className={styles.price}>${subtotalPrice}</div>
          </div>
          <div className={styles.shippingContainer}>
            <div className={styles.labelContainer}>
              <div className={styles.label}>Shipping</div>
              <div className={styles.iconContainer}>
                <svg className={styles.icon} fill="#666666" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M23.424,10.827c0,3.956-4.533,5.478-5.507,6.907c-0.729,1.063-0.485,2.557-2.495,2.557c-1.309,0-1.946-1.064-1.946-2.039 c0-3.623,5.323-4.442,5.323-7.425c0-1.643-1.096-2.616-2.921-2.616c-3.895,0-2.373,4.016-5.323,4.016 c-1.066,0-1.979-0.639-1.979-1.855c0-2.983,3.407-5.628,7.119-5.628C19.59,4.742,23.424,6.536,23.424,10.827z M15.545,22.268 c-1.369,0-2.496,1.125-2.496,2.496c0,1.369,1.127,2.494,2.496,2.494c1.367,0,2.494-1.125,2.494-2.494 C18.039,23.393,16.912,22.268,15.545,22.268z M32,16c0,8.822-7.178,16-16,16C7.178,32,0,24.822,0,16S7.178,0,16,0 C24.822,0,32,7.177,32,16z M29,16c0-7.168-5.832-13-13-13S3,8.832,3,16s5.832,13,13,13S29,23.168,29,16z"></path> </g> </g></svg>
              </div>
            </div>
            <div className={styles.price}>
              {
                showShipping ?
                !shipping ? "FREE" :`$${shipping}`
                :
                "Enter shipping address"
              }
            </div>
          </div>
          {
            showShipping &&
            <div className={styles.taxContainer}>
              <div className={styles.labelContainer}>
                <div className={styles.label}>Estimated taxes</div>
                <div className={styles.iconContainer}>
                  <svg className={styles.icon} fill="#666666" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M23.424,10.827c0,3.956-4.533,5.478-5.507,6.907c-0.729,1.063-0.485,2.557-2.495,2.557c-1.309,0-1.946-1.064-1.946-2.039 c0-3.623,5.323-4.442,5.323-7.425c0-1.643-1.096-2.616-2.921-2.616c-3.895,0-2.373,4.016-5.323,4.016 c-1.066,0-1.979-0.639-1.979-1.855c0-2.983,3.407-5.628,7.119-5.628C19.59,4.742,23.424,6.536,23.424,10.827z M15.545,22.268 c-1.369,0-2.496,1.125-2.496,2.496c0,1.369,1.127,2.494,2.496,2.494c1.367,0,2.494-1.125,2.494-2.494 C18.039,23.393,16.912,22.268,15.545,22.268z M32,16c0,8.822-7.178,16-16,16C7.178,32,0,24.822,0,16S7.178,0,16,0 C24.822,0,32,7.177,32,16z M29,16c0-7.168-5.832-13-13-13S3,8.832,3,16s5.832,13,13,13S29,23.168,29,16z"></path> </g> </g></svg>
                </div>
              </div>
              <div className={styles.price}>${taxPrice}</div>
            </div>
          }
          <div className={styles.totalContainer}>
            <div className={styles.label}>Total</div>
            <div className={styles.priceContainer}>
              <div className={styles.usdLabel}>USD</div>
              <div className={styles.totalNumber}>${totalPrice}</div>
            </div>
          </div>
          {
            formValues.currentCode &&
            <div className={styles.totalSavingsContainer}>
              <div className={styles.svgIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true" className={styles.svg}><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.25v2.844a2.5 2.5 0 0 1-.708 1.743L7.75 12.25m1-10.5H6.699a2 2 0 0 0-1.414.586L1.737 5.883a1.75 1.75 0 0 0 0 2.475l2.332 2.331a1.5 1.5 0 0 0 2.121 0l3.724-3.724a2 2 0 0 0 .586-1.414V3.5a1.75 1.75 0 0 0-1.75-1.75"></path><circle cx="7.75" cy="4.5" r="0.563" stroke-linecap="round" stroke-linejoin="round"></circle><path stroke-linejoin="round" d="M7.74 4.49h.02v.02h-.02z"></path></svg>
              </div>
              <div className={styles.totalSavingsLabel}>
                TOTAL SAVINGS
              </div>
              <div className={styles.totalSavings}>
                ${totalSaved}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
/*
input / output

1,2------------4.99
3,4------------9.99
5--------------14.99
6,7------------19.99
8,9------------24.99
10-------------29.99
11,12----------34.99
13,14----------39.99
15-------------44.99
16,17----------49.99
18,19----------54.99
20-------------59.99
21,22----------64.99


*/