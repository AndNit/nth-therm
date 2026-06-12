# Backlog: Missing JSON layout for home output

**Status:** open
**Logged:** 2026-05-26
**Severity:** warning (not blocking)

## Warning

```
WARN  found no layout file for "json" for kind "home": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
```

## Context

One unrelated warning remains — `found no layout file for "json" for kind "home"` — caused by `[outputs] home = ["HTML", "RSS", "JSON"]` in `hugo.toml:123` without a matching `layouts/home/list.json` template. Not part of this task, but flagging since it's the only remaining `WARN`.

## Decision needed

Want me to either add the JSON template or drop `"JSON"` from the outputs?

- **Option A — Add the template:** create `layouts/home/list.json` (e.g. a search index / API feed). Pick this if a JSON home output is actually wanted.
- **Option B — Drop from outputs:** remove `"JSON"` from `home = [...]` in `hugo.toml:123`. Pick this if the JSON output was added speculatively and is not used downstream.
