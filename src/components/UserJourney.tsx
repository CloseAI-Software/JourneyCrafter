"use client";

import { Center, VStack } from "@chakra-ui/react";
import JourneyMatrix from "@/components/JourneyMatrix/JourneyMatrix";
import { JourneyHeaderWidget } from "@/components/JourneyMatrix/JourneyHeader";
import { useEffect, useState } from "react";
import {
  Journey,
  JourneyFileParser,
  JourneyHeader,
  JourneyStage,
} from "@/lib/JourneyFileParser";

export default function UserJourney({
  userJourney,
}: {
  userJourney: Journey | undefined;
}) {
  return (
    <VStack
      overflow="scroll"
      borderRadius="8px"
      borderColor="gray.400 !important"
      border="1px solid"
    >
      <JourneyHeaderWidget
        header={userJourney?.header ?? ({} as JourneyHeader)}
      ></JourneyHeaderWidget>
      <JourneyMatrix
        stages={userJourney?.stages ?? ([] as JourneyStage[])}
      ></JourneyMatrix>
    </VStack>
  );
}