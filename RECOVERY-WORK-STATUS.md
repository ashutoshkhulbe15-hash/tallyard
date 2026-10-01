# Tallyard recovery implementation status

Working copy created from the supplied `tallyard-main (20).zip`. The supplied source matches the earlier archive; the audit exports remain untouched. This folder is **not deployed**.

## First implementation batch

- Wire sizing: corrected the table to the 60°C ampacity column, stopped returning 4/0 when no listed size passes, made unsupported inputs show an error, fixed the primary AWG display, and narrowed the page to a preliminary estimate. The unreviewed long electrical article and HowTo markup are not rendered pending qualified review.
- Stairs: corrected the metric-mode handling of inch-valued select options, adjusted the metric default width to 36 inches exactly, and changed the result to report only the dimensional checks actually made.
- Snow load: removed the false ground-load-versus-roof-capacity comparison and all “within capacity” verdicts. The tool now estimates uniform snow/ice weight only; the unreviewed long article is not rendered.
- Pool chlorine: replaced contradictory per-product factors with a single ppm-to-mass calculation, removed slow-release tablets and shock-treatment claims from the interactive tool, and narrowed the page to an estimate requiring label checks and retesting. The unreviewed long article is not rendered.
- Concrete: corrected the contradictory FAQ bag counts to agree with stated product yields.
- Shared content systems: removed fabricated slug-derived dates from calculator JSON-LD and visible template copy, omitted unverified sitemap `lastmod` values, omitted guide schema dates pending verification, relabeled scenario cards as hypothetical, and removed four explicit invented interview narratives. Reduced blanket accuracy/review claims on the homepage, About page, and calculator template.

## Second implementation batch

- Removed `Dataset` structured data from all ten cost pages. A set of price ranges is not presented as an independently published dataset. Removed unverified `datePublished`/`dateModified` properties on those pages while leaving visible price estimates for source-level review.
- Removed unverified publication times from all six guide social-preview metadata blocks and retired unused `publishedAt` fields from guide configs.
- Rewrote a fictional roofer interview and two generated roof/fence incident narratives as explicitly hypothetical calculations. The shared scenario disclaimer now states that figures are not documented projects or verified quotes.

## Third implementation batch

- Rechecked federal residential energy-credit dates against the IRS. Section 25D solar credit ended for expenditures after December 31, 2025 (the IRS generally treats solar expenditure as made when original installation is complete); Section 25C home-improvement credit ended for equipment placed in service after that date. The site had incorrectly promised both credits for new 2026 installs.
- Rebuilt the solar and HVAC replacement cost pages around current itemized local bids, actual utility rules, and verifiable incentive eligibility. Removed invented national after-credit prices, universal paybacks, fictional case economics, and unsupported claims that a heat pump is always cheaper.
- Replaced the visible heat-pump-vs-furnace guide body with a shorter, defensible comparison, and corrected its FAQ, summary, and source note. The superseded long guide component remains in source but is no longer rendered; it needs cleanup after final editorial review.
- Withheld the unreviewed heat-pump and water-heater calculator expansions from rendered pages because they contain expired credits and unsupported payback examples. Updated their FAQ text, category pages, and homepage teaser. The calculators themselves remain available as preliminary estimates.

## Fourth implementation batch

- Replaced the siding and bathroom cost pages' untraceable “2026 prices,” invented homeowner cases, and unsupported methodology claims. Both now identify a directly linked, defined 2025 national Cost vs. Value benchmark as historical context and explain how to compare current local bids for equivalent work. No new 2026 national range was invented.
- Removed contradictory price badges for those pages—and the previously corrected solar/HVAC cost pages—from both site indexes. Corrected stale guide-index and roofing-category teaser copy that repeated categorical savings claims.
- GSC page data was rechecked: clicks in the supplied export concentrate on calculators, not the cost pages. After finishing this cost-guide claim pass, the next priority is formula and rendered-claim QA on the high-exposure tools (fence, paint, shed, concrete, then the rest), without mistaking ranking changes for proof of a specific Google penalty.

## Fifth implementation batch

- Replaced the roof and deck cost guides' unverified 2026 price ranges, invented scenarios, universal lifespan/payback claims, and unsupported contractor-source descriptions. They now use clearly dated, defined 2025 national Cost vs. Value figures as context, with roof/deck-specific bid checklists and links to primary roofing/deck guidance.
- Removed conflicting roof/deck price badges from the calculator and guide indexes. Corrected the roofing category page's obsolete claim that the snow calculator checks a roof's structural design capacity; it only estimates weight. Removed other categorical roof lifespan and savings promises on that page.

