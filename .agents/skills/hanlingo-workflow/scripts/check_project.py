#!/usr/bin/env python3
"""Read-only HanLingo preflight; --verify additionally runs tests and build."""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys


def run(repo, *args):
    return subprocess.run(args, cwd=repo, capture_output=True, text=True, check=False)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=Path.cwd())
    parser.add_argument('--verify', action='store_true', help='Run current npm test/build scripts; no installation or deployment')
    args = parser.parse_args()
    repo = args.repo.resolve()
    package_path = repo / 'package.json'
    try:
        package = json.loads(package_path.read_text())
    except (OSError, ValueError):
        parser.error('Choose a HanLingo checkout containing package.json.')
    if package.get('name') != 'hanlingo' or not (repo / 'AGENTS.md').is_file():
        parser.error('This is not an identified HanLingo project; no commands were run.')
    git = run(repo, 'git', '--no-optional-locks', 'status', '--porcelain')
    branch = run(repo, 'git', 'branch', '--show-current')
    commit = run(repo, 'git', 'rev-parse', 'HEAD')
    tracked = {k: bool(os.environ.get(k, '').strip()) for k in (
        'HANLINGO_MODEL_BASE_URL', 'HANLINGO_MODEL_API_KEY', 'HANLINGO_MODEL')}
    local_env = repo / '.env.local'
    if local_env.is_file() and not local_env.is_symlink():
        for line in local_env.read_text().splitlines():
            key, sep, value = line.strip().removeprefix('export ').partition('=')
            if sep and key.strip() in tracked and not os.environ.get(key.strip()):
                # Only presence booleans leave this process; never print values.
                value = value.strip().strip('"\'')
                tracked[key.strip()] = bool(value and not value.startswith('#'))
    result = {
        'repo': str(repo),
        'branch': branch.stdout.strip() if branch.returncode == 0 else None,
        'commit': commit.stdout.strip() if commit.returncode == 0 else None,
        'changes': git.stdout.splitlines() if git.returncode == 0 else ['Git status unavailable'],
        'provider_fields_present': tracked,
        'provider_note': 'Presence only; URL validity, authentication, model execution and linguistic accuracy are unverified.',
        'local_url': 'http://127.0.0.1:5173/',
        'scripts': {k: package.get('scripts', {}).get(k) for k in ('test', 'build', 'api', 'audit:content', 'build:translation-evidence')},
        'release_note': 'No network requests or live-release claims are made by this script.',
    }
    print(json.dumps(result, indent=2), flush=True)
    if args.verify:
        for name in ('test', 'build'):
            if name not in package.get('scripts', {}):
                parser.error(f'Missing npm script: {name}')
            print(f'Running npm run {name}', flush=True)
            completed = subprocess.run(['npm', 'run', name], cwd=repo, check=False)
            if completed.returncode:
                return completed.returncode
    return 0


if __name__ == '__main__':
    sys.exit(main())
