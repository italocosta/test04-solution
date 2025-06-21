
# Solution – Backend Refactor & Optimization

## Project Overview

This backend refactor focuses on delivering a clean, performant, and testable API that interacts with a local file data source. Key features include async I/O, cache management, fuzzy search, and event-driven consistency between modules.

---

## Objectives Achieved

### Refactor blocking I/O
- Replaced all blocking I/O operations with async versions (`fs/promises`)
- Created a centralized data source module to manage reading/writing and caching

### Performance & Caching
- Added memory cache on data source to avoid redundant reads
- Introduced `fs.watch()` to invalidate cache when file changes
- Exposed event emitter (`dataUpdated`) to allow subscribers (e.g., stats module) to reactively clear their own caches

### Server-side Search & Pagination
- Integrated `fuse.js` for fuzzy, partial matching using `q` param
- Supported `limit` param to support consumer requirements

### Code Organization
- Separated layers:
  - `routes/` for HTTP controllers
  - `repositories/` for data model access
  - `dataSource.js` as the single source of data management
  - `utils/stats.js` for reusable functions

---

## Tests

### Frameworks used
- [Jest](https://jestjs.io/) for unit and integration tests
- [Supertest](https://github.com/visionmedia/supertest) for HTTP endpoint testing

### Coverage
- Tests cover:
  - GET /api/items
  - GET /api/items?q=search
  - GET /api/items?limit=#
  - POST /api/items (valid and invalid)
  - GET /api/stats


---

## Design Decisions

- **EventEmitter** pattern for reactive invalidation across modules
- **Separation of concerns**: no module does too much
- **Data Source centralization**: centralized module to manage data
- **Event broadcasting**: Event-based communication for supporting of cache refreshing
- **Avoided duplication** between stats and items logic

---


## Final Result

- Fully refactored and modular backend
- Event-driven cache consistency
- Modern search
- Test suite validating happy and edge cases