## Sixth implementation batch

- Replaced the fence and concrete cost guides' unsourced 2026 price ranges, fabricated case stories, universal delivery breakpoints, and categorical construction advice. The new pages provide explicit quantity examples and scope-based bid checklists, with primary links to 811, FTC, and NRMCA guidance. No current national price range was invented.
- Fixed the high-exposure fence calculator's metric-mode spacing conversion: select values are feet in both modes. Narrowed it to a straight-run takeoff; removed false exact gate/corner adjustments and concrete-bag counts that cannot be computed without a layout and hole dimensions. Updated the contradictory 100-foot FAQ.
- Withheld the concrete calculator's unreviewed long article, which contained unsupported price and bag-versus-truck claims. Corrected its FAQ/methodology to describe the allowance and supplier-dependent delivery terms accurately. Corrected related masonry and landscaping category claims and the cost-guide index badges.

## Seventh implementation batch

- Finished all ten cost-guide claim passes. Replaced unsupported paint/flooring national price ranges, cost breakdowns, product-life promises, and fictional bids with comparable-scope quote checklists and calculator links; removed their stale index badges.
- Paint calculator: added an optional ceiling area (the supplied GSC queries included ceiling coverage questions), aligned metric coverage to approximately 350 sq ft per US gallon, changed the rounded purchase estimate to whole gallons/liters, and corrected FAQs that disagreed with the formula or overstated coverage.
- Shed calculator: replaced its unsupported framing takeoff (studs, joists, rafters, and material totals inferred without enough structural/design inputs) with a bounded surface-area and nominal sheet estimate for a simple 6/12 gable geometry. Removed the unsourced long expansion and HowTo markup, and corrected the site index description.
- Replaced the kitchen-cabinet calculator's unsupported 2026 pricing promise with a limited gross cabinet-run and illustrative module estimate; removed its fictional/current-price cues and corrected a metric display conversion.

## Eighth implementation batch

- Countertop calculator: removed unsupported installed-price output and price FAQ, expired/current-market claims, material comparisons, and overstated fabricator instructions. It is now a surface-area planning estimate; metric results are converted for display. Fabrication/order quantities remain out of scope pending a template.
- Deck calculator: narrowed an unsafe framing/material list (joists, beams, posts, fasteners inferred from a rectangle) to deck surface area and rough surface-board quantity only. Removed cost, span, and code conclusions that were not supportable from the inputs; updated route metadata and index listing. Structural design is explicitly out of scope.
- Changes in this batch have not been built, type-checked, regression-tested, or reviewed in a browser.

## Ninth implementation batch

- Asphalt calculator: removed generalized driveway thickness/base specifications, construction timing and service-life claims, and unsupported 2025–26 installed-price output. Removed its unreviewed HowTo/expansion, narrowed FAQs and route metadata, and made thickness/waste inputs explicit assumptions. Output remains an approximate volume/weight estimate using an assumed density; it is not pavement design or an order quote.
- This batch is also unverified; no deployment has occurred.

## Tenth implementation batch

- Gravel calculator: corrected the metric weight conversion (US short tons per cubic yard converted to metric tonnes per cubic metre) and precise inch-to-centimetre depth conversion. Removed generic driveway/base depth advice, unsourced current prices and supplier assumptions, and the unreviewed HowTo/content expansion. The tool now labels the weight as approximate and scopes depth to a user input; index copy was updated.
- This batch is unverified; no deployment has occurred.

## Eleventh implementation batch

- Chimney calculator: narrowed the flue-size calculator to rectangular fireplace-opening area only. Removed calculated liner recommendations, appliance outlet sizing, chimney-height verdicts, 3-2-10 guidance, current cost claims, and unreviewed HowTo/article content. Updated metadata and calculator index to clearly say it does not size a flue or vent system. Added prominent direction to seek qualified assessment for real installations or suspected venting issues.
- This batch is unverified; no deployment has occurred.

## Twelfth implementation batch

- Deck stair calculator: replaced the printable stringer cut sheet and single-IRC-version pass/fail checks with a geometry-only estimator. It now uses a user-selected target riser height and tread run, supports metric/imperial conversion, and reports equal-rise count, total run, and a diagonal estimate explicitly not a cut length. Removed unsupported code, guard, handrail, lumber, and construction recommendations from visible calculator content and metadata.
- This batch is unverified; no deployment has occurred.

