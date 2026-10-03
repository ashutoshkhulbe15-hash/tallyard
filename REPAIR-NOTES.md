# Tallyard workflow reconciliation — 2026-10-03

This release repairs the destructive calculator and metadata simplifications on top of the editorial-restoration checkout `0816dbf4b77ef3dbac9f2359b26770f140dfbf6b`. It is not an SEO traffic-recovery guarantee.

## Restored, not condensed

- All 50 original calculator input IDs, all original FAQ questions and source URLs, and all 50 original descriptive route metadata objects are restored. The complete long-form article expansions remain connected.
- The original descriptions, methods and FAQs are primary content again. The duplicated `OriginalCalculatorNotes` appendix is no longer rendered; its source snapshot remains as a preservation fixture.
- All 80 editorial routes are checked against the existing original-content baseline. No article sections or headings were removed. Specific factual/safety corrections are individually recorded in `tests/editorial-corrections.json`.
- 42 original workflow example results match the values previously captured from the original archive. This demonstrates restoration, not independent professional certification of every formula or factual statement.

## Corrections retained or introduced

- Six checked implementations remain active: asphalt, concrete, gravel, mulch, paint and wire sizing. Their original articles, methods, questions and sources remain available. Wire sizing refuses exhausted conductor tables rather than returning an unsupported size.
- Other original workflows are evaluated in canonical US physical units. Metric measurements convert exactly before evaluation; dimensioned primary results convert back where applicable. Supporting details and fixed stock/rate/code presets remain labelled in US reference units, with an explicit metric-mode notice. This is not a complete metric rewrite of every supporting row.
- The topsoil imperial bag-count defect from the simplified version is corrected; the restored 20×10 ft, 6-inch example reports 134 bags of 0.75 ft³ in both unit modes. Stud spacing no longer shows a feet number labelled inches.
- Heat-pump scenario inputs are restored, but the old silent five-ton cap is removed. The default example is 80,000 BTU/h / 6.67 illustrative ton-equivalent, not a Manual J calculation or equipment selection.
- Original price-based workflows are restored with a conspicuous illustrative-benchmark warning, not represented as verified current quotations.
- Partial reference checks are not reported as complete code/safety approvals. The framing worksheet does not select a header; snow-pressure comparison does not certify spare roof capacity. Cord/drain examples reject table exhaustion.
- Pool volume, measured chlorine, entered target and product-type controls remain. Exact label strength is required; liquid mass-to-volume conversion requires exact density. There is no automatic shock target or safe-to-swim verdict. A narrow paragraph/table/caption correction replaces blanket pre-dissolution instructions with exact-label handling.
- Expired federal-credit FAQ sentences are corrected rather than left alongside a contradictory warning. Existing dated-benchmark, hypothetical-scenario, security/framework, canonical/indexing and schema fixes remain.

Official references for narrow corrections: [IRS Form 5695 instructions](https://www.irs.gov/instructions/i5695), [CDC chemical-safety guidance](https://www.cdc.gov/healthy-swimming/toolkit/pool-chemical-safety.html), [CDC use-chemicals-safely poster](https://www.cdc.gov/healthy-swimming/media/pdfs/Pool-Chemical-Safety-USE-poster-p.pdf).

## Verification and limits

- Strict ESLint and production TypeScript/build checks.
- 48 automated tests, including restored input/FAQ/source inventories, metadata equality, original archive examples, both-unit finite results, invalid-input handling and focused arithmetic/safety regressions. The older numerical regression suite also exercises the saved checked implementations, not all of those implementations are the default public workflow.
- 97 built HTML documents and 260 JSON-LD blocks: canonical/indexing rules, valid JSON and local link targets checked.
- 80 original editorial routes: 6,590 text/diagram/table blocks and 594 links checked, allowing only the explicit correction ledger and source-note punctuation differences. The heat-pump baseline contains 2,393 original words across its article/editorial material; these are preserved subject to the recorded scoped intro/method/FAQ corrections.
- Package application is verified separately against a clean copy of the deployed checkout before handoff.

No automated assertion establishes that every original claim is correct, or that Google will restore rankings. Browser interaction/hydration was not manually exercised in this verification; source-level form logic, calculator functions, and production HTML/build output were checked. No other projects, global tools, live deployment files or Git history were changed by this repair. `package.json` and `package-lock.json` are unchanged from the deployed restoration checkout.

## Re-run after extracting

```sh
npm test
npm run build
node scripts/verify-built-site.cjs
node scripts/verify-restored-content.cjs
git diff --check
```

Do not use earlier recovery ZIPs over this repair. Keep the full previous checkout/commit as the rollback point.
