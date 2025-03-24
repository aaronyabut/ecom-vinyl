'use client';

import React, { useEffect, useRef } from 'react';
import styles from './DualRangeSlider.module.scss';

interface DualRangeSliderProps {
  setSelectedMin:React.Dispatch<React.SetStateAction<number>>,
  setSelectedMax:React.Dispatch<React.SetStateAction<number>>,
  selectedMin: number,
  selectedMax: number,
  MAX: number,
  MIN: number
}

const DualRangeSlider = ({setSelectedMin,setSelectedMax,selectedMin,selectedMax,MIN,MAX}: DualRangeSliderProps) => {
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = ((selectedMin - MIN) / (MAX - MIN)) * 100;
      const maxPercent = ((selectedMax - MIN) / (MAX - MIN)) * 100;
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [selectedMin, selectedMax]);

  // Handle slider changes
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), selectedMax - 1);
    setSelectedMin(Math.max(value, MIN));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), selectedMin + 1);
    setSelectedMax(Math.min(value, MAX));
  };

  // Handle input changes
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= MIN && value < selectedMax) {
      setSelectedMin(value);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= MAX && value > selectedMin) {
      setSelectedMax(value);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.inputContainer}>
        <input
          type="number"
          value={selectedMin}
          onChange={handleMinInputChange}
          min={MIN}
          max={selectedMax - 1}
          className={styles.valueInput}
        />
        <div>
          To
        </div>
        <input
          type="number"
          value={selectedMax}
          onChange={handleMaxInputChange}
          min={selectedMin + 1}
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
          value={selectedMin}
          onChange={handleMinChange}
          className={styles.thumb}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={selectedMax}
          onChange={handleMaxChange}
          className={styles.thumb}
        />
      </div>
    </div>
  );
};

export default DualRangeSlider;