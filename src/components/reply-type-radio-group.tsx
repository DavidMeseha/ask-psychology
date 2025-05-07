import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { replyTypes } from "@/constants";
import { Label } from "./ui/label";
import { ReplyType } from "@/types";

type Props = {
  onChange: (_value: ReplyType) => void;
  value?: string;
};

export default function ReplyTypeRadioGroup({ onChange, value }: Props) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <h4 className="font-bold text-nowrap">كيف تريد الرد ؟</h4>

      <RadioGroup
        defaultValue="no-reply"
        value={value}
        onValueChange={(value) => onChange(value as ReplyType)}
        className="flex items-center flex-wrap gap-6 sm:justify-start justify-end"
      >
        {replyTypes.map((type) =>
          type.description ? (
            <TooltipProvider key={type.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Label
                    htmlFor={type.name}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    {type.label}
                    <RadioGroupItem
                      value={type.name}
                      id={type.name}
                      className="text-secondary"
                    />
                  </Label>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-xs text-white max-w-xs text-end">
                  <p>{type.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Label
              key={type.name}
              htmlFor={type.name}
              className="flex items-center gap-1 cursor-pointer"
            >
              {type.label}
              <RadioGroupItem
                value={type.name}
                id={type.name}
                className="text-secondary"
              />
            </Label>
          )
        )}
      </RadioGroup>
    </div>
  );
}