## Thirteenth implementation batch

- BTU calculator: replaced unsupported generalized cooling formula and climate/ceiling multipliers with the current ENERGY STAR room-air-conditioner area chart and its stated adjustments for sun exposure, occupants above two, and kitchens. Removed home/central AC and heat-pump sizing claims, unsupported advice about oversizing, and unreviewed long content. Out-of-chart room areas are no longer extrapolated. Updated page metadata and index; linked ACCA Manual J as a reference for professional whole-home load calculations, not as a method implemented here.
- This batch is unverified; no deployment has occurred.

## Fourteenth implementation batch

- Drain-pipe calculator: replaced branch/stack/building-drain size recommendations and IPC/UPC “code” verdicts with an explicitly limited IPC 2021 fixture-unit worksheet. Fixture assumptions now distinguish common private toilet types; dishwashers are no longer double-counted separately from the domestic kitchen-sink table value. Pipe, vent, slope, and compliance checks are explicitly out of scope.
- Roofing calculator: narrowed shingle bundle and ridge-cap output to a geometric area estimate for a simple rectangular plane at one pitch. Removed unsupported roof-shape assumptions, waste/order quantities, and material coverage claims; updated route metadata.
- Extension-cord calculator: removed prescriptive AWG recommendations and broad product-rating/installation claims. It now estimates voltage drop for a user-selected conductor size and current, clearly not a cord safety or ampacity determination; updated route metadata.
- Updated the calculator index to match all three narrowed tools. This batch is unverified; no deployment has occurred.

## Fifteenth implementation batch

- Topsoil calculator: narrowed to volume and optional count by selected bag volume. Removed unsupported density/weight, soil-grade guidance, generic depth advice, and current-price claims; corrected metric package conversion and route/index copy.
- Mulch calculator: corrected the metric default (select values are inch-based), used exact inch-to-centimetre and bag-volume conversions, and removed unsupported depth/pricing guidance and unreviewed long content.
- Sod calculator: narrowed to area and piece-count estimates using user-selected example package formats and planning allowance. Removed unsupported pallet counts, supplier-independent waste guidance, variety/install claims, and pricing.
- Replaced stale landscaping-category claims about depth recommendations, compaction, waste buffers, price crossover, supplier package practices, and delivery savings with explicit limits and verification advice.
- This batch is unverified; no deployment has occurred.

## Sixteenth implementation batch

- Paver calculator: removed unsupported pattern-based waste percentages, base-depth prescriptions, assumed aggregate/sand weights, joint-sand quantities, and detailed installation claims. It now estimates paver count from rectangular area, nominal face dimensions, and an explicitly user-selected allowance; actual product coverage and layout must be checked separately.
- Rainwater calculator: replaced preset regional/annual rainfall, inferred tank/barrel sizes, usage-equivalence claims, and unsupported capture-efficiency defaults with user-entered event rainfall and a clearly identified capture-factor assumption. It reports estimated runoff only; storage, annual yield, demand, water quality, and plumbing design are out of scope.
- Updated route metadata, calculator indexes, and landscaping overview to match the narrower outputs. This batch is unverified; no deployment has occurred.
- Narrowed the patio planner as well: removed its speculative pattern waste, base-depth/compaction takeoff, joint-sand, edge-restraint, cost outputs, and prescriptive installation article. It now estimates only rectangular area and nominal paver count, with prominent scope limits.
- Corrected neighboring calculator cross-links and the masonry/planner indexes so they no longer promise tank sizing, paver base takeoffs, or multi-calculator patio planning.

## Seventeenth implementation batch

- Pool chlorine tool: removed preset “normal” target levels and generic liquid/granular strength assumptions. It now computes theoretical available-chlorine mass from measured pool volume and a user-selected ppm gap, and estimates product mass only from the exact label's available-chlorine percentage by weight. It no longer converts liquid product mass to volume, diagnoses conditions, or provides application/shock directions.
- Added current CDC residential pool testing and chemical-safety references, clarified target selection and label dependence, and updated route metadata, calculator index, landscaping copy, and related-tool links. This batch is unverified; no deployment has occurred.

## Eighteenth implementation batch

