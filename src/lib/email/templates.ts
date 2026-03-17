/**
 * Renders a template string by replacing {{variable}} placeholders.
 * Missing variables are replaced with empty string and tracked in warnings.
 */
export function renderTemplate(
  template: string,
  variables: Record<string, string>
): { rendered: string; warnings: string[] } {
  const warnings: string[] = [];

  const rendered = template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    if (key in variables && variables[key] !== undefined) {
      return variables[key];
    }
    warnings.push(`Missing variable: {{${key}}}`);
    return "";
  });

  return { rendered, warnings };
}

/**
 * Converts plain text body to simple HTML (paragraphs from double newlines).
 */
export function textToHtml(text: string): string {
  return text
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
}
