import { Step } from "../_components/AnimatedHomeSection";

export const steps: Step[] = [
  {
    isDone: false,
    clues: ["It's a recent not bad rectangle tool"],
    guesses: [],
  },
  {
    isDone: false,
    clues: ["It's a recent not bad rectangle tool"],
    guesses: ["iPad"],
  },
  {
    isDone: false,
    clues: [
      "It's a recent not bad rectangle tool",
      "It makes lots of party fun",
    ],
    guesses: ["iPad"],
  },
  {
    isDone: false,
    clues: [
      "It's a recent not bad rectangle tool",
      "It makes lots of party fun",
    ],
    guesses: ["iPad", "Twister", "Monopoly"],
  },
  {
    isDone: false,
    clues: [
      "It's a recent not bad rectangle tool",
      "It makes lots of party fun",
      "It's found in the same place as *iPad*",
    ],
    guesses: ["iPad", "Twister", "Monopoly"],
  },
  {
    isDone: false,
    clues: [
      "It's a recent not bad rectangle tool",
      "It makes lots of party fun",
      "It's found in the same place as *iPad*",
    ],
    guesses: ["iPad", "Twister", "Monopoly", "laptop", "Blather 'Round"],
  },
  {
    isDone: false,
    clues: [
      "It's a recent not bad rectangle tool",
      "It makes lots of party fun",
      "It's found in the same place as *iPad*",
      "Talk about free!",
    ],
    guesses: ["iPad", "Twister", "Monopoly", "laptop", "Blather 'Round"],
  },
  {
    isDone: true,
    clues: [
      "It's a recent not bad rectangle tool",
      "It makes lots of party fun",
      "It's found in the same place as *iPad*",
      "Talk about free!",
    ],
    guesses: [
      "iPad",
      "Twister",
      "Monopoly",
      "laptop",
      "Blather 'Round",
      "Editor for Blather 'Round",
    ],
  },
];