- Concrete: preserved the geometric volume calculation while removing generic slab/footing depth hints; renamed the extra percentage as a user-selected planning allowance; added input validation and clarified omitted geometry/supplier conditions. Updated concrete and masonry copy to remove blanket thickness/code claims and unsupported failure predictions.
- Flooring, tile, and shower tile: replaced pattern/material-specific waste advice and assumed box or piece counts with package estimates based on user-entered product-label coverage and an explicit user-selected allowance. Shower tool now uses measured total tiled area rather than inferring niches, curbs, or waterproofing. Retired unreviewed HowTo/expansion content from the active configs.
- Updated page metadata, calculator/category indexes, and flooring/masonry category copy; removed remaining chimney flue-sizing and patio-chain claims from the masonry category. Added regression coverage for package counts, pool label-mass math, and metric/imperial concrete geometry.
- Verification on 2026-10-01: all 15 regression tests passed, TypeScript check passed, and production build succeeded with 103 static pages. Browserslist reports its local `caniuse-lite` dataset is stale; this did not fail the build. Browser interaction QA remains outstanding. No deployment has occurred.

## Nineteenth implementation batch

- Brick estimator: now requires net wall area and entered coverage for the exact product/layout, plus a user-selected planning allowance. It outputs brick count only; no assumed standard brick rate, mortar quantity, or wall-design advice.
- Mortar estimator: now requires masonry unit count and coverage for the exact package/configuration. It outputs bag count only; it does not choose mortar type or infer generic yield.
- Rebar estimator: now reports gross straight-run grid geometry from a rectangular footprint and user-selected spacing. Corrected metric conversion and removed bar sizing, splices, stock-stick counts, weight, and structural guidance.
- Updated masonry category, calculator index, concrete cross-link, and regression tests to reflect bounded outputs. No stale indexed claims about standard brick coverage, bags per wall area, or 20-ft sticks remain in active app/config source.
- Verification on 2026-10-01: all 18 regression tests passed, TypeScript check passed, and production build succeeded with 103 static pages. Browserslist reports its local `caniuse-lite` dataset is stale; this did not fail the build. Browser interaction QA remains outstanding. No deployment has occurred.

## Twentieth implementation batch

- Grout estimator: removed assumed grout density/yield, default joint and tile dimensions, implied bag sizes, waste prescriptions, grout-type recommendations, and unsupported installation/sealing claims. It now estimates package count from measured tiled area, exact product coverage, and user-selected allowance.
- Backsplash estimator: removed preset linear-run assumptions, outlet/window subtraction estimates, default tile formats/package counts, fixed waste, standard-height and installation advice, and hypothetical examples. It now estimates packages from measured net tile area and exact label coverage.
- Updated route metadata, calculator index, flooring category copy, and regression tests. Retired unreviewed expansion content from active configs.
- Verification on 2026-10-01: all 20 regression tests passed, TypeScript check passed, and production build succeeded with 103 static pages. Browserslist reports its local `caniuse-lite` dataset is stale; this did not fail the build. Browser interaction QA remains outstanding. No deployment has occurred.

## Twenty-first implementation batch

- Rewrote the roofing/exterior, HVAC/plumbing, electrical/solar, lumber/framing, and paint/walls category pages to remove unsupported safety/code verdicts, complete-takeoff promises, stale cost/savings examples, and prescriptive building instructions. Replaced them with concise descriptions of actual estimator scope and directions to product data, local authorities, or qualified professionals where applicable.
- Reworked the corresponding calculator-index rows to remove stale standards attributions and unsupported outputs such as full lists, code-compliant stairs, shingle orders, conductor sizing, and standard quantities. Added regression coverage for category/index overclaims.
- Verification on 2026-10-01: all 21 regression tests passed, TypeScript check passed, and production build succeeded with 103 static pages. Browserslist reports its local `caniuse-lite` dataset is stale; this did not fail the build. Browser interaction QA remains outstanding. No deployment has occurred.

## Twenty-second implementation batch

- Replaced active deck, fence, room-paint, bathroom, and roof planner forms with scoped measurement guides and links to individual estimators. Removed unsubstantiated combined materials, structural/installation prescriptions, assumed quantities, and current-looking cost outputs from rendered routes.
- Rewrote the planner landing page so it no longer advertises chained tools, complete/buyable lists, or material-price comparisons. Patio planner was already narrowed in an earlier batch.
- Legacy client component source files are now unreferenced by active routes and preserved pending source-cleanup review; they are not part of the built planner pages.
- Added regression coverage for active planner routes. Verification on 2026-10-01: all 22 regression tests passed, TypeScript check passed, and production build succeeded with 103 static pages. Browserslist reports its local `caniuse-lite` dataset is stale; this did not fail the build. No deployment has occurred.

## Twenty-third implementation batch

- Narrowed six safety-adjacent calculators (stairs, window area, clear-opening area, stud spacing, garage-door opening, and attic ratio) to transparent arithmetic based on user-entered dimensions or assumptions. Removed code/compliance verdicts, equipment recommendations, and implied design outputs; clarified page metadata and methodology to match actual scope.
- Updated the lumber/framing index to describe the limited geometry outputs and include the clear-opening area worksheet. Added regression tests covering these tools' output boundaries.
- Verification on 2026-10-01: all 23 regression tests passed, TypeScript check passed, and production build succeeded with 103 static pages. Browserslist reports its local `caniuse-lite` dataset is stale; this did not fail the build. Browser interaction QA remains outstanding. No deployment has occurred.

## Twenty-fourth implementation batch

- Replaced household/climate-rule heat-pump capacity claims with conversion of user-provided heating/cooling loads only; replaced household water-heater sizing and installation advice with an idealized heat-rate conversion from entered flow and temperature rise; replaced insulation R-value/bag assumptions and advice with package counts from measured area and exact label coverage.
- Retired the insulation expansion from its active calculator config and aligned page metadata, category/index descriptions, and tests. No equipment, code, R-value, or insulation-type recommendation is produced by these three tools.
- Verification on 2026-10-01: all 24 regression tests passed, TypeScript check passed, and production build succeeded with 103 static pages. Browserslist reported its local `caniuse-lite` dataset is stale; this did not fail the build. Browser QA remains outstanding; no deployment has occurred.

## Twenty-fifth implementation batch

- Replaced the solar panel “size the system” tool with explicit scenario arithmetic from user-entered utility usage, peak-sun-hour assumption, panel nameplate, and derate. Removed location presets, assumed panel roof area, savings/cost/install claims, and HowTo/expansion copy from the active tool.
- Replaced drywall room takeoff and unsupported finishing/code/install advice with a net-area and nominal-panel-area worksheet. Replaced siding geometry presets, generic opening deductions, material-specific waste, trim quantities, cost, and installation advice with measured net wall area plus a chosen allowance.
- Updated active route metadata, index/category descriptions, and regressions. The related expansion source files remain in the repository but are no longer rendered by these active calculator configs.
- Verification on 2026-10-01: all 25 regression tests passed, TypeScript check passed, and production build succeeded with 103 static pages. Browserslist reported its local `caniuse-lite` dataset is stale; this did not fail the build. Browser QA remains outstanding; no deployment has occurred.

## Verification

- Latest release verification (2026-10-01): 34 passing regression tests, successful TypeScript validation and production build (103 generated routes), and a scan of 96 rendered HTML pages and 266 JSON-LD blocks. See the final release-verification entry below; earlier batch counts and browser-QA reminders describe earlier snapshots.

## Twenty-sixth implementation batch

- Replaced the remaining live joist-span, residential-code-limit, and construction-waste reference tables with concise guidance to verify project-specific values against local code, manufacturer data, and current product requirements. Removed unsupported structural spans, model-code values presented as general, and universal waste percentages.
- Rewrote active siding, deck, and HVAC buying guides to remove unsupported lifecycle-cost winners, invented case stories, and generic price/product claims; aligned guide index copy with actual content.
- Corrected the solar guide’s description of the calculator, site-wide methodology and metadata claims, the calculator-index claim of 5–10% accuracy, broad formula/source claims in about/footer/home copy, and outdated calculator descriptions. Replaced the homepage's inconsistent paint example with explicitly illustrative arithmetic matching its stated inputs and rounding.
- Narrowed seven additional live worksheets (vanity, lumber, gutter, flooring quote totals, refinishing quote totals, furnace quote totals, wallpaper) to measured arithmetic or user-supplied quote/product values; updated index/category copy and added regression coverage.
- Verification on 2026-10-01: 27 regression tests pass; TypeScript check passes; production build generates all 103 routes; `git diff --check` passes. Local production preview was inspected in the browser for the guide index, joist reference, and homepage. Browserslist still warns its local `caniuse-lite` data is six months old; build succeeds. No deployment or Search Console action has occurred.

## Remaining release checks

