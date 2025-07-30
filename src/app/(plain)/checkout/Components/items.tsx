import styles from './items.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useShoppingCart } from '@/app/ShoppingCart';
import { Vinyl } from '../../../(default)/page'
import Image from 'next/image';

interface FormData {
  discountCode: string;
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
    code: "vinylchucks",
    discount: .10
  },
]

const sampleData:Vinyl[] = [
  {
    "product_id":1,
    "vinyl_img":"https://cdn.shopify.com/s/files/1/0704/2026/7313/files/9095824376113_85quality_led-zeppelin-led-zeppelin-iv-clear-vinyl-atl75-vinyl-lp.webp?v=1734325732",
    "product_href":"https://vinyl.com/products/led-zeppelin-led-zeppelin-iv-clear-vinyl-atl75",
    "vinyl_title":"Led Zeppelin IV (ATL75 Edition) [Clear]",
    "vinyl_artist":"Led Zeppelin",
    "price":29.99,
    "old_price":null,
    "sale_label":null,
    "low_stock_label":null,
    "no_stock_label":null,
    "genre":"blues",
    "vinyl_description":"Led Zeppelin's \"Led Zeppelin IV\" isn't just an album; it's a rock 'n' roll rite of passage. Now available on stunning crystal clear 180-gram vinyl as part of the Atlantic 75 campaign, this special edition captures the essence of a cultural thunderstorm. Released in 1971, this masterpiece solidified Led Zeppelin's place in rock history with its powerful blend of hard rock, folk, and blues. From the iconic guitar riff of \"Stairway to Heaven\" that's been blasted from every teenager's basement to the hard-hitting drum beats of \"Rock and Roll,\" this album is a sonic elixir that made air guitar a legitimate art form and Jimmy Page a wizard of the strings. With influences ranging from Tolkien's mystical realms to blues legends, \"Led Zeppelin IV\" features timeless classics like \"Black Dog\" and \"When the Levee Breaks,\" showcasing the band's unparalleled musicianship and innovative sound. Add this must-have clear vinyl edition to your collection and relive the magic of one of rock's greatest albums.",
    "vinyl_info":"[['UPC', '603497837076'], ['Color', 'Clear'], ['Format', 'Vinyl 1LP'], ['Weight', '180g / 0.4lb'], ['Release date', '26th Oct 2023'], ['First released', '10th Aug 1971']]",
    "playlist_name":"Led Zeppelin IV",
    "tracklist":"[['1', 'Black Dog', '04:56'], ['2', 'Rock And Roll', '03:40'], ['3', 'The Battle Of Evermore', '05:51'], ['4', 'Stairway To Heaven', '08:02'], ['5', 'Misty Mountain Hop', '04:38'], ['6', 'Four Sticks', '04:45'], ['7', 'Going To California', '03:32'], ['8', 'When The Levee Breaks', '07:10']]",
    "companies":"[['https://cdn.shopify.com/s/files/1/0704/2026/7313/files/company-fallback-2.png?v=1696923241', 'IIP-DDS', 'Distributor'], ['https://cdn.shopify.com/s/files/1/0704/2026/7313/files/company-fallback-2.png?v=1696923241', 'Revolver Records', 'Label']]",
    "main_artists":"[['https://i.scdn.co/image/207803ce008388d3427a685254f9de6a8f61dc2e?d=200x200', 'Led Zeppelin', 'Main Artist']]",
    "songwriters":"[['https://i.scdn.co/image/eb8fd85635cd147585f78d4e3e8b9a5e212269e3?d=200x200', 'Jimmy Page', 'Composer, Lyricist'], ['null?d=200x200', 'John Bonham', 'Composer, Lyricist'], ['https://i.scdn.co/image/ab67616d0000b273fb81426965e9bddd8affa07e?d=200x200', 'John Paul Jones', 'Composer, Lyricist'], ['https://i.scdn.co/image/ab67616d0000b273a0816a5391132bebca12bce1?d=200x200', 'Memphis Minnie', 'Composer, Lyricist'], ['https://i.scdn.co/image/6a29772fd3afae9ec890a860c500fa55267d8870?d=200x200', 'Robert Plant', 'Composer, Lyricist']]",
    "quantity":2
  },
  {
    "product_id":8,
    "vinyl_img":"https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258511634737_85quality_Jimi_Hendrix_-_Electric_Ladyland_2LP.webp?v=1734326029",
    "product_href":"https://vinyl.com/products/jimi-hendrix-electric-ladyland",
    "vinyl_title":"Electric Ladyland [2LP]",
    "vinyl_artist":"Jimi Hendrix",
    "price":31.98,
    "old_price":null,
    "sale_label":null,
    "low_stock_label":null,
    "no_stock_label":null,
    "genre":"blues",
    "vinyl_description":"Dive into the revolutionary sounds of Jimi Hendrix with Electric Ladyland, his third and final studio album, now available on double 180-gram vinyl. Released in 1968, this album is an iconic milestone in rock history, pushing the boundaries of the genre and solidifying Hendrix's status as a guitar virtuoso. Featuring sixteen tracks, including the legendary \"Voodoo Child (Slight Return),\" \"Have You Ever Been (To Electric Ladyland),\" and Hendrix's renowned cover of Bob Dylan's \"All Along the Watchtower,\" Electric Ladyland is a masterclass in blending psychedelic rock, blues, funk, and experimental sounds. This double LP edition is digitally remastered, ensuring a pristine listening experience that captures the raw energy, soulful melodies, and famous guitar solos that define the album. Housed in a gatefold sleeve with a color booklet, this release not only delivers on sound quality but also offers a visual tribute to Hendrix's artistry. Electric Ladyland remains a timeless piece of music history, making this vinyl pressing an essential addition to any collection.",
    "vinyl_info":"[['UPC', '886976239817'], ['Color', 'Black'], ['Format', 'Vinyl 2LP'], ['Weight', '180g / 0.4lb'], ['First released', '31st Dec 2009']]",
    "playlist_name":"Electric Ladyland",
    "tracklist":"[['1', '...And the Gods Made Love', '01:21'], ['2', 'Have You Ever Been (To Electric Ladyland)', '02:11'], ['3', 'Crosstown Traffic', '02:19'], ['4', 'Voodoo Chile', '15:00'], ['5', 'Little Miss Strange', '02:52'], ['6', 'Long Hot Summer Night', '03:28'], ['7', 'Come On (Let the Good Times Roll)', '04:09'], ['8', 'Gypsy Eyes', '03:44'], ['9', 'Burning of the Midnight Lamp', '03:39'], ['10', 'Rainy Day, Dream Away', '03:43'], ['11', '1983...(A Merman I Should Turn to Be)', '13:39'], ['12', 'Moon, Turn the Tides...Gently Gently Away', '01:02'], ['13', 'Still Raining, Still Dreaming', '04:25'], ['14', 'House Burning Down', '04:33'], ['15', 'All Along the Watchtower', '04:01'], ['16', 'Voodoo Child (Slight Return)', '05:13']]",
    "companies":"[['https://artwork.jaxsta.com/995/476d1bde-6ffe-4c78-a3ca-cbcd2cb6be91.png?d=1000x1000', 'Legacy Recordings', 'Label'], ['https://artwork.jaxsta.com/750/5a50b1be-7473-4e51-ae4b-bb8d9ac13407.jpg?d=1000x1000', 'Sony Music Entertainment', 'Distributor']]",
    "main_artists":"[['https://i.scdn.co/image/ab6761610000e5eb31f6ab67e6025de876475814?d=200x200', 'The Jimi Hendrix Experience', 'Main Artist']]",
    "songwriters":"[['https://i.scdn.co/image/ab6772690000c46cd7064356b04a156664a37c4f?d=200x200', 'Bob Dylan', 'Composer, Lyricist'], ['https://i.scdn.co/image/7a6c8d12f7a03fbe4a380886bce75484303c0aa6?d=200x200', 'Earl King', 'Composer'], ['https://i.scdn.co/image/ab6761610000e5eb31f6ab67e6025de876475814?d=200x200', 'Jimi Hendrix', 'Composer, Lyricist'], ['https://i.scdn.co/image/5ee4cfde781ae7fdeaf048bbb46583d5584c9a31?d=200x200', 'Noel Redding', 'Composer']]",
    "quantity":1
  }
]

