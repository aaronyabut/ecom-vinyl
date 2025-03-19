'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './DualRangeSlider.module.scss';

const DualRangeSlider = () => {
  const MIN = 4;
  const MAX = 1000;

  const [minValue, setMinValue] = useState(MIN);
  const [maxValue, setMaxValue] = useState(MAX);

  const rangeRef = useRef<HTMLDivElement>(null);

  // Update range fill
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = ((minValue - MIN) / (MAX - MIN)) * 100;
      const maxPercent = ((maxValue - MIN) / (MAX - MIN)) * 100;
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue]);

  // Handle slider changes
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(Math.max(value, MIN));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(Math.min(value, MAX));
  };

  // Handle input changes
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= MIN && value < maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= MAX && value > minValue) {
      setMaxValue(value);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.inputContainer}>
        <input
          type="number"
          value={minValue}
          onChange={handleMinInputChange}
          min={MIN}
          max={maxValue - 1}
          className={styles.valueInput}
        />
        <div>
          To
        </div>
        <input
          type="number"
          value={maxValue}
          onChange={handleMaxInputChange}
          min={minValue + 1}
          max={MAX}
          className={styles.valueInput}
        />
      </div>

      <div className={styles.slider}>
        <div className={styles.track}></div>
        <div className={styles.range} ref={rangeRef}></div>
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minValue}
          onChange={handleMinChange}
          className={styles.thumb}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxValue}
          onChange={handleMaxChange}
          className={styles.thumb}
        />
      </div>
    </div>
  );
};

export default DualRangeSlider;