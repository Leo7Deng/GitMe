from flask import Flask, request, jsonify
import asyncio
import aiohttp
import requests
import json
import os
import openai

app = Flask(__name__)

gh_token = os.environ['GH_TOKEN']
request_headers = {
    'Authorization': f'Bearer {gh_token}'
}
openai.api_key = os.environ['OPENAI_API_KEY']
base_codebase_prompt = '''Summarize the exact purpose and unique features of this GitHub repository, given its JSON representation of all of its files, its GitHub About description, and its README. It must be a concise bullet-pointed list from two to four bullet points that can be directly added to a professional resume. You are limited to 260 characters per bullet point, so, it must not be wordy or too long. Here are a few examples of the output I am expecting. Please do not format your response directly off of these examples, but use them as a reference for wording:

Example repository 1:

- Single-handedly developed a homework management application with 20k+ lines of code that visualizes, quantifies, and prioritizes daily school assignments. 
- TimeWeb splits up and graphs work until they are due so users know what homework to do, when to do it, and for how long.
- Launched to high school in 2022 with multiple class presentations to 250+ students, gaining 700+ users.

Example repository 2:

- Architected an emulated full-stack computer, featuring its own programming language, compiler, and CPU. 
- Users can play games with keyboard input on its screen online.
- Conceptually based on the book The Elements of Computing Systems.

%s

%s

Here is the JSON representation of the files in this repository:

'''
forbidden_extensions = ('.json', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.lock', 'README.md')

async def summarize_repo(username, repository):
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
            if len(str(json.dumps(contents))) + len(codebase_prompt) > 5000:
                too_long = True
                del contents[files['path']]

    async def fetch_file_content(url, as_json):
        if any(url.endswith(ext) for ext in forbidden_extensions) or too_long:
            return None
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=request_headers) as response:
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

    codebase_prompt = ''
    readme = await fetch_file_content(f'https://raw.githubusercontent.com/{username}/{repository}/master/README.md', False)
    if readme is None:
        readme = ''
    else:
        readme = f'Here is the README of this repository:\n\n{readme}'
    about = await fetch_file_content(f'https://api.github.com/repos/{username}/{repository}', True)
    if about["description"] is None:
        about = ''
    else:
        about = f'Here is the GitHub About description of this repository:\n\n{about["description"]}'
    codebase_prompt = base_codebase_prompt % (readme, about)
    repo_contents = {}
    initial = requests.get(f'https://api.github.com/repos/{username}/{repository}/contents/', headers=request_headers).json()
    await list_and_fetch_contents(initial, repo_contents)
    if not repo_contents:
        return
    repo_contents_str = json.dumps(repo_contents)
    response = await asyncio.get_event_loop().run_in_executor(None, lambda: openai.ChatCompletion.create(model="gpt-4", messages=[{"role": "user", "content": codebase_prompt + repo_contents_str}]))
    generated_summary = response['choices'][0]['message']['content']
    return {"repository": repository, "generated_summary": generated_summary}

@app.route('/', methods=['GET'])
async def main():
    username = request.args['username']
    repos = requests.get(f'https://api.github.com/users/{username}/repos', headers=request_headers).json()[:10]
    summaries = await asyncio.gather(*[summarize_repo(username, repo['name']) for repo in repos])
    return jsonify([summary for summary in summaries if summary is not None])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv("PORT", default=5000))