import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()


OPENAI_KEY=os.getenv("OPENAI_API_KEY")

client = AsyncOpenAI(
    api_key=OPENAI_KEY
)

def inputExecutor(ctx):
    return {"output":ctx['config']['chatInput']}

async def agentExecutor(ctx):
    user_input = ctx['input']
    print(ctx['config'])
    output = f"{user_input}"
    
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

async def conditionalExecutor(ctx):
    user_input = str(ctx["input"])

    response = await client.chat.completions.create(
        model="gpt-4.1-nano",
        messages=[
            {
                "role": "system",
                "content": (f"You are a sentiment classifier. Return ONLY 'true' if the statement {ctx['config']['value']} can be stated to true, otherwise return 'false'.")
            },
            {
                "role": "user",
                "content": user_input
            }
        ],
        temperature=0
    )

    result = response.choices[0].message.content.strip().lower()
    
    print(result)

    condition_result = (result == "true")

    return {
        "output": user_input,
        "conditionResult": condition_result
    }