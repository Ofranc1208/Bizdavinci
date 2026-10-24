"""Regenerate the inventory for the bundled 50-record Tampa batch.

Requires openpyxl. Reads the workbook without changing it and replaces the
derived Markdown inventory beside it. This is not an application entry point.
"""

from pathlib import Path
from collections import Counter
from urllib.parse import urlparse
import hashlib
import re
import json
import openpyxl

root = Path(__file__).resolve().parents[1]
source = root / 'tampa_leads_batch1.xlsx'
before = hashlib.sha256(source.read_bytes()).hexdigest()
workbook = openpyxl.load_workbook(source, read_only=True, data_only=True)
sheet = workbook['Tampa Leads Batch 1']
values = list(sheet.values)
records = [dict(zip(values[0], row), source_row=i) for i, row in enumerate(values[1:], 2) if any(v is not None for v in row)]

groups = {
    'Beauty, salons and barbers': list(range(31, 43)),
    'Automotive repair, tires and detailing': [3] + list(range(13, 23)),
    'Home services and trades': [2, 6, 7, 8, 9, 10, 11, 23, 24, 25],
    'Dental, chiropractic and medical practices': [4, 5, 43, 44, 45, 46],
    'Restaurants, cafes and catering': list(range(26, 31)),
    'Professional and business services': [12, 50],
    'Retail and tailoring': [47, 48],
    'Computer repair': [49],
    'Pet services': [51],
}
assigned = [i for ids in groups.values() for i in ids]
assert len(assigned) == len(set(assigned)) == len(records) == 50
assert set(assigned) == {r['source_row'] for r in records}
by_row = {r['source_row']: r for r in records}

def present(value):
    return value is not None and str(value).strip() != ''

def web_status(r):
    if not present(r['website']):
        return 'No URL recorded'
    if 'square.site/book/' in r['website']:
        return 'Booking-page URL'
    return 'Website/storefront URL'

def duplicates(key):
    grouped = {}
    for r in records:
        if present(r[key]):
            value = str(r[key]).strip().casefold()
            grouped.setdefault(value, []).append(r['source_row'])
    return {k: v for k, v in grouped.items() if len(v) > 1}

emails = []
for r in records:
    if present(r['email']):
        emails += [e.strip().casefold() for e in str(r['email']).split(';') if e.strip()]
stats = {
    'records': len(records),
    'industry_labels': len({r['industry'] for r in records}),
    'group_counts': {k: len(v) for k, v in groups.items()},
    'populated': {k: sum(present(r[k]) for r in records) for k in values[0]},
    'web_status_counts': dict(Counter(web_status(r) for r in records)),
    'email_entries': len(emails),
    'unique_email_entries': len(set(emails)),
    'exact_duplicates': {k: duplicates(k) for k in ['business_name', 'phone', 'email', 'website']},
}

def cell(value):
    return str(value).replace('|', '\\|').replace('\n', ' ')

lines = [
    '# Tampa business inventory',
    '',
    '> Reference evidence. For current product context, read [the workspace README](../README.md). Workbook observations are not independently verified customer claims.',
    '',
    'Reviewed: October 23, 2026.',
    '',
    f'Source: [{source.name}]({source.name}), worksheet `Tampa Leads Batch 1`, cells `A1:I51`.',
    '',
    'This is an inventory of the supplied records, not an independent verification of business status, website condition, contact ownership, or email deliverability. The original workbook was read without modification. Category groups below are editorial groupings; each original industry label is retained.',
    '',
    '## Coverage',
    '',
    '| Field | Records populated | Records blank |',
    '|---|---:|---:|',
]
for key in ['business_name', 'industry', 'neighborhood_or_address', 'contact_name', 'phone', 'email', 'website', 'website_issues', 'source_url']:
    n = stats['populated'][key]
    lines.append(f'| {key} | {n} | {len(records)-n} |')
lines += [
    '',
    f"There are 50 lead records, 38 original industry labels and nine broader groups. The 26 populated email cells contain {len(emails)} distinct address entries because Tone & Rose Salon has two recorded addresses. Those are recorded contacts, not verified recipients.",
    '',
    'Website fields: 39 website/storefront URLs, two Square booking-page URLs and nine blanks. A blank means no URL is recorded, not proof that no website exists. The 39 website/storefront URLs can include hosted subdomains and booking-heavy pages; this is not a quality classification.',
    '',
    'No repeated business names, phone values, email-cell values or website values were found after trimming whitespace and ignoring letter case. This does not establish that every record represents a different legal entity or owner. Locations were not deduplicated into brands.',
    '',
    '## Business groups',
    '',
    '| Group | Businesses | With email recorded | With a URL recorded |',
    '|---|---:|---:|---:|',
]
for group, ids in groups.items():
    subset = [by_row[i] for i in ids]
    lines.append(f"| {group} | {len(ids)} | {sum(present(r['email']) for r in subset)} | {sum(present(r['website']) for r in subset)} |")
lines += ['', '## All 50 businesses', '', 'Source row refers to the original Excel row. “Yes” in the email column means an address is recorded; it does not mean the address is verified.', '']
for group, ids in groups.items():
    lines += [f'### {group} ({len(ids)})', '', '| Source row | Business | Original industry | Web presence recorded | Email recorded |', '|---:|---|---|---|---|']
    for i in ids:
        r = by_row[i]
        lines.append(f"| {i} | {cell(r['business_name'])} | {cell(r['industry'])} | {web_status(r)} | {'Yes' if present(r['email']) else 'No'} |")
    lines.append('')
lines += [
    '## What this means for Biz Da Vinci',
    '',
    '- Keep the product relevant to multiple local-business industries. This batch contains only five restaurant/cafe/catering records; restaurant-first positioning would not reflect the supplied audience.',
    '- Personalize recommendations by the business action: request an estimate, book an appointment, call, order, visit, or ask about a service. These are proposed journeys, not measured needs for each lead.',
    '- Use the 41 recorded URLs as starting points for verification and distinguish website pages from booking-only destinations. Offer a business-name/location path when no site URL is available.',
    '- Only 26 records currently contain an email address. The other 24 need published business-contact research before an email workflow can use them.',
    '- Treat the website_issues column as leads for investigation. A copyright year, email provider, hosted subdomain, or JavaScript implementation alone does not establish lost revenue, a security vulnerability, or failed search indexing.',
    '- Verify specific issues on the current site before turning them into personalized claims. No emails were drafted or sent in this review.',
    '',
    '## Source columns',
    '',
    '`A` business name; `B` industry; `C` neighborhood/address; `D` contact name; `E` phone; `F` email; `G` website; `H` website observations; `I` source URL.',
]
report = root / 'TAMPA_BUSINESS_INVENTORY.md'
report.write_text('\n'.join(lines) + '\n', encoding='utf-8')
workbook.close()
assert hashlib.sha256(source.read_bytes()).hexdigest() == before
assert sum(stats['group_counts'].values()) == 50
print(json.dumps(stats, indent=2))
print('Report: ' + str(report))
print('Source SHA-256 unchanged: ' + before)
