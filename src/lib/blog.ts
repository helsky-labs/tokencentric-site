export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-write-claude-md-complete-guide",
    title:
      "How to Write an Effective CLAUDE.md File: The Complete Guide",
    description:
      "Learn how to write an effective CLAUDE.md file for Claude Code. Examples, templates, and best practices for AI-assisted development.",
    date: "2026-02-11",
    author: "Hel Rabelo",
    readingTime: "12 min read",
    tags: ["claude-code", "claude-md", "ai-coding", "guide", "best-practices"],
    content: `
## What is CLAUDE.md?

CLAUDE.md is the instruction file that Claude Code reads to understand your project. Think of it as onboarding documentation for your AI coding assistant. When Claude Code starts a session, it reads your CLAUDE.md files to learn about your codebase, your preferences, and the rules it should follow.

Without a CLAUDE.md, Claude Code starts every session from scratch. It does not know your framework conventions, your team's coding standards, or the sharp edges in your codebase. With a well-written CLAUDE.md, it picks up where your documentation leaves off and writes code that fits your project from the first prompt.

## Where CLAUDE.md Lives: The 5-Layer Hierarchy

Claude Code reads CLAUDE.md files from multiple locations, each with a different scope. Understanding this hierarchy is essential for writing effective instructions.

### Layer 1: Global (~/.claude/CLAUDE.md)

Your global CLAUDE.md applies to every project Claude Code works on. This is where you put your personal preferences, universal rules, and identity information.

**What to include:**
- Your role and professional context
- Universal coding style preferences (tabs vs spaces, semicolons, etc.)
- Tools and frameworks you always use
- Things Claude should never do across any project

**Example:**
- Prefer TypeScript over JavaScript in all new files
- Use conventional commits: feat:, fix:, chore:, docs:
- Never commit .env files or secrets
- Always check if node_modules exists before suggesting npm install

### Layer 2: Workspace (parent directory CLAUDE.md)

If you organize projects under a common parent directory, a CLAUDE.md there applies to all child projects. This is useful for monorepos or workspaces where multiple projects share conventions.

**Use case:** You have a ~/code/work/ directory with multiple client projects that all use the same tech stack. A CLAUDE.md at ~/code/work/ can define the shared conventions.

### Layer 3: Project Root (repo CLAUDE.md)

The most common location. A CLAUDE.md at the root of your repository defines project-specific instructions. This is checked into version control and shared with your team.

**What to include:**
- Project architecture overview
- Build and test commands
- Directory structure
- Key dependencies and their versions
- Known gotchas and workarounds
- PR and commit conventions

### Layer 4: Per-Directory Overrides

You can place CLAUDE.md files in subdirectories to override or supplement project-level instructions for specific parts of the codebase.

**Use case:** Your src/api/ directory has different conventions than src/frontend/. A CLAUDE.md in each directory can specify the relevant patterns.

### Layer 5: Memory Files (~/.claude/projects/)

Claude Code also reads memory files that persist across sessions. These are typically auto-generated but can be manually edited. They store patterns Claude has learned about your workflow.

## What to Include: The Essential Sections

A good CLAUDE.md balances completeness with conciseness. Every token in your CLAUDE.md counts against your context window, so include what matters and skip what doesn't.

### Project Architecture

Give Claude the 30-second elevator pitch of your project. What is it? What technology does it use? How is it structured?

**Example:**
- This is a Next.js 14 App Router project with Tailwind CSS and Supabase
- The app is a SaaS dashboard for managing subscriptions
- API routes live in src/app/api/
- Database queries use Supabase client in src/lib/supabase.ts
- Authentication uses Supabase Auth with middleware in middleware.ts

### Build and Test Commands

Claude needs to know how to validate its work. List the exact commands.

**Example:**
- Build: npm run build
- Type check: npx tsc --noEmit
- Test: npm run test
- Lint: npm run lint
- Dev server: npm run dev

### Coding Conventions

Be specific. "Write clean code" is useless. "Use named exports, not default exports" is actionable.

**Examples of good conventions:**
- Use named exports for all components
- Prefix custom hooks with use
- Always handle loading and error states in data fetching components
- Use Zod for runtime validation of API inputs
- Prefer server components; use 'use client' only when necessary
- Name files in kebab-case, components in PascalCase

### Known Gotchas

Every codebase has sharp edges. Document them so Claude does not cut itself.

**Examples:**
- The Supabase client in src/lib/supabase.ts must not be imported in server components; use src/lib/supabase-server.ts instead
- The pricing page uses a custom Stripe checkout flow; do not use the default Stripe checkout session
- The database has a legacy users_v1 table that is still referenced by the mobile app; do not drop or rename it

### Safety Rules

Define what Claude should never do. These are your guardrails.

**Examples:**
- Never run git push without explicit permission
- Never delete files without moving them to /tmp first
- Never modify database migration files that have already been applied
- Never commit changes to .env or files containing API keys
- Always run the build command before committing

## Common Mistakes

### Too Vague

A CLAUDE.md that says "write good code" or "follow best practices" provides no value. Claude already tries to write good code. Your CLAUDE.md should tell it what "good" means in your specific context.

**Bad:** Use best practices for error handling
**Good:** Wrap all async operations in try/catch. Log errors to src/lib/logger.ts. Return structured error responses with { error: string, code: number } shape.

### Too Long

Every line in your CLAUDE.md consumes tokens from your context window. A 5,000-word CLAUDE.md eats into the space available for your actual conversation. Be concise.

**Rule of thumb:** If your CLAUDE.md is longer than 200 lines, you are probably including information that belongs in your actual documentation, not in your AI instructions.

### Outdated Instructions

A CLAUDE.md that references a framework version you upgraded three months ago or a directory structure that no longer exists causes Claude to write code that does not work. Review your CLAUDE.md when you make significant changes to your project.

### Missing Safety Rules

The most common regret people have with Claude Code is not telling it what NOT to do. Add explicit safety rules about destructive operations, secret files, and irreversible actions.

## Templates for Different Project Types

### Next.js App Router

- Framework: Next.js 14+ with App Router
- Styling: Tailwind CSS
- Data: Server components fetch data directly; client components use SWR or React Query
- Build: npm run build
- Key patterns: Use loading.tsx and error.tsx for each route segment. Prefer server components. Use route handlers in app/api/ instead of pages/api/.

### Python / Django

- Framework: Django 5+ with DRF
- Database: PostgreSQL
- Virtual env: Always activate .venv before running commands
- Test: python manage.py test
- Key patterns: Use class-based views for CRUD, function-based views for custom logic. Serializers validate all input. Migrations must be reversible.

### React Native / Expo

- Framework: Expo SDK 50+ with Expo Router
- Navigation: File-based routing
- Build: npx expo build
- Key patterns: Use NativeWind for styling. Test on both iOS and Android simulators. Handle deep links in app/_layout.tsx.

### Monorepo

- Structure: Turborepo with apps/ and packages/
- Build: turbo run build
- Key patterns: Shared packages import from @repo/package-name. Each app has its own CLAUDE.md. Root CLAUDE.md defines workspace conventions.

## Managing CLAUDE.md at Scale

The real challenge with CLAUDE.md is not writing one file. It is maintaining context files across multiple projects, especially if you use multiple AI tools.

If you work on 5+ projects and use Claude Code alongside Cursor or GitHub Copilot, you end up maintaining 10-15 config files across different formats. They drift out of sync. Some get stale. You lose track of which project has which instructions.

This is exactly the problem [TokenCentric](https://tokencentric.app) solves. It scans all your projects, shows every AI context file in one dashboard, and lets you edit them with real-time token counting so you know exactly how much context space each file consumes.

## Conclusion

A well-written CLAUDE.md is the single highest-leverage thing you can do to improve your Claude Code experience. It transforms Claude from a generic coding assistant into a teammate who understands your project.

Start with the basics: architecture, commands, conventions, gotchas, and safety rules. Keep it concise. Review it regularly. And if you manage multiple projects, consider using [TokenCentric](https://tokencentric.app) to keep everything organized.
    `,
  },
  {
    slug: "cursorrules-complete-guide",
    title:
      "The Complete Guide to .cursorrules: Configuring Cursor AI for Your Project",
    description:
      "Master .cursorrules for Cursor IDE. Examples, templates, and tips for configuring Cursor AI to work perfectly with your codebase.",
    date: "2026-02-09",
    author: "Hel Rabelo",
    readingTime: "10 min read",
    tags: [
      "cursor",
      "cursorrules",
      "ai-coding",
      "guide",
      "configuration",
    ],
    content: `
## What is .cursorrules?

.cursorrules is Cursor IDE's project-level configuration file for its AI assistant. When you place a .cursorrules file at the root of your project, Cursor reads it before every AI interaction and uses it to tailor its suggestions, code generation, and refactoring to your specific codebase.

If you have used Cursor without a .cursorrules file, you have been leaving performance on the table. The difference between a Cursor session with and without project-specific rules is dramatic. With the right .cursorrules, Cursor generates code that matches your patterns, follows your conventions, and avoids your known pitfalls.

## Where .cursorrules Goes

Place it at the root of your repository, next to your package.json or pyproject.toml. The filename is exactly .cursorrules with no extension. Cursor detects it automatically.

The file uses plain text or markdown formatting. There is no special syntax -- just write your instructions in natural language.

## Writing Effective Rules

### Code Style Preferences

Tell Cursor exactly how you write code. Be specific about patterns that vary between projects or teams.

**Examples:**
- Use functional components with arrow functions, not function declarations
- Prefer const over let; never use var
- Use single quotes for strings in TypeScript, double quotes in JSX
- Destructure props in function parameters: ({ name, age }: Props) not (props: Props)
- Always type function return values explicitly

### Framework-Specific Instructions

If you use a framework with multiple valid patterns, tell Cursor which ones you prefer.

**Next.js examples:**
- Use the App Router, not Pages Router
- Fetch data in server components using async/await, not useEffect
- Use next/image for all images, never raw img tags
- Route handlers go in app/api/[route]/route.ts
- Use loading.tsx and error.tsx for route-level loading/error states

**React examples:**
- Use Zustand for global state, not Redux or Context
- Custom hooks live in src/hooks/ and are prefixed with use
- Component files export one component each
- Use React.memo only when profiling shows a performance issue

### Testing Conventions

Specify your testing approach so Cursor writes tests that match your existing suite.

**Examples:**
- Use Vitest with React Testing Library
- Test files live next to their source files: Component.tsx and Component.test.tsx
- Use describe/it blocks, not test()
- Mock external dependencies with vi.mock(), not manual mocks
- Assert user-visible behavior, not implementation details

### File Organization Rules

Help Cursor put new files in the right places.

**Examples:**
- Components: src/components/[feature]/ComponentName.tsx
- Hooks: src/hooks/useHookName.ts
- Utils: src/lib/[category].ts
- Types: src/types/[domain].ts
- API routes: src/app/api/[resource]/route.ts

## .cursorrules vs CLAUDE.md

Both files serve the same fundamental purpose: giving your AI coding assistant project-specific context. But they have important differences.

### Format

- **.cursorrules**: Plain text or markdown. No formal structure required.
- **CLAUDE.md**: Standard markdown. Supports a hierarchy of files at different directory levels.

### Hierarchy

- **.cursorrules**: Single file per project. No inheritance or layering.
- **CLAUDE.md**: 5-layer hierarchy from global to per-directory. Child files inherit from parents.

### Token Awareness

- **.cursorrules**: No built-in token counting. You cannot easily see how much context your rules consume.
- **CLAUDE.md**: Claude Code shows context usage. TokenCentric can count tokens with the official Anthropic tokenizer.

### Team Sharing

Both are plain text files that can be checked into version control. Both become shared team resources when committed to the repo.

### Which to Use

If you use Cursor, write a .cursorrules. If you use Claude Code, write a CLAUDE.md. If you use both, write both. The content will be similar, but each tool reads only its own file.

If maintaining multiple files sounds tedious, that is because it is. This is where [TokenCentric](https://tokencentric.app) becomes useful. It shows all your AI config files across all projects in one dashboard, so you can keep them in sync without manually hunting through directories.

## Best .cursorrules Examples

### React / Next.js

- You are working on a Next.js 14 App Router project with TypeScript and Tailwind CSS.
- Use server components by default. Only add "use client" when the component needs interactivity, hooks, or browser APIs.
- Fetch data in server components using async/await. Use React Query in client components for data that needs caching or mutation.
- Use Tailwind CSS for all styling. Do not create CSS modules or styled-components.
- Components use PascalCase filenames. Utilities use camelCase.
- Always handle loading and error states in data-fetching components.
- Prefer named exports over default exports.

### Python

- This is a Python 3.12 project using FastAPI and SQLAlchemy.
- Use type hints on all function signatures.
- Use Pydantic v2 models for request/response validation.
- Database models live in src/models/. API routes live in src/routes/.
- Use async/await for all database operations.
- Tests use pytest with pytest-asyncio. Fixtures live in conftest.py.
- Format code with Black. Sort imports with isort.

### Go

- This is a Go 1.22 project using the standard library and SQLC.
- Follow the standard Go project layout: cmd/, internal/, pkg/.
- Use interfaces for dependency injection. Define interfaces where they are consumed, not where they are implemented.
- Error handling: return errors, do not panic. Wrap errors with fmt.Errorf and %w.
- Tests live next to source files: handler.go and handler_test.go.
- Use table-driven tests for functions with multiple input/output cases.

### TypeScript Monorepo

- This is a Turborepo monorepo with apps in apps/ and shared packages in packages/.
- Shared types come from @repo/types. Shared UI components from @repo/ui.
- Each app has its own tsconfig.json extending the root tsconfig.base.json.
- Use workspace dependencies: "@repo/ui": "workspace:*" in package.json.
- Run commands from the root: turbo run build, turbo run test.
- Internal packages use exports field in package.json for clean imports.

## Common Pitfalls

### Being Too Generic

"Write clean, maintainable code" tells Cursor nothing it does not already try to do. Be specific about what "clean" means in your project.

### Contradicting Yourself

If your rules say "use functional components" in one place and show a class component example elsewhere, Cursor will be confused. Audit your rules for consistency.

### Ignoring Token Limits

Cursor has context limits just like any AI. A massive .cursorrules file eats into the space available for your prompts and code. Keep it focused.

### Not Updating

When you refactor your project structure, upgrade frameworks, or change conventions, update your .cursorrules. Stale rules cause stale output.

## Managing .cursorrules Across Projects

If you work on multiple projects, managing .cursorrules files becomes a chore. Each project needs its own rules. Each set of rules needs periodic updates. If you also maintain CLAUDE.md files for Claude Code and copilot-instructions.md for GitHub Copilot, the number of files multiplies quickly.

[TokenCentric](https://tokencentric.app) was built to solve this exact problem. It scans your development directories, finds every AI config file, and presents them in a unified dashboard. You can edit any file with a Monaco editor (the same one VS Code uses), see real-time token counts, and start new files from built-in templates.

It is free, open source, and works on macOS and Windows. If you are managing more than a couple of .cursorrules files, it pays for itself in the time you save finding and editing them.

## Conclusion

A well-crafted .cursorrules file makes Cursor significantly more useful. It transforms generic AI suggestions into code that fits your project's specific patterns and conventions.

Start with the basics: your tech stack, coding conventions, file organization, and testing approach. Be specific, be concise, and keep it updated. If you manage multiple projects, [TokenCentric](https://tokencentric.app) can help you keep everything in sync.
    `,
  },
  {
    slug: "ai-coding-config-files-compared",
    title:
      "AI Coding Assistant Config Files Compared: CLAUDE.md vs .cursorrules vs copilot-instructions.md",
    description:
      "Complete comparison of AI coding assistant config files: CLAUDE.md, .cursorrules, copilot-instructions.md, .windsurfrules, and AGENTS.md.",
    date: "2026-02-07",
    author: "Hel Rabelo",
    readingTime: "11 min read",
    tags: [
      "ai-coding",
      "comparison",
      "claude-code",
      "cursor",
      "github-copilot",
    ],
    content: `
## The Config File Landscape in 2026

Every major AI coding assistant now supports some form of project-level configuration. The idea is the same across all of them: give the AI context about your specific project so it generates better, more relevant code. But each tool has invented its own file format, its own naming convention, and its own set of features.

For developers who use a single AI tool, this is fine. Write one file, get better results. But a growing number of developers use multiple tools. You might use Claude Code for complex architecture work, Cursor for daily coding, and GitHub Copilot for quick autocomplete. Each of these tools ignores the config files of the others.

The result is fragmentation. A developer working on five projects with three AI tools could be maintaining fifteen config files. That is not a theoretical number -- it is a real one for anyone who takes AI-assisted development seriously.

This post breaks down every major config file format, compares them directly, and discusses strategies for managing the complexity.

## File-by-File Breakdown

### CLAUDE.md (Claude Code)

**Tool:** Claude Code (CLI and IDE integration by Anthropic)

**Location:** Multiple locations with inheritance:
- ~/.claude/CLAUDE.md (global, all projects)
- Parent directory CLAUDE.md (workspace)
- Project root CLAUDE.md (repo-level)
- Subdirectory CLAUDE.md (per-directory overrides)
- ~/.claude/projects/ (memory files)

**Format:** Standard markdown. No special syntax required.

**Key Features:**
- 5-layer hierarchy with inheritance
- Memory files that persist across sessions
- Token-aware (context usage visible in Claude Code)
- Checked into version control for team sharing

**Strengths:**
- The hierarchy system is the most sophisticated of any tool. Global preferences cascade down through workspace, project, and directory levels.
- Memory files allow Claude to learn from past sessions without you manually updating the config.

**Limitations:**
- Only used by Claude Code. Cursor, Copilot, and other tools ignore it.
- No built-in templates or scaffolding.

For a deep dive, see our [Complete Guide to CLAUDE.md](/blog/how-to-write-claude-md-complete-guide).

### .cursorrules (Cursor)

**Tool:** Cursor IDE

**Location:** Project root (single file)

**Format:** Plain text or markdown. No formal schema.

**Key Features:**
- Simple single-file approach
- Automatically detected by Cursor
- Plain text, easy to write

**Strengths:**
- Lowest barrier to entry. Write some text, save the file, done.
- No learning curve beyond "describe your project."

**Limitations:**
- No hierarchy. One file per project, no inheritance.
- No token counting. You cannot see how much context your rules consume.
- No global config. Every project needs its own file from scratch.
- Only used by Cursor. Other tools ignore it.

For details, see our [Complete Guide to .cursorrules](/blog/cursorrules-complete-guide).

### copilot-instructions.md (GitHub Copilot)

**Tool:** GitHub Copilot (VS Code extension)

**Location:** .github/copilot-instructions.md in your repository

**Format:** Standard markdown.

**Key Features:**
- Lives in the .github directory alongside other GitHub configurations
- Automatically detected by Copilot
- Can include code examples in markdown code blocks

**Strengths:**
- Natural fit for teams already using GitHub workflows.
- The .github directory is a well-understood convention.
- Works with the widely-adopted Copilot extension.

**Limitations:**
- Limited hierarchy. GitHub recently added organization-level instructions, but the system is less flexible than CLAUDE.md's 5-layer approach.
- No token visibility. You cannot see how much context the file consumes.
- Copilot's adherence to instructions can be inconsistent compared to Claude Code's CLAUDE.md compliance.

### .windsurfrules (Windsurf)

**Tool:** Windsurf IDE (by Codeium)

**Location:** Project root

**Format:** Plain text or markdown.

**Key Features:**
- Similar to .cursorrules in approach
- Automatically detected by Windsurf

**Strengths:**
- Simple setup. Same approach as .cursorrules.
- Windsurf's AI is capable and the IDE is gaining popularity.

**Limitations:**
- Smallest ecosystem of the five tools.
- No hierarchy, no global config, no token counting.
- Limited documentation compared to more established tools.

### AGENTS.md (OpenAI / ChatGPT)

**Tool:** ChatGPT, OpenAI Codex, and related tools

**Location:** Project root or repository

**Format:** Markdown.

**Key Features:**
- Designed for OpenAI's agent-based coding tools
- Supports task-specific instructions
- Can define agent behaviors and capabilities

**Strengths:**
- Designed for the agentic workflow where the AI takes multi-step actions.
- Can define not just code style but how the agent should approach tasks.

**Limitations:**
- Relatively new format with evolving conventions.
- Limited adoption outside OpenAI's ecosystem.
- Documentation is still maturing.

## Comparison Matrix

| Feature | CLAUDE.md | .cursorrules | copilot-instructions.md | .windsurfrules | AGENTS.md |
|---|---|---|---|---|---|
| **Hierarchy** | 5 layers | Single file | 2 layers | Single file | Single file |
| **Global config** | Yes | No | Organization-level | No | No |
| **Token visibility** | Yes | No | No | No | No |
| **Format** | Markdown | Plain text | Markdown | Plain text | Markdown |
| **Team sharing** | Git | Git | Git | Git | Git |
| **Memory/learning** | Yes | No | No | No | No |
| **Template support** | No | No | No | No | No |
| **Cross-platform** | CLI + IDE | Cursor only | VS Code | Windsurf only | ChatGPT/Codex |

## The Real Problem: Managing Multiple Tools

The comparison table above reveals the core issue. Each tool has its own file, and none of them talk to each other. If you use Claude Code for complex tasks and Cursor for daily editing, you need both a CLAUDE.md and a .cursorrules. The content will be 80% identical -- your project architecture, build commands, and coding conventions are the same regardless of which AI reads them.

Multiply this across projects and the maintenance burden becomes real. Five projects with three AI tools means potentially fifteen config files. Some will be stale. Some will contradict each other. Some will be missing entirely because you forgot to create them when you started the project.

### The Manual Approach (Tedious)

The most basic strategy: maintain each file independently. When you update your project conventions, open each config file and update it. This works for one or two projects but does not scale.

### The Template Approach (Better)

Create template config files for your common project types. When you start a new project, copy the relevant template for each AI tool. This reduces the initial setup time but does not help with ongoing maintenance.

### The Dashboard Approach (Best)

Use a tool that discovers, organizes, and helps you edit all your AI config files across all projects. This is the approach [TokenCentric](https://tokencentric.app) takes.

TokenCentric scans your development directories and finds every AI config file automatically. It recognizes CLAUDE.md, .cursorrules, copilot-instructions.md, .windsurfrules, and AGENTS.md. Each file appears in a unified dashboard with:

- **Real-time token counting** using official tokenizers (Anthropic's for Claude, tiktoken for OpenAI-based tools like Copilot and Cursor)
- **Monaco editor** with syntax highlighting and markdown preview
- **Hierarchy visualization** showing how CLAUDE.md files inherit from each other
- **7 built-in templates** for common project types (Next.js, Python, monorepo, etc.)
- **Color-coded indicators** that warn when files get too large

The tool is free, open source, and runs locally on your machine. No cloud, no account required. It works on macOS and Windows.

## Writing Cross-Tool Config Files

If you maintain multiple AI config files, here are patterns that work across all tools.

### Start with a Canonical Document

Write your project context once in a format-agnostic document. Include architecture, conventions, commands, and safety rules. Then adapt it for each tool's file format. Most of the content will copy directly since all formats accept markdown.

### Keep a Consistent Structure

Use the same sections in every config file:
1. Project overview (what it is, what stack it uses)
2. Directory structure
3. Build/test commands
4. Coding conventions
5. Known gotchas
6. Safety rules

### Sync Regularly

When you update one config file, update the others. This is where having all files visible in a single dashboard helps enormously.

### Use Token Budgets

Aim for 100-200 lines per config file. Longer than that and you are eating into your AI's context window. Use TokenCentric to check the actual token count for each tool's tokenizer.

## The Future of AI Config Files

The current fragmentation is likely temporary. As AI-assisted development matures, one of two things will probably happen:

1. **A standard emerges.** One format wins and the other tools adopt it, similar to how .editorconfig became a cross-editor standard.

2. **Tools read each other's files.** Rather than standardizing on one format, tools start supporting multiple formats as input.

Until either of these happens, developers who use multiple AI tools will need a management strategy. Writing good config files is the foundation. Keeping them organized and in sync is the ongoing challenge.

## Conclusion

Every AI coding assistant benefits from project-specific configuration. CLAUDE.md offers the most sophisticated hierarchy. .cursorrules has the lowest barrier to entry. copilot-instructions.md fits naturally into GitHub workflows. The content you put in these files is more important than which format you use.

If you use one tool, write one file well. If you use multiple tools, accept the maintenance overhead and use a dashboard like [TokenCentric](https://tokencentric.app) to manage the complexity. And regardless of which tools you use, remember that a well-written config file is the single biggest lever you have for improving your AI coding experience.
    `,
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
