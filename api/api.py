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
base_codebase_prompt = '''Summarize the exact purpose and unique features of this GitHub repository, given its JSON representation of all of its files, its GitHub About description, and its README. It must be a concise bullet-pointed list from two to four bullet points that can be directly added to a professional resume. You are limited to 260 characters per bullet point, so, it must not be wordy or too long. Here are a few examples of the output I am expecting. Please do not format your response directly off of these examples, but use them as a reference for wording:

Example 1:

LeoDeng/TimeWeb
- Single-handedly developed a homework management application with 20k+ lines of code that visualizes, quantifies, and prioritizes daily school assignments. 
- TimeWeb splits up and graphs work until they are due so users know what homework to do, when to do it, and for how long.
- Launched to high school in 2022 with multiple class presentations to 250+ students, gaining 700+ users.

Example 2:

ArhanChaudhary/NAND2Tetris
- Architected an emulated full-stack computer, featuring its own programming language, compiler, and CPU. 
- Users can play games with keyboard input on its screen online.
- Conceptually based on the book The Elements of Computing Systems.

%s

%s

Here is the JSON representation of the files in this repository:

'''
forbidden_extensions = ('.json', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.lock', 'README.md')

@app.route('/', methods=['GET'])
async def main():
    too_long = False
    async def list_and_fetch_contents(files, contents):
        nonlocal too_long
        if too_long:
            return
        if type(files) is list:
            tasks = [list_and_fetch_contents(item_path, contents) for item_path in files]
            await asyncio.gather(*tasks)
            return
        if files['download_url'] is None:
            await list_and_fetch_contents(await fetch_file_content(files['url'], True), contents)
        elif file := await fetch_file_content(files['download_url'], False):
            contents[files['path']] = file
            if len(str(json.dumps(contents))) + len(codebase_prompt) > 8191:
                too_long = True
                del contents[files['path']]

    async def fetch_file_content(url, as_json):
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

    username = request.args['username']
    repository = request.args['repository']

    codebase_prompt = ''
    readme = await fetch_file_content(f'https://raw.githubusercontent.com/{username}/{repository}/master/README.md', False)
    if readme is None:
        readme = ''
    else:
        readme = f'Here is the README of this repository:\n\n{readme}'
    about = await fetch_file_content(f'https://api.github.com/repos/{username}/{repository}', True)
    if about is None:
        about = ''
    else:
        about = f'Here is the GitHub About description of this repository:\n\n{about["description"]}'
    codebase_prompt = base_codebase_prompt % (readme, about)
    repo_contents = {}
    initial = requests.get(f'https://api.github.com/repos/{username}/{repository}/contents/').json()
    await list_and_fetch_contents(initial, repo_contents)
    repo_contents_str = json.dumps(repo_contents)

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": codebase_prompt + repo_contents_str}
        ],
    )
    generated_summary = response['choices'][0]['message']['content']
    return jsonify({'generated_summary': generated_summary})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv("PORT", default=5000))