#!/usr/bin/env python3
"""Merge ConferencePapers.html and JournalPapers.html into AllPapers.html, sorted by year then month desc."""

import re
from collections import Counter

MONTH_MAP = {
    'january': 1, 'february': 2, 'march': 3, 'april': 4,
    'may': 5, 'june': 6, 'july': 7, 'august': 8,
    'september': 9, 'october': 10, 'november': 11, 'december': 12,
    'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4,
    'jun': 6, 'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12,
}
_MONTH_PATTERN = '|'.join(sorted(MONTH_MAP, key=len, reverse=True))


def extract_month(li_html, year):
    """Return month number (1–12) closest to `year` in the paper HTML, or 0 if unknown."""
    # English: "Month [DD[-DD]] YYYY"  e.g. "July 2-7 2026", "November 2025"
    m = re.search(
        rf'({_MONTH_PATTERN})\.?\s+(?:\d{{1,2}}[-–]\d{{1,2}}\s+)?{year}\b',
        li_html, re.IGNORECASE
    )
    if m:
        return MONTH_MAP[m.group(1).lower().rstrip('.')]

    # English: "DD Month YYYY"  e.g. "1 September 2025"
    m = re.search(
        rf'\b\d{{1,2}}\s+({_MONTH_PATTERN})\.?\s+{year}\b',
        li_html, re.IGNORECASE
    )
    if m:
        return MONTH_MAP[m.group(1).lower().rstrip('.')]

    # Korean: "YYYY년 M월"  e.g. "2016년 10월"
    m = re.search(rf'{year}년\s*(\d{{1,2}})월', li_html)
    if m:
        return int(m.group(1))

    # Korean loose: any "M월" in the block (for papers where year appears as 2-digit etc.)
    m = re.search(r'(\d{1,2})월', li_html)
    if m:
        val = int(m.group(1))
        if 1 <= val <= 12:
            return val

    return 0  # unknown → sort to end


def extract_papers_by_year(filepath):
    """Parse an HTML file and return a dict of {year: [li_items_html]}."""
    with open(filepath, encoding='utf-8') as f:
        content = f.read()

    blockquotes = re.split(r'<blockquote>', content)
    papers = {}  # year (int) -> list of <li>...</li> strings

    for block in blockquotes[1:]:
        year_match = re.search(r'#(\d{4})', block)
        if not year_match:
            candidates = re.findall(r'\b((?:19|20)\d{2})\b', block)
            if not candidates:
                continue
            year = int(Counter(candidates).most_common(1)[0][0])
        else:
            year = int(year_match.group(1))

        ul_match = re.search(r'<ul class="nm">(.*?)</ul>', block, re.DOTALL)
        if not ul_match:
            continue
        ul_content = ul_match.group(1)

        li_items = re.findall(r'<li>(.*?)</li>', ul_content, re.DOTALL)
        li_items = ['<li>' + item.strip() + '</li>' for item in li_items]

        papers.setdefault(year, []).extend(li_items)

    return papers


def sort_by_month(items, year):
    """Sort paper <li> list by month descending; unknowns go last."""
    def key(li):
        m = extract_month(li, year)
        return (1 if m == 0 else 0, -m)  # unknowns (0) sort after known months
    return sorted(items, key=key)


def build_merged_html(conf_papers, jour_papers):
    all_years = sorted(set(conf_papers.keys()) | set(jour_papers.keys()), reverse=True)

    nav_parts = [f'<a href="#{str(y)[2:]}">{y}</a>' for y in all_years]
    row_size = 13
    nav_rows = [' | '.join(nav_parts[i:i+row_size]) for i in range(0, len(nav_parts), row_size)]
    nav_html = ' <br> '.join(nav_rows)

    sections = []
    for year in all_years:
        short = str(year)[2:]
        combined = conf_papers.get(year, []) + jour_papers.get(year, [])
        sorted_items = sort_by_month(combined, year)
        li_block = '\n\t\t\t<br>\n\t\t\t'.join(sorted_items)
        section = f'''<blockquote>
\t<p><a name="{short}">#{ year }</font></a></p>
\t<ul class="nm">
\t\t{li_block}
\t</ul>
\t<p><small><a href="#top">Back to Top</a></small></p><br>
</blockquote>'''
        sections.append(section)

    sections_html = '\n\n'.join(sections)

    return f'''---
layout: default
title: AllPapers
permalink: /Publications/AllPapers/
---
<style>
@import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);
.nm{{font-family: 'Jeju Gothic', sans-serif;}}
.publisher-link {{color: darkcyan; text-decoration: none;}}
.publisher-link:hover, .publisher-link:focus {{text-decoration: underline;}}
</style>

<a name="top"></a>
<h4>Publications</h4>
<div class="linklink nm" style = "background-color:#ffffff;border-radius:0 13px">
\t<ul class="posts-list">
\t\t<li class="post-link">
\t\t\t<a class="post-title" href="https://nlplab-skku.github.io/Publications/JournalPapers/">Journal Papers</a>
\t\t</li>
\t\t<li class="post-link">
\t\t\t<a class="post-title" href="https://nlplab-skku.github.io/Publications/ConferencePapers/">Conference Papers</a>
\t\t</li>
\t\t<li>All Papers(here)</li>
\t</ul>
</div>

<div class="post">
\t<h1 class="pageTitle">All Papers</h1>
\t<p class="meta">전체 논문 (Journal + Conference)</p>
\t<div class="linklink" style = "text-align:center;">
\t\t{nav_html}
\t</div>
</div>
<br>

{sections_html}
'''


def main():
    base = '/home/park/Desktop/hecarimday.github.io-main/Publications'
    conf = extract_papers_by_year(f'{base}/ConferencePapers.html')
    jour = extract_papers_by_year(f'{base}/JournalPapers.html')

    total_conf = sum(len(v) for v in conf.values())
    total_jour = sum(len(v) for v in jour.values())
    print(f'Conference: {total_conf}, Journal: {total_jour}, Total: {total_conf + total_jour}')

    # Print month detection for spot-check on 2025
    print('\n--- 2025 month detection sample ---')
    all_2025 = conf.get(2025, []) + jour.get(2025, [])
    for li in all_2025:
        mo = extract_month(li, 2025)
        # grab first <small> snippet for display
        snip = re.search(r'<small>(.*?)</small>', li, re.DOTALL)
        snip_text = snip.group(1).strip()[:80].replace('\n', ' ') if snip else '?'
        print(f'  month={mo:2d}  {snip_text}')

    merged = build_merged_html(conf, jour)
    out = f'{base}/AllPapers.html'
    with open(out, 'w', encoding='utf-8') as f:
        f.write(merged)
    print(f'\nWritten to {out}')


if __name__ == '__main__':
    main()
