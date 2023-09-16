import asyncio
import aiohttp
import requests
import json
import os
import openai

username = 'ArhanChaudhary'
repository = 'NAND'
gh_token = os.environ['GH_TOKEN']
openai.api_key = os.environ['OPENAI_API_KEY']
codebase_prompt = os.environ['CODEBASE_PROMPT']

api_url = f'https://api.github.com/repos/{username}/{repository}/contents/'

forbidden_extensions = ('.json', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.lock', )
async def fetch_file_content(url, as_json=False):
    if any(url.endswith(ext) for ext in forbidden_extensions) or too_long:
        return None
    headers = {
        'Authorization': f'Bearer {gh_token}'
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            if response.status != 200 or too_long:
                return None
            if as_json:
                return await response.json()
            try:
                response_text = await response.text()
            except UnicodeDecodeError:
                return None
            else:
                if len(str(response_text)) > 1000:
                    return None
                return response_text

async def list_and_fetch_contents(files):
    global too_long
    if too_long:
        return
    if type(files) is list:
        tasks = [list_and_fetch_contents(item_path) for item_path in files]
        await asyncio.gather(*tasks)
        return
    if files['download_url'] is None:
        await list_and_fetch_contents(await fetch_file_content(files['url'], True))
    elif file := await fetch_file_content(files['download_url']):
        contents[files['path']] = file
        if len(str(json.dumps(contents))) + len(codebase_prompt) > 8191:
            too_long = True
            del contents[files['path']]

too_long = False
contents = {}
loop = asyncio.get_event_loop()
initial = requests.get(api_url).json()
loop.run_until_complete(list_and_fetch_contents(initial))
repo_contents_json = json.dumps(contents)

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": codebase_prompt + str(repo_contents_json)}
    ],
)
generated_summary = response['choices'][0]['message']['content']
print(generated_summary)