import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

def inputExecutor(ctx):
    print(ctx['config']['chatInput'])
    return {"output":ctx['config']['chatInput']}

OPENAI_KEY=os.getenv("OPENAI_API_KEY")

client = AsyncOpenAI(
    api_key=OPENAI_KEY
)

async def agentExecutor(ctx):
    user_input = ctx['input']
    
    output = "Hi,", ctx['input'], "! How may I assist you today? "
    
    response = await client.chat.completions.create(
        model="gpt-4.1-nano",
        messages=[
            {
                "role": "system",
                "content": ctx['config']['systemMessage']
            },
            {
                "role": "user",
                "content": str(user_input)
            }
        ]
    )

    output = response.choices[0].message.content

    return {"output":output}

def outputExecutor(ctx):
    return {"output":ctx['input']}
