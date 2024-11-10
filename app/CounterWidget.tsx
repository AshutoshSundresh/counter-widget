'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import useSound from 'use-sound';
import Image from 'next/image';
  
const CounterWidget: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [PlaySound] = useSound('Effect_Tick.mp3', { 
    soundEnabled: !isMuted 
  }); 

  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState('00:00');
  const [frameIndex, setFrameIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const frames = ["https://raw.githubusercontent.com/AshutoshSundresh/counter-widget/main/frame_1.png", "https://raw.githubusercontent.com/AshutoshSundresh/counter-widget/main/frame_0.png"];

  useEffect(() => {
    setTotal(count + round * 108);
  }, [count, round]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          const minutes = Math.floor(newSeconds / 60);
          const remainingSeconds = newSeconds % 60;
          setTime(`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`);
          return newSeconds;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const plusCount = useCallback(() => {
    PlaySound();
    if (!isActive) setIsActive(true);
    if (count >= 108) {
      setCount(1);
      setRound((prevRound) => prevRound + 1);
    } else {
      setCount((prevCount) => prevCount + 1);
    }
    setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
  }, [count, isActive, frames, PlaySound]);

  const resetApp = () => {
    setCount(0);
    setRound(0);
    setSeconds(0);
    setTime('00:00');
    setIsActive(false);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <Card className="w-full h-full sm:max-w-[600px] sm:h-auto">
      <CardHeader className="flex justify-between">
        <p className="text-2xl">Time: {time}</p>
        <div className="flex gap-2">
          <Button 
            color="default" 
            variant="flat" 
            onPress={toggleMute}
            isIconOnly
          >
            {isMuted ? "🔇" : "🔊"}
          </Button>
          <Button color="danger" variant="flat" onPress={resetApp}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col justify-between h-full">
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6 text-xl text-center">
            <p>Count: {count}</p>
            <p>Round: {round}</p> 
          </div>
          <div className="flex justify-center mb-6">
            <Image src={frames[frameIndex]} alt="Mala" width={150} height={150} />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-6 text-xl text-center">
            <p>Total: {total}</p>
          </div>          
        </div>
        <Button 
          color="primary" 
          onPress={plusCount}
          className="w-full text-3xl py-8"
        >
          Chant
        </Button>
      </CardBody>
    </Card>
  );
};

export default CounterWidget;