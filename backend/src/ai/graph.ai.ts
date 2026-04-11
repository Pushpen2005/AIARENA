import { StateSchema, MessagesValue, type GraphNode, StateGraph, START, END, CompiledStateGraph } from "@langchain/langgraph";
import { z } from "zod";
import { googleChat, mistralChat, groqChat } from "./model.ai.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";
import { start } from "node:repl";
const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default(""),
    })
});
function normalizeOutput(output: any): string {
  if (typeof output === "string") return output;

  // If it's array (ContentBlock[])
  return output.map((o: any) => o.text || "").join(" ");
}

const solutionNode: GraphNode<typeof state> = async (state) => {

    const [mistralResponse, groqResponse] = await Promise.all([
        mistralChat.invoke(state.problem),
        groqChat.invoke(state.problem)
    ]);
    return {
        solution_1: normalizeOutput(mistralResponse.content),
        solution_2: normalizeOutput(groqResponse.content),
    }
}
const judgeNode: GraphNode<typeof state> = async (state) => {

    const { problem, solution_1, solution_2 } = state;


    const judge = createAgent({
        model: googleChat,
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().default(0),
            solution_2_score: z.number().default(0),
            solution_1_reasoning: z.string().default(""),
            solution_2_reasoning: z.string().default(""),
        })),
        systemPrompt: `You are a judge tasked with evaluating two solutions to the following problem: ${problem}.

Solution 1: ${solution_1}

Solution 2: ${solution_2}

Please evaluate each solution based on its correctness, efficiency, and creativity. Provide a score out of 10 for each solution, along with a brief reasoning for your scores.`
    });
    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(
                `problem: ${problem}\n\nsolution 1: ${solution_1}\n\nsolution 2: ${solution_2}\n\nPlease provide your evaluation in the specified format.`
            )
        ]
    });
    const {
        solution_1_score,
        solution_2_score,
        solution_1_reasoning,
        solution_2_reasoning
    } = judgeResponse.structuredResponse;

    return {
        judge: {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    }
}

const graph = new StateGraph(state)
.addNode("solution", solutionNode)
.addNode("judge_node", judgeNode)
.addEdge(START, "solution")
.addEdge("solution", "judge_node")
.addEdge("judge_node", END);

const app = graph.compile();


export default async function runGraph(problem: string) {

     return await app.invoke({ problem });
}