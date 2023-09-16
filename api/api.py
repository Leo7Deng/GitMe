import asyncio
import aiohttp
import requests
import json
import os

username = 'ArhanChaudhary'
repository = 'NAND'
gh_token = os.environ.get('GH_TOKEN')

api_url = f'https://api.github.com/repos/{username}/{repository}/contents/'

forbidden_extensions = ('.json', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.lock', )
async def fetch_file_content(url, as_json=False):
    if any(url.endswith(ext) for ext in forbidden_extensions):
        return None
    headers = {
        'Authorization': f'Bearer {gh_token}'
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            if response.status != 200:
                return None
            if as_json:
                return await response.json()
            try:
                response_text = await response.text()
            except UnicodeDecodeError:
                return None
            else:
                if response_text.count('\n') > 1000:
                    return None
                return response_text

async def list_and_fetch_contents(files):
    if type(files) is list:
        tasks = [list_and_fetch_contents(item_path) for item_path in files]
        await asyncio.gather(*tasks)
        return
    if files['download_url'] is None:
        await list_and_fetch_contents(await fetch_file_content(files['url'], True))
    elif file := await fetch_file_content(files['download_url']):
        contents[files['path']] = file

contents = {}
loop = asyncio.get_event_loop()
initial = requests.get(api_url).json()
loop.run_until_complete(list_and_fetch_contents(initial))
repo_contents_json = json.dumps(contents)