interface ShipType {
  showShipping: boolean;
}

export default function Items ({showShipping} : ShipType) {
  const {
    shoppingCart, subTotal,
    shipping, shippingProtection,
    freeShipping, cartCount,
  } = useShoppingCart();

  const taxPrice = (subTotal*0.105).toFixed(2);
  const totalPrice = (subTotal+shipping+Number(taxPrice)).toFixed(2);

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
  };

  return (
    <div className={styles.itemsContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.itemList}>
          {
            // shoppingCart.map((item, i) => {
              sampleData.map((item, i) => {
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
                  <div className={styles.artistTitle}>
                    <div>{item.vinyl_artist} - {item.vinyl_title}</div>
                  </div>
                  <div className={styles.priceContainer}>
                    <div className={styles.price}>
                       ${(Math.round((item.quantity*item.price)*100)/100).toFixed(2)}
                    </div>
                    {/* <div className={styles.discountedPrice}>
                       $ 9.99
                    </div> */}
                  </div>
                </div>
              )
            })
          }
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
                      message: 'Enter a valid discoount code',
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
            <div className={styles.subtotal}>Subtotal · {cartCount} {cartCount > 1 ? "items": "item"}</div>
            <div className={styles.price}>${subTotal}</div>
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
        </div>
      </div>
    </div>
  )
}