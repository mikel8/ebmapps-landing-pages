# Inc. 5000 2026 free sample — schema notes

The sample preserves source column names and values for the first ten source records. It is a schema-validation sample, not a representative analytical subset.

| Field group | Columns |
|---|---|
| List identity | `rank`, `companyName`, `id`, `listAppearanceCount`, `incProfileUrl` |
| Growth and financials | `growthRate`, `revenue`, `revenuePrevious`, `revenueBand` |
| Workforce | `employees`, `employeesPrevious`, `employeeGrowthRate` |
| Company profile | `industry`, `city`, `state`, `country`, `founded`, `newlyFounded`, `leadership` |
| Source/export metadata | `fileLocation`, `latitude`, `longitude`, `address`, `articles`, `companyWebsiteUrl` |

The supplied source validation reports that `companyWebsiteUrl` and `address` have no populated values. Treat numeric fields as source-export values and consult source documentation before interpreting units or percentage scaling.
