import React, { FormEventHandler } from "react";
import * as Sliderz from "@radix-ui/react-slider";

interface SliderProps {
  value: number[];
  onChange?: (value: number[]) => void;
}

const Slider: React.FC<SliderProps> = ({ value = [1], onChange }) => {
    const handleChange=(newValue:number[])=>{
        onChange?.(newValue)
    }
  return (
    <Sliderz.Root
      className="w-28 h-2 flex items-center"
      defaultValue={[1]}
      value={value}
      step={0.1}
      max={1}
      onValueChange={handleChange}
    >
      <Sliderz.Track className="bg-neutral-500 grow h-full rounded-full relative">
        <Sliderz.Range className="bg-green-500 rounded-full h-full absolute" />
      </Sliderz.Track>
    </Sliderz.Root>
  );
};

export default Slider;
