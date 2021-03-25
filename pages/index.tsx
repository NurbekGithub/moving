import { Button, Container, Heading, HTMLChakraProps } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import Head from "next/head";
import { useEffect, useState } from "react";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionButtonProps = Merge<
  HTMLChakraProps<"button">,
  HTMLMotionProps<"button">
>;
export const MotionButton: React.FC<MotionButtonProps> = motion(Button);

export default function Home() {
  const [left, setLeft] = useState(0);

  return (
    <div>
      <Head>
        <title>Moving App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="4xl">
        <main>
          <Heading>Future moving app</Heading>
          <MotionButton onClick={() => setLeft(1000)} left={left}>
            Ship it!
          </MotionButton>
        </main>
      </Container>
    </div>
  );
}
