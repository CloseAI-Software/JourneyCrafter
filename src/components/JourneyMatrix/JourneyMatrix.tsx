import React from "react";
import { Text, VStack, HStack, Flex, Center, Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import "./index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { JourneyStage } from "@/lib/JourneyFileParser";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.scale.grid.display = false;

const options = {
  showScale: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
      ticks: {
        display: false,
      },
    },
    y: {
      display: false,
      ticks: {
        display: false,
      },
    },
  },
};

const stageColors: string[] = [
  "green.500",
  "orange.500",
  "yellow.500",
  "teal.500",
  "red.500",
  "blue.500",
  "cyan.500",
  "purple.500",
  "pink.500",
];

const JourneyMatrix = (props: { stages: JourneyStage[] }) => {
  const emotions = props.stages?.flatMap((stage) =>
    stage.tasks.map((task) => task.emotion)
  );

  const emotionData = {
    labels: emotions.map(() => ""),
    datasets: [
      {
        label: "emotion",
        data: emotions,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  const canvasWidth = `${
    emotions?.length * 150 + (emotions?.length - 1) * 8
  }px`;

  console.log("emotionData is ", emotionData);

  return (
    <VStack alignSelf="start" py="12px">
      <HStack alignSelf="start" gap="8px">
        <VStack w="70px">
          <Flex w="100%" h="50px" marginBottom="5px" alignItems="center">
            <Text
              fontSize="16px"
              fontWeight="bold"
              transform="rotate(-90deg) translateY(30px)"
            >
              {"Stage"}
            </Text>
          </Flex>
          <Flex w="100%" h="70px" marginY="6px" alignItems="center">
            <Text
              fontSize="16px"
              fontWeight="bold"
              transform="rotate(-90deg) translateY(30px)"
            >
              {"Action"}
            </Text>
          </Flex>
          <Flex w="100%" h="70px" marginY="6px" alignItems="center">
            <Text
              fontSize="16px"
              fontWeight="bold"
              transform="rotate(-90deg) translateY(14px)"
            >
              {"Touch point"}
            </Text>
          </Flex>
        </VStack>
        {props.stages?.map((section, sectionIndex) => (
          <VStack key={sectionIndex}>
            <Flex w="100%" color="white" h="50px">
              <Center
                w="100%"
                bg={stageColors[sectionIndex]}
                borderRadius="4px"
              >
                <Text fontSize="xl" fontWeight="bold" mb="2px" marginY="auto">
                  {section.stage}
                </Text>
              </Center>
            </Flex>
            <HStack gap="8px">
              {section.tasks?.map((task, taskIndex) => (
                <VStack key={taskIndex}>
                  <Flex
                    w="100%"
                    borderWidth="1px"
                    borderRadius="5px"
                    borderColor="gray.400"
                    minW="150px"
                    minH="70px"
                  >
                    <Box w="100%" minH="70px" borderRadius="5px" p="6px">
                      <Text>{task?.task}</Text>
                    </Box>
                  </Flex>
                  <Flex
                    w="100%"
                    borderWidth="1px"
                    borderRadius="5px"
                    borderColor="gray.400"
                    minW="120px"
                    minH="70px"
                  >
                    <Box w="100%" minH="70px" borderRadius="5px" p="6px">
                      <Text>{task?.touchpoint}</Text>
                    </Box>
                  </Flex>
                  {/*<Box w="100%" h="104px">*/}
                  {/*  <Text>{entry.emotion}</Text>*/}
                  {/*</Box>*/}
                </VStack>
              ))}
            </HStack>
          </VStack>
        ))}
      </HStack>
      <HStack w="100%" h="140px" alignSelf="start">
        <Center w="70px">
          <Text
            fontSize="16px"
            lineHeight="15px"
            fontWeight="bold"
            mb="2px"
            textAlign="right"
            transform="rotate(-90deg) translateY(30px)"
          >
            {"Emotion"}
          </Text>
        </Center>
        <Box
          w={canvasWidth}
          h="100%"
          borderWidth="1px"
          borderColor="gray.400"
          borderRadius="md"
          p="4"
        >
          <Line
            data={emotionData}
            options={options}
            width={canvasWidth}
            style={{ margin: "0 30px"}}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default JourneyMatrix;
