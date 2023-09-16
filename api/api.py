from flask import Flask, request, jsonify
import asyncio
import aiohttp
import requests
import json
import os
import openai

app = Flask(__name__)

gh_token = os.environ['GH_TOKEN']
openai.api_key = os.environ['OPENAI_API_KEY']
codebase_prompt = "Summarize the exact purpose and unique features of this GitHub repository, given its JSON representation of all of its files. I want it to be a concise bullet-pointed list in a resume style from three to five bullet points, so it must not be wordy or too long. Here is the JSON: \n\n"
forbidden_extensions = ('.json', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.lock', )

async def fetch_file_content(url, as_json, too_long):
    if any(url.endswith(ext) for ext in forbidden_extensions) or too_long[0]:
        return None
    headers = {
        'Authorization': f'Bearer {gh_token}'
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            if response.status != 200 or too_long[0]:
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

async def list_and_fetch_contents(files, contents, too_long):
    if too_long[0]:
        return
    if type(files) is list:
        tasks = [list_and_fetch_contents(item_path, contents, too_long) for item_path in files]
        await asyncio.gather(*tasks)
        return
    if files['download_url'] is None:
        await list_and_fetch_contents(await fetch_file_content(files['url'], True, too_long), contents, too_long)
    elif file := await fetch_file_content(files['download_url'], False, too_long):
        contents[files['path']] = file
        if len(str(json.dumps(contents))) + len(codebase_prompt) > 8191:
            too_long[0] = True
            del contents[files['path']]

@app.route('/', methods=['GET'])
def main():
    username = request.args['username']
    repository = request.args['repository']
    api_url = f'https://api.github.com/repos/{username}/{repository}/contents/'
    contents = {}
    asyncio.set_event_loop(asyncio.SelectorEventLoop())
    loop = asyncio.get_event_loop()
    initial = requests.get(api_url).json()
    loop.run_until_complete(list_and_fetch_contents(initial, contents, [False]))
    repo_contents_json = json.dumps(contents)
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": codebase_prompt + str(repo_contents_json)}
        ],
    )
    generated_summary = response['choices'][0]['message']['content']
    return jsonify({'generated_summary': generated_summary})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv("PORT", default=5000))