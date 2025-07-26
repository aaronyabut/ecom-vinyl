import styles from './items.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  discountCode: string;
}

export default function Items () {
  const {
    register,
    handleSubmit,
    watch,
    // setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      discountCode: '',
    },
  });

  const formValues = watch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
    // alert(formValues.paymentOption);
    // console.log(formValues.paymentOption);
    // console.log(JSON.stringify(data));
  };

  return (
    <div className={styles.itemsContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.itemList}>
          Item list
        </div>
        <div className={styles.discountCode}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.input}>
              <div className={styles.inputContainer}>
                <label className={`${styles.inputLabel} ${formValues.discountCode ? styles.showLabel : ""}`}>Discount code or gift card</label>
                <input className={`${styles.inputText} ${formValues.discountCode !== "" ? styles.inputUpdate : ""} ${errors.discountCode ? styles.wrongEntry : ""}`}
                  type='text'
                  placeholder="Discount code or gift card"
                  {...register('discountCode', {
                    required: 'Enter a first name',
                    pattern: {
                      value: /^[A-Za-z]+(?:[-' ][A-Za-z]+)?$/,
                      message: 'Enter a valid first name',
                    },
                  })}
                  />
              </div>
              {
                errors.discountCode ?
                <div className={styles.wrongEntryMessage} >
                  {errors.discountCode.message}
                </div>
                : null
              }
            </div>
            <button type='submit' className={styles.apply}>
              Apply
            </button>
          </form>
          <div className={styles.discountTags}>Discount tags</div>
        </div>
        <div className={styles.cartTotal}>
          <div className={styles.subtotalContainer}>
            <div className={styles.subtotal}>Subtotal</div>
            <div className={styles.price}>SUB TOTAL NUM</div>
          </div>
          <div className={styles.shippingContainer}>
            <div className={styles.labelContainer}>
              <div className={styles.label}>Shipping</div>
              <div className={styles.icon}>Icon/modal</div>
            </div>
            {/* <div className={styles.shippingCost}>Shipping Cost</div> */}
            <div className={styles.blankAddress}>Enter shipping address</div>
          </div>
          <div className={styles.totalContainer}>
            <div className={styles.label}>Total</div>
            <div className={styles.priceContainer}>
              <div className={styles.usdLabel}>USD</div>
              <div className={styles.totalNumber}>TOTAL NUM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}