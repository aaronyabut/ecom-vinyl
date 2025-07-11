'use client';
import styles from './cart.module.scss';
import XIcon from '@public/x-icon.svg';
import PlusIcon from '@public/cart_svg/plus.svg';
import MinusIcon from '@public/cart_svg/minus.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useShoppingCart } from '../ClientLayout';

export default function Cart () {
  const [shipping, setShipping] = useState<number>(4.99);
  const [freeShipping, setFreeShipping] = useState<number>(60);
  const [subTotal, setSubTotal] = useState<number>(0);
  const {shoppingCart, setShoppingCart, openCart, setOpenCart} = useShoppingCart();
  const [cartCount, setCartCount] = useState<number>(0);
  const [shippingProtection, setShippingProtection] = useState<boolean>(true);


  useEffect(()=> {
    async function shoppingCartUpdates () {
      try {
        const sumSubtotal = shoppingCart.reduce((sum, vinyl) => Number(sum) + (Number(vinyl.price) * Number(vinyl.quantity)), 0)
        const sumQuantity = shoppingCart.reduce((sum, vinyl) => Number(sum) + Number(vinyl.quantity || 0), 0);

        const updatedCart = shoppingCart.filter((vinyl) => vinyl.quantity > 0);
        if (updatedCart.length !== shoppingCart.length) {
          setShoppingCart(updatedCart);
        }

        setCartCount(sumQuantity);

        setSubTotal(shoppingCart.length > 0 ? Math.round(sumSubtotal*100)/100 : 0)

        setShipping(shoppingCart.length > 1 ? 5.99 : 4.99);

        setFreeShipping(Math.round((60-sumSubtotal)*100)/100);

      } catch (error) {
        console.error('Error within shopping cart:', error);
      }
    }
    shoppingCartUpdates()
  }, [shoppingCart.map(item => item.quantity).join(",")])

  return (
    <div className={`${styles.cartContainer} ${openCart ? styles.showCart : styles.hideCart} ${openCart && styles.noScroll}`}>
      <div
        className={`${styles.bg} ${openCart ? styles.visible : ''}`}
        onClick={() => setOpenCart(false)}
      >
      </div>
      <div className={`${styles.cart} ${openCart ? styles.visible : ''}`}>
        <div className={styles.topWrapper}>
          <div className={styles.headerWrapper}>
            <div className={styles.header}>
              <div className={styles.title}>MY CART</div>
              <div className={styles.icon}>
                <Image
                  src={XIcon}
                  height={20}
                  width={20}
                  alt="x icon"
                  onClick={() => setOpenCart(false)}
                />
              </div>
            </div>
            <div className={styles.totalProducts}>
              {cartCount === 1 ? `${cartCount} Product` :
              `${cartCount} Products`
              }
            </div>
            {
              shoppingCart.length ?
              <div className={styles.shippingWrapper}>
                {
                  subTotal < 60 ?
                  <div className={styles.progressWrapper}>
                    <div className={styles.progressBar}>
                      <div className={styles.background}></div>
                      <div className={styles.progress} style={{width: `${((subTotal/60)*100).toFixed(2)}%`}}></div>
                    </div>
                    <div className={styles.calculation}>
                      Just ${freeShipping} more for FREE shipping.
                    </div>
                  </div>
                  :
                  <div className={styles.freeShipWrapper}>
                    <Image
                      src="https://vinyl.com/cdn/shop/t/59/assets/check-circle-1.svg"
                      width={18}
                      height={18}
                      alt="check icon"
                      className={styles.shipIcon}
                    />
                    <div className={styles.freeShip}>
                      Congratulations! You’ve unlocked free shipping.
                    </div>
                  </div>
                }
              </div>
              :
              null
            }
            <div className={styles.divider}></div>
          </div>
        </div>
        <div className={styles.vinylsWrapper}>
          {
            shoppingCart.map((vinyl,i) => {
              return (
                <div key={i} className={styles.vinyl}>
                  <Image
                    width={120}
                    height={120}
                    src={vinyl.vinyl_img}
                    alt='Vinyl image'
                    className={styles.vinylImage}
                  />
                  <div className={styles.vinylInfoWrapper}>
                    <div className={styles.vinylInfo}>
                      <div className={styles.vinylDetails}>
                        <div className={styles.vinylType}>
                          VINYL
                        </div>
                        <div className={styles.vinylTitle}>
                          {vinyl.vinyl_title}
                        </div>
                        <div className={styles.vinylArtist}>
                          {vinyl.vinyl_artist}
                        </div>
                      </div>
                      <div
                        className={styles.vinylDelete}
                        onClick={()=>
                          setShoppingCart((prevCart) => {
                            const removed = prevCart.filter((cartItem) => cartItem.product_id !== vinyl.product_id)
                            return removed
                          })
                        }
                      >
                        <Image
                          src={XIcon}
                          width={12}
                          height={12}
                          alt="check icon"
                        />
                      </div>
                    </div>
                    <div className={styles.vinylAmount}>
                      <div className={styles.vinylQuantityWrapper}>
                      <div
                        className={styles.decreaseQuantity}
                        onClick={() =>
                          setShoppingCart((prevCart) => {
                            // Check if the item exists and its quantity will become 0
                            const targetItem = prevCart.find(
                              (cartItem) => cartItem.product_id === vinyl.product_id
                            );
                            if (targetItem && targetItem.quantity === 1) {
                              // Remove the item if quantity will become 0
                              return prevCart.filter(
                                (cartItem) => cartItem.product_id !== vinyl.product_id
                              );
                            }
                            // Otherwise, decrease quantity
                            return prevCart.map((cartItem) =>
                              cartItem.product_id === vinyl.product_id
                                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                : cartItem
                            );
                          })
                        }
                      >
                        <Image
                          src={MinusIcon}
                          height={18}
                          width={18}
                          alt="minus icon"
                        />
                        </div>
                        <div className={styles.quantity}>
                          {vinyl.quantity}
                        </div>
                        <div
                          className={styles.increaseQuantity}
                          onClick={()=> setShoppingCart((prevCart) => {
                            console.log(prevCart)
                            return prevCart.map((cartItem) =>
                              cartItem.product_id === vinyl.product_id
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                            );
                          })}
                        >

                          <Image
                            src={PlusIcon}
                            height={18}
                            width={18}
                            alt="plus icon"
                          />
                        </div>
                      </div>
                      <div className={styles.vinylPrice}>
                        ${(Math.round((vinyl.quantity*vinyl.price)*100)/100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={styles.modalFooter}>
          <div className={styles.totalWrapper}>
            <div className={styles.subTotal}>
              <span>Sub Total</span>
              <span>$
                {
                  !subTotal ?
                  <span>0.00</span>
                  :
                  <span>{subTotal.toFixed(2)}</span>
                }
              </span>
            </div>
            {
              !!shoppingCart.length &&
              <div className={styles.subTotal}>
                <span>Estimate shipping costs</span>
                {
                  subTotal > 60 ?
                  <span>FREE</span>
                  :
                  <span>${shipping}</span>
                }
              </div>
            }
            <div className={styles.orderTotal}>
              <span>Order Total</span>
              <span>$
                {
                  subTotal > 0 ?
                  <span>
                    {
                      subTotal > 60 ?
                      <span>
                        {subTotal.toFixed(2)}
                      </span>
                      :
                      <span>
                        {(subTotal + shipping).toFixed(2)}
                      </span>
                    }
                  </span>
                  :
                  <span>0.00</span>
                }
              </span>
            </div>
          </div>
          {
            !!shoppingCart.length &&
            <div className={styles.shippingProtection}>
              <Image
                src='https://monsterocu-prod-publicfiles.s3.eu-central-1.amazonaws.com/monster-protect-1.png'
                height={30}
                width={30}
                alt='shipping icon'
                className={`${styles.shippingIcon} ${!shippingProtection && styles.checked}`}
              />
              <div className={styles.details}>
                <div className={styles.header}>Shipping Protection $4.99</div>
                <div className={styles.info}>{shippingProtection ? "Select to protect your order from damage, loss or theft during transit." : "Your order is now protected against damage, loss or theft during transit."}</div>
              </div>
              <div
                onClick={()=>setShippingProtection((prev:boolean) => !prev)}
                className={`${styles.toggleWrapper} ${shippingProtection ? styles.uncheckedToggle : styles.checkedToggle}`}
              >
                <span className={`${styles.slider} ${!shippingProtection && styles.checked}`}></span>
              </div>
            </div>
          }
          <div className={`${styles.checkout} ${shoppingCart.length && styles.active}`}>Proceed to Checkout</div>
          {
            shoppingCart.length ?
            <div className={styles.shippingAndTaxes}>Taxes calculated at checkout</div>
            :
            <div className={styles.shippingAndTaxes}>Shipping & taxes calculated at checkout</div>
          }
        </div>
      </div>
    </div>
  )
}