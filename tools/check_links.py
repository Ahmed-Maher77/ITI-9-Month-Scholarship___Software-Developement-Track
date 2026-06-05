import os
import sys
from urllib.parse import unquote

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
readme = os.path.join(repo_root, 'README.md')

missing = []
all_links = []

def find_links(text):
    i = 0
    links = []
    while True:
        i = text.find('[', i)
        if i == -1:
            break
        j = text.find(']', i+1)
        if j == -1:
            break
        # next should be '('
        k = text.find('(', j+1)
        if k == -1:
            i = j+1
            continue
        # find matching closing ')' allowing nested parentheses
        p = k+1
        depth = 1
        while p < len(text) and depth > 0:
            if text[p] == '(':
                depth += 1
            elif text[p] == ')':
                depth -= 1
            p += 1
        if depth == 0:
            link_text = text[i+1:j]
            link_target = text[k+1:p-1]
            links.append((link_text, link_target))
            i = p
        else:
            break
    return links

with open(readme, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines, start=1):
    for text, target in find_links(line):
        all_links.append((i, text, target))

print(f'Read {len(lines)} lines, found {len(all_links)} links')

for ln, text, target in all_links:
    t = target.strip()
    # skip external links
    if t.startswith('http://') or t.startswith('https://') or t.startswith('mailto:'):
        print(f'OK  L{ln}: {t} (external)')
        continue
    # strip anchors
    if '#' in t:
        t = t.split('#',1)[0]
    # remove surrounding < > if present
    if t.startswith('<') and t.endswith('>'):
        t = t[1:-1]
    # unquote percent-encodings
    t = unquote(t)
    # normalize leading ./ and /
    if t.startswith('./'):
        t = t[2:]
    if t.startswith('/'):
        t = t[1:]

    abs_path = os.path.join(repo_root, t)

    if os.path.exists(abs_path):
        print(f'OK  L{ln}: {target} -> exists')
    else:
        print(f'MISS L{ln}: {target} -> MISSING (checked {abs_path})')
        missing.append((ln, text, target, abs_path))

print('\nSummary:')
print(f'  Total links: {len(all_links)}')
print(f'  Missing: {len(missing)}')
if missing:
    print('\nMissing details:')
    for ln, text, target, abs_path in missing:
        print(f' - L{ln}: {target} -> {abs_path}')
    sys.exit(2)
else:
    sys.exit(0)
