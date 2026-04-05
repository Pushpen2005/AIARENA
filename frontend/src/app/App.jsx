import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';

// Dummy generator for simulating responses based on user's exact required data structure
const generateDummyResponse = (problem) => {
  return {
    problem: problem,
    solution_1: `Here is my solution using a Python approach:\n\n\`\`\`python\ndef solve_problem(issue):\n    print(f"Solving: {issue}")\n    # Implement core logic\n    return True\n\`\`\`\n\nThis approach focuses on **readability** and **simplicity**. We prioritize clean abstractions over micro-optimizations, which makes scaling easier within team environments.`,
    solution_2: `An alternative approach is to use modular JavaScript:\n\n\`\`\`javascript\nconst solveProblem = (issue) => {\n  console.log(\`Functional solve: $\{issue\}\`);\n  \n  return [1, 2, 3]\n    .filter(x => x > 1)\n    .map(x => x * 2);\n}\n\`\`\`\n\n### Key Benefits\n- Uses modern ES6 syntax.\n- Pure functions minimize side effects.\n- Easily composable into larger data pipelines.`,
    judge: {
      solution_1_score: 8.5,
      solution_2_score: 9.0,
      solution_1_reasoning: "Solution 1 is solid but relatively basic. It accurately defines the function signature but lacks error handling logic that would be expected in a robust production system.",
      solution_2_reasoning: "Solution 2 demonstrates strong functional programming principles. By avoiding side effects and utilizing native array methods, it proves more resilient against regressions in large web applications."
    }
  };
};

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text, data) => {
    setMessages((prev) => [...prev, data]);
  };

  return (
    <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
  );
}
