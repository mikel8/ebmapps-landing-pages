# Inc. 5000 2026 source-fidelity validation

## Result: READY FOR STAKEHOLDER TEST — no speculative correction applied

The source capture contains 5,002 unique company IDs for year 2026, spanning rank values 1–5,000. The export process preserves every supplied 2026 record and sorts by numeric rank and company name.

| Check | Result |
|---|---:|
| Source records tagged 2026 | 5,002 |
| Unique company IDs | 5,002 |
| Unique company names | 4,999 |
| Minimum / maximum rank | 1 / 5,000 |
| Missing rank value | 1 (1192) |
| Duplicate rank values | 75, 688, 3380 (two distinct companies at each) |

## Evidence

The raw source records themselves—not a CSV transformation—contain both companies for each duplicate rank. At ranks 688 and 3380, the paired records have the same growth rate; that is consistent with a possible tie but the source does not expose an explicit tie flag. Rank 75 has two distinct companies with different growth rates, so the capture alone cannot establish why that rank repeats. No duplicate company IDs were created by export.

The raw source has no 2026 record with rank 1192. Because replacing, renumbering, or removing records would require an unsupported editorial choice, the customer artifact is intentionally unmodified. The product source should be described as a source-derived 2026 export with 5,002 records, not as a corrected or independently reconciled ranking.

## Customer-facing quality language

“Ready-to-analyze source-derived 2026 company data. The file preserves the supplied records, includes unique company IDs, and is provided with a schema sample for import validation.”
