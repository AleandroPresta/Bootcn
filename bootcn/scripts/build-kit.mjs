import { mkdir, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "sass-embedded";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const kitDir = path.join(rootDir, "kit");

const themeEntry = path.join(rootDir, "src", "css", "theme", "theme.scss");
const bootstrapBundleSource = path.join(
  rootDir,
  "node_modules",
  "bootstrap",
  "dist",
  "js",
  "bootstrap.bundle.min.js"
);

const initJs = `/* Bootcn reusable kit init */
(() => {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
})();
`;

function parseOutDir(argv) {
  const outFlagIndex = argv.findIndex((arg) => arg === "--out" || arg === "-o");
  if (outFlagIndex >= 0) {
    return argv[outFlagIndex + 1];
  }

  const positional = argv.find((arg) => !arg.startsWith("-"));
  if (positional) {
    return positional;
  }

  return process.env.BOOTCN_OUT;
}

async function exportKitFiles(outDir) {
  const resolvedOutDir = path.resolve(rootDir, outDir);
  await mkdir(resolvedOutDir, { recursive: true });

  const filesToExport = [
    "bootcn-theme.css",
    "bootstrap.bundle.min.js",
    "bootcn-init.js",
    "USAGE.md",
  ];

  for (const fileName of filesToExport) {
    await copyFile(path.join(kitDir, fileName), path.join(resolvedOutDir, fileName));
  }

  console.log("Exported Bootcn kit files to:");
  console.log(`- ${resolvedOutDir}`);
}

async function buildKit() {
  const outDir = parseOutDir(process.argv.slice(2));

  await mkdir(kitDir, { recursive: true });

  const compiledTheme = compile(themeEntry, {
    style: "compressed",
    sourceMap: false,
    loadPaths: [rootDir],
  });

  const cssBanner = "/* Bootcn Theme Bundle: includes Bootstrap 5 + Bootcn overrides */\n";
  await writeFile(
    path.join(kitDir, "bootcn-theme.css"),
    cssBanner + compiledTheme.css,
    "utf8"
  );

  await copyFile(
    bootstrapBundleSource,
    path.join(kitDir, "bootstrap.bundle.min.js")
  );

  await writeFile(path.join(kitDir, "bootcn-init.js"), initJs, "utf8");

  console.log("Bootcn kit generated in ./kit");
  console.log("Files:");
  console.log("- kit/bootcn-theme.css");
  console.log("- kit/bootstrap.bundle.min.js");
  console.log("- kit/bootcn-init.js");

  if (outDir) {
    await exportKitFiles(outDir);
  }
}

buildKit().catch((error) => {
  console.error("Failed to build kit:", error);
  process.exitCode = 1;
});
