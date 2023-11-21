// components/ModernAnalogClock.tsx
import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

interface ModernAnalogClockProps {
   size: 'sm' | 'md' | 'lg' | 'xl';
}

const ModernAnalogClock: React.FC<ModernAnalogClockProps> = ({ size }) => {
   const [time, setTime] = useState(new Date());

   useEffect(() => {
      const intervalId = setInterval(() => {
         setTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
   }, []);

   // Define size configurations
   const sizeConfig = {
      sm: {
         clockSize: 200,
         hourHandLength: 64,
         minuteHandLength: 68,
         secondHandLength: 70,
         hourHandWidth: 5,
         minuteHandWidth: 3,
         secondHandWidth: 2,
         hourMarksLength: 6,
         minuteMarksLength: 3,
         secondMarksLength: 6,
      },
      md: {
         clockSize: 300,
         hourHandLength: 50,
         minuteHandLength: 70,
         secondHandLength: 80,
         hourHandWidth: 8,
         minuteHandWidth: 5,
         secondHandWidth: 2,
         hourMarksLength: 12,
         minuteMarksLength: 6,
         secondMarksLength: 3,
      },
      lg: {
         clockSize: 400,
         hourHandLength: 65,
         minuteHandLength: 74,
         secondHandLength: 74,
         hourHandWidth: 10,
         minuteHandWidth: 6,
         secondHandWidth: 4,
         hourMarksLength: 18,
         minuteMarksLength: 9,
         secondMarksLength: 5,
      },
      xl: {
         clockSize: 600,
         hourHandLength: 70,
         minuteHandLength: 80,
         secondHandLength: 76,
         hourHandWidth: 10,
         minuteHandWidth: 8,
         secondHandWidth: 4,
         hourMarksLength: 16,
         minuteMarksLength: 9,
         secondMarksLength: 5,
      },
   };

   const {
      clockSize,
      hourHandLength,
      minuteHandLength,
      secondHandLength,
      hourHandWidth,
      minuteHandWidth,
      secondHandWidth,
      hourMarksLength,
      minuteMarksLength,
      secondMarksLength,
   } = sizeConfig[size];

   return (
      <div className='flex items-center justify-center'>
         <Clock
            value={time}
            size={clockSize}
            renderNumbers
            renderMinuteMarks
            renderHourMarks
            hourHandWidth={hourHandWidth}
            minuteHandWidth={minuteHandWidth}
            secondHandWidth={secondHandWidth}
            hourHandLength={hourHandLength}
            minuteHandLength={minuteHandLength}
            secondHandLength={secondHandLength}
            hourMarksLength={hourMarksLength}
            minuteMarksLength={minuteMarksLength}
            secondMarksLength={secondMarksLength}
            className='react-clock-custom  bg-white rounded-full' // Custom class for styling
         />
      </div>
   );
};

export default ModernAnalogClock;
