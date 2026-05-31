import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { execFileSync } from "node:child_process";
import { tool, type Plugin } from "@opencode-ai/plugin";
import YAML from "yaml";

const bundleFiles = ["brief.html", "spec.html", "task.html", "notes.html"];

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "active-feature";
}

async function readText(path: string) {
  return existsSync(path) ? readFile(path, "utf8") : "";
}

async function writeText(path: string, content: string) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

function stripHtml(input: string) {
  return input.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function artifactData(input: string) {
  const match = input.match(/<script[^>]+id=["']artifact-data["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function artifactsRoot(directory: string) {
  return join(directory, ".opencode", "artifacts");
}

async function activeSlug(directory: string) {
  return (await readText(join(artifactsRoot(directory), "active-feature.txt"))).trim();
}

function featureDir(directory: string, slug: string) {
  return join(artifactsRoot(directory), "features", slug);
}

async function ensureFeature(directory: string, requested?: string) {
  const slug = slugify(requested || await activeSlug(directory) || "active-feature");
  const dir = featureDir(directory, slug);
  await mkdir(dir, { recursive: true });
  await mkdir(artifactsRoot(directory), { recursive: true });
  await writeFile(join(artifactsRoot(directory), "active-feature.txt"), `${slug}\n`);

  const template = await readText(join(directory, ".opencode", "templates", "planning-artifact.template.html"));
  for (const file of bundleFiles) {
    const target = join(dir, file);
    if (!existsSync(target) && template) {
      await writeFile(target, template.replaceAll("{{artifact_title}}", file.replace(".html", "")));
    }
  }

  const statusPath = join(dir, "status.yaml");
  if (!existsSync(statusPath)) {
    await writeFile(statusPath, YAML.stringify({ status: "brainstorm", feature_slug: slug, owner: "feature-lead", next_step: "clarify scope" }));
  }
  return { slug, dir };
}

async function readStatus(dir: string) {
  return YAML.parse(await readText(join(dir, "status.yaml")) || "{}") || {};
}

async function saveStatus(dir: string, status: Record<string, unknown>) {
  await writeFile(join(dir, "status.yaml"), YAML.stringify(status));
}

async function currentPacket(directory: string) {
  const slug = await activeSlug(directory);
  if (!slug) return "No active feature artifact. Call session_artifact_update with a feature_slug to create one.";
  const dir = featureDir(directory, slug);
  const status = await readStatus(dir);
  const files = bundleFiles.filter((file) => existsSync(join(dir, file)));
  return JSON.stringify({ feature_slug: slug, artifact_dir: relative(directory, dir), status, files }, null, 2);
}

export const SessionArtifactsPlugin: Plugin = async () => ({
  tool: {
    session_artifact_current: tool({
      description: "Return the active feature artifact status and HTML planning bundle paths.",
      args: {},
      async execute(_args, ctx) {
        return currentPacket(ctx.directory);
      },
    }),
    session_artifact_update: tool({
      description: "Create or update active feature status and ensure HTML planning artifacts exist.",
      args: {
        feature_slug: tool.schema.string().optional().describe("Feature slug or title."),
        stage: tool.schema.string().optional().describe("brainstorm, planning, implementation, verification, review, done, or blocked."),
        owner: tool.schema.string().optional().describe("Current owner agent."),
        next_step: tool.schema.string().optional().describe("Immediate next action."),
        summary: tool.schema.string().optional().describe("Compact status summary."),
        handoff_target: tool.schema.string().optional().describe("Next agent owner."),
        approved_scope: tool.schema.string().optional().describe("Approved scope summary."),
        risks: tool.schema.array(tool.schema.string()).optional().describe("Known risks."),
        blockers: tool.schema.array(tool.schema.string()).optional().describe("Current blockers."),
        files: tool.schema.array(tool.schema.string()).optional().describe("Files of interest."),
      },
      async execute(args, ctx) {
        const { slug, dir } = await ensureFeature(ctx.directory, args.feature_slug);
        const status = await readStatus(dir);
        const updates = Object.fromEntries(Object.entries(args).filter(([, value]) => value !== undefined && value !== ""));
        delete updates.feature_slug;
        await saveStatus(dir, { ...status, ...updates, status: args.stage || status.status || "brainstorm", feature_slug: slug, updated_at: new Date().toISOString() });
        return currentPacket(ctx.directory);
      },
    }),
    session_artifact_section: tool({
      description: "Return one HTML planning artifact as stripped compact text.",
      args: { section: tool.schema.string().describe("brief, spec, task, or notes") },
      async execute(args, ctx) {
        const slug = await activeSlug(ctx.directory);
        if (!slug) return "No active feature artifact.";
        const file = `${args.section.replace(/\.html$/, "")}.html`;
        if (!bundleFiles.includes(file)) return `Unknown section: ${args.section}`;
        return stripHtml(await readText(join(featureDir(ctx.directory, slug), file)));
      },
    }),
    session_artifact_data: tool({
      description: "Return artifact-data JSON from one HTML planning artifact for machine-readable block updates.",
      args: { section: tool.schema.string().describe("brief, spec, task, or notes") },
      async execute(args, ctx) {
        const slug = await activeSlug(ctx.directory);
        if (!slug) return "No active feature artifact.";
        const file = `${args.section.replace(/\.html$/, "")}.html`;
        if (!bundleFiles.includes(file)) return `Unknown section: ${args.section}`;
        const data = artifactData(await readText(join(featureDir(ctx.directory, slug), file)));
        return data ? JSON.stringify(data, null, 2) : "No valid artifact-data JSON found.";
      },
    }),
    session_artifact_handoff: tool({
      description: "Return a compact handoff packet for another agent.",
      args: { target: tool.schema.string().optional().describe("Target agent name.") },
      async execute(args, ctx) {
        const slug = await activeSlug(ctx.directory);
        if (!slug) return "No active feature artifact.";
        const dir = featureDir(ctx.directory, slug);
        const status = await readStatus(dir);
        const brief = stripHtml(await readText(join(dir, "brief.html"))).slice(0, 1800);
        const task = stripHtml(await readText(join(dir, "task.html"))).slice(0, 1800);
        return JSON.stringify({ target: args.target || status.handoff_target || "next-agent", feature_slug: slug, status, brief, task }, null, 2);
      },
    }),
    session_artifact_acceptance_criteria: tool({
      description: "Return compact acceptance criteria from spec.html.",
      args: {},
      async execute(_args, ctx) {
        const slug = await activeSlug(ctx.directory);
        if (!slug) return "No active feature artifact.";
        const spec = stripHtml(await readText(join(featureDir(ctx.directory, slug), "spec.html")));
        const start = spec.toLowerCase().indexOf("acceptance");
        return (start >= 0 ? spec.slice(start) : spec).slice(0, 2400);
      },
    }),
    session_artifact_changed_files: tool({
      description: "Return changed files recorded in status.yaml plus git status.",
      args: {},
      async execute(_args, ctx) {
        const slug = await activeSlug(ctx.directory);
        const status = slug ? await readStatus(featureDir(ctx.directory, slug)) : {};
        const git = execFileSync("git", ["status", "--short"], { cwd: ctx.directory, encoding: "utf8" });
        return JSON.stringify({ recorded_files: status.files || [], git_status: git.trim().split("\n").filter(Boolean) }, null, 2);
      },
    }),
    session_artifact_review_packet: tool({
      description: "Return the approved scope, acceptance criteria, and current tasks for review.",
      args: {},
      async execute(_args, ctx) {
        const slug = await activeSlug(ctx.directory);
        if (!slug) return "No active feature artifact.";
        const dir = featureDir(ctx.directory, slug);
        const status = await readStatus(dir);
        return JSON.stringify({ status, spec: stripHtml(await readText(join(dir, "spec.html"))).slice(0, 2400), task: stripHtml(await readText(join(dir, "task.html"))).slice(0, 2400) }, null, 2);
      },
    }),
    session_artifact_repo_delta: tool({
      description: "Return git working tree delta for artifact drift checks.",
      args: {},
      async execute(_args, ctx) {
        return execFileSync("git", ["status", "--short"], { cwd: ctx.directory, encoding: "utf8" }) || "No git working tree changes.";
      },
    }),
    session_artifact_archive_check: tool({
      description: "Confirm whether the active feature is ready to archive.",
      args: {},
      async execute(_args, ctx) {
        const slug = await activeSlug(ctx.directory);
        if (!slug) return "No active feature artifact.";
        const status = await readStatus(featureDir(ctx.directory, slug));
        return status.status === "done" ? "Archive allowed: status.yaml is done." : `Archive blocked: status is ${status.status || "unknown"}.`;
      },
    }),
    session_artifact_finalize: tool({
      description: "Write the final approved archive summary for the active feature.",
      args: { summary: tool.schema.string().describe("Approved compact archive summary.") },
      async execute(args, ctx) {
        const slug = await activeSlug(ctx.directory);
        if (!slug) return "No active feature artifact.";
        const archivePath = join(ctx.directory, ".opencode", "archive", `${slug}.md`);
        await mkdir(join(ctx.directory, ".opencode", "archive"), { recursive: true });
        await writeText(archivePath, `${args.summary.trim()}\n`);
        return `Archive written: ${relative(ctx.directory, archivePath)}`;
      },
    }),
  },
});

export default SessionArtifactsPlugin;
