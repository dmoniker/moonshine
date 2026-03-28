import { jsPDF } from "jspdf";
import { DIAMANDIS_ATTRIBUTION, DIAMANDIS_QUOTE, WEEKS } from "../data/schedule";
import type { PersistedQuestData, ProfileId } from "../types";

function profileLabel(p: ProfileId): string {
  return p === "parent" ? "Parent" : "Son";
}

export function buildMarkdownExport(
  data: PersistedQuestData,
  profile: ProfileId
): string {
  const who = profileLabel(profile);
  const p = data[profile];
  const lines: string[] = [
    `# Distillation Quest — ${who} export`,
    ``,
    `> "${DIAMANDIS_QUOTE}"`,
    `> — ${DIAMANDIS_ATTRIBUTION}`,
    ``,
    `Generated: ${new Date().toISOString()}`,
    ``,
    `## Overall progress`,
    ``,
  ];

  for (const w of WEEKS) {
    const wp = p.weeks[String(w.number)]!;
    const checks = w.tasks
      .map((t) => `- [${wp.tasks[t.id] ? "x" : " "}] ${t.label}`)
      .join("\n");
    lines.push(
      `### Week ${w.number}: ${w.emoji} ${w.title}`,
      ``,
      `**Status:** ${wp.completed ? "✅ Complete" : "In progress"}${
        wp.completedAt ? ` (_${wp.completedAt}_)` : ""
      }`,
      ``,
      checks,
      ``,
      `**Success criteria:**`,
      ...w.successCriteria.map((c) => `- ${c}`),
      ``
    );
  }

  lines.push(`## Journal`, ``);
  if (p.journal.length === 0) lines.push(`_(no entries)_`, ``);
  for (const e of p.journal) {
    lines.push(`### ${e.date}`, e.content, ``);
  }

  lines.push(`## My model`, ``, p.modelUrl || `_(no link yet)_`, ``);

  lines.push(
    `---`,
    ``,
    `Raw JSON (both profiles) is saved separately in \`distillation_progress.json\`.`
  );

  return lines.join("\n");
}

export function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPdfExport(data: PersistedQuestData, profile: ProfileId) {
  const who = profileLabel(profile);
  const p = data[profile];
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 48;
  let y = margin;
  const lineH = 14;
  const pageH = doc.internal.pageSize.getHeight();

  const addLine = (text: string, size = 11, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - margin * 2);
    for (const line of lines) {
      if (y > pageH - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineH;
    }
  };

  addLine("Distillation Quest — " + who, 18, true);
  y += 8;
  addLine(`"${DIAMANDIS_QUOTE}"`, 10, false);
  addLine(`— ${DIAMANDIS_ATTRIBUTION}`, 10, false);
  y += lineH;

  for (const w of WEEKS) {
    const wp = p.weeks[String(w.number)]!;
    addLine(`Week ${w.number}: ${w.title}`, 13, true);
    addLine(
      wp.completed ? "Status: Complete" : "Status: In progress",
      10,
      false
    );
    for (const t of w.tasks) {
      const mark = wp.tasks[t.id] ? "[x]" : "[ ]";
      addLine(`${mark} ${t.label}`, 10, false);
    }
    y += 6;
  }

  addLine("Journal", 14, true);
  if (p.journal.length === 0) addLine("(no entries)", 10, false);
  for (const e of p.journal) {
    addLine(e.date, 11, true);
    addLine(e.content, 10, false);
    y += 4;
  }

  addLine("My model", 14, true);
  addLine(p.modelUrl || "(no link yet)", 10, false);

  doc.save(`distillation-quest-${profile}-${Date.now()}.pdf`);
}