- Independent licensed structural, electrical, HVAC, plumbing, and chemical-safety review is still advisable for the safety-adjacent worksheets; this code/content pass is not a professional certification.
- Re-review historical national Cost vs. Value figures against their cited report, and verify any source links before a production release. No live production pages were changed here.
- Retired client-side planner components and old expansion-content modules remain in source but are not imported by the active rendered routes; they are preserved rather than deleted pending a separate cleanup review.
- After a human approves release, verify the deployed pages and run Search Console URL/indexing checks and performance monitoring. No bulk noindex, deletion, redirect, backlink disavowal, or sitemap submission was performed.

## Before deployment

This is **not yet a sitewide content or safety certification**. Do not deploy it as a completed recovery release without the next QA pass:

1. Review all remaining calculator formulas and safety-sensitive claims, not just the examples above. Obtain qualified electrical, structural, and chemical review or narrow/disable any tool that cannot be defended.
2. Inspect all remaining hypothetical scenarios and unsourced case stories individually. The shared label alone does not make false in-prose reporting acceptable.
3. Verify assumptions, dates, and claim-level sources across cost pages and buying guides. Removing unsupported schema does not establish that visible estimates are current or accurate. Clean up retired article source after editorial review.
4. Validate claim-level citations and fix dead or non-supporting sources. Confirm current production and deployment workflow before shipping.
5. Run interactive browser QA for inputs, error messages, mobile display, and rendered structured data, then record the release date/URL changes for GSC monitoring.

No bulk noindex, deletion, redirect, backlink disavowal, or sitemap submission has been performed.

## Final release-verification pass — 2026-10-01

Correction after user-reported deployment build failure: the original verification folder lacked the parent ESLint configuration present in Downloads, so the successful original build did not validate lint. Added project-root strict Next.js/TypeScript lint configuration and declared matching lint dependencies; fixed unescaped JSX characters, unused bindings/imports, and explicit `any` casts without disabling rules. The corrected release has 35 regression tests, zero lint warnings/errors, and a successful lint-enabled production build. Use `tallyard-recovery-corrected.zip` instead of the original release. Earlier 34-test results are historical.

- Compared the cumulative working source against `tallyard-main (21).zip`. The archive commit matches the clean Downloads deployment checkout: `7fdd65d8837f4a050d623353d540b93b97402324`, branch `main`, origin `git@github-ashutoshkhulbe:ashutoshkhulbe15-hash/tallyard.git`.
- Fixed additional shared-calculator bugs: preserve custom physical measurements on unit changes, convert min/max limits, retain units in shared URLs, reject invalid inputs/results, and suppress floating-point noise at whole-package boundaries. Paint coverage is now an entered product-label value; opening deductions use consistent metric conversion.
- Corrected remaining countertop/fence/shed metadata, related-tool descriptions, the broken concrete cost-guide link, source badges on arithmetic-only worksheets, catalog/search omissions, homepage/category counts, and the missing mortar sitemap URL.
- Regenerate public `llms.txt` and `llms-full.txt` from current calculator/guide content before each build rather than exposing obsolete pricing, lifespan, or sizing descriptions.
- All 50 calculator configs have valid example-result and physical-input round-trip tests in both systems. Catalog, sitemap, routes, related destinations, invalid inputs, and selected independent arithmetic cases are covered. The 34 tests are not exhaustive proofs for every possible input or subject-matter claim.
- Production build passes; all 96 generated HTML documents have passing canonical/indexing/internal-link checks and all 266 JSON-LD blocks parse. No active Dataset or HowTo markup is found by the scan. Embeds remain noindex and ordinary public pages remain indexable.
- Browser checks cover custom concrete inputs, metric conversion and shared-link restoration, blank-input errors, embedded errors, entered paint coverage, and a 390px mobile paint layout. No console errors were observed in the checked concrete interactions. Browser checks are representative, not an assertion that every route was manually tested at every viewport.
- Primary-source spot checks covered ENERGY STAR room-AC reference bands, IRS 25C/25D end dates, and selected historical JLC benchmarks. This does not certify every external reference URL or every construction/safety claim. Earlier domain-review advice remains a limitation, not a failed software build.
- No live site, remote Git branch, backlink profile, or Search Console setting was changed. This release verification does not prove Google's undisclosed demotion reason or guarantee traffic recovery.
- The clean baseline install reported a known vulnerability in Next.js 14.2.15. Updated Next.js and its lockfile to the official 14.x patch 14.2.35, as directed by https://nextjs.org/blog/security-update-2025-12-11. This is an advisory-specific patch, not a comprehensive security certification or a major-version migration.
