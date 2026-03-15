# Linked Repositories

This directory is intentionally visible and stores local clones of linked repositories defined in `repos.manifest.json`.

To clone or update all linked repositories:

```bash
pnpm run clone:repos
```

To preview commands without cloning:

```bash
node scripts/clone-linked-repos.mjs --dry-run
```
