import { OPEN_AI_API_KEY } from "@/lib/config";
import { getQueryParamValue } from "@/lib/utils";
import { OpenAI, PromptTemplate } from "langchain";
import { StructuredOutputParser } from "langchain/output_parsers";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server"

export const GET = async (req: NextApiRequest) => {
    const url = req.url
    const topic = getQueryParamValue(url as string, "topic")

    if (!topic) {
        return NextResponse.json({
            message: "'topic' must be defined as query string"
        })
    }

    try {        
        // TODO: define format instruction
        const format = StructuredOutputParser.fromNamesAndDescriptions({
            todos: "todos should be a string and separated with '|'",
            description: "description should return the description of the topic, and has 5-10 words",
            emoji: "emoji should represent the topic, should return singgle emoji"
        })
    
        const formatInstruction = format.getFormatInstructions()
    
        // TODO: define template prompts
        const promptTemplate = new PromptTemplate({
            inputVariables: ["topic"],
            template: "Create step by step todos how to {topic} \n {format_instructions}",
            partialVariables: { 
                format_instructions: formatInstruction
            }
        })
        
        // TODO: define model
        const model = new OpenAI({
            openAIApiKey: OPEN_AI_API_KEY,
            temperature: 0,
        })
    
        // TODO: define input
        const input = await promptTemplate.format({
            topic: topic || "Make earth zero emmision"
        })
        
        // TODO: process the input
        const raw = await model.call(input)
        const response = await format.parse(raw)
    
        return NextResponse.json({
            data: response
        });
    } catch (error) {
        return NextResponse.json({
            message: "Someting went wrong"
        }, { status: 422 })
    }
    
}