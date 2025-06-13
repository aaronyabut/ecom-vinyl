'use client';

import styles from '../page.module.scss';
import ArrowIcon from '@public/arrow-icon.svg';
import Image from 'next/image';
import { useState } from 'react';

interface FaqType {
  question: string;
  answers: string[];
}

const faq:FaqType[] = [
  {
    question: "I’ve placed my order, when will I receive it?",
    answers: [
      "In the US, 97% of orders are delivered within 2-5 business days, although it can take longer.",
      "International delivery normally takes around 2 weeks, although it can take up to 21 business days depending on location and domestic carriers."
    ]
  },
  {
    question: "Will I be able to track my order?",
    answers: [
      "Yes! When you place an order, you receive a confirmation email with the tracking information to make sure you know where your package is at all times."
    ]
  },
  {
    question: "I received the wrong record. What do I do?",
    answers: [
      "In very rare instances you may receive the wrong record, please don’t stress! Send an email to support@vinyl.com with a photo of the record and we will be in contact with the next steps."
    ]
  },
  {
    question: "What's your refund and return policy?",
    answers: [
      "On the very small chance you’re not satisfied with your purchase i.e. you receive damaged, defective, or incorrect item(s) from Vinyl.com, you may return the product(s) within 30 days of delivery. When we receive the item(s) and verify the return of product(s), we will send you a replacement(s) or issue a full refund for the item"
    ]
  },
  {
    question: "What is Shipping Protection?",
    answers: [
      "Shipping Protection is our commitment to ensuring your package arrives safely at its destination.",
      "If your shipment encounters any issues—such as being lost, damaged, or stolen—we will take prompt action to resolve the problem.",
      "By opting for Shipping Protection, you gain peace of mind knowing you're protected against unforeseen shipping complications.",
      "Note that Shipping Protection is non-refundable."
    ]
  },
]

export default function FAQ () {
  const [clicked, setClicked] = useState(faq.map(()=> false));

  const handleToggle = (index: number, clicked: boolean) => {
    setClicked((prevStates) =>
      prevStates.map((state, i) => (i === index ? clicked : state))
    );
  };

  return (
    <section className={styles.faq}>
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          Frequently Asked Questions
        </div>
        <div className={styles.faqBody}>
          {
            faq.map((item, i) => (
              <div key={i} className={styles.questionAndAnswers}>
                <div className={styles.questionContainer}
                  onClick={()=>handleToggle(i, !clicked[i])}
                >
                  <p className={styles.question}>
                    {item.question}
                  </p>
                  <Image
                    src={ArrowIcon}
                    height={20}
                    width={20}
                    alt='arrow icon'
                    className={`${clicked[i] ? styles.rotateIcon : styles.rotateIconReverse}`}
                  />
                </div>
                <div className={`${styles.answerContainer} ${clicked[i] && styles.open}`}>
                  {
                    item.answers.map((answer, j) => (
                      <p key={j} className={styles.answer}>
                        {answer}
                      </p>
                    ))
                  }
                </div>
                <div className={styles.divider}/>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}