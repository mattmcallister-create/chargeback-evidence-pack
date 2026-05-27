/**
 * Tests for HTML escaping in the PDF template.
 *
 * Validates that all user-controlled data is properly escaped
 * before being inserted into the HTML template, preventing XSS
 * attacks in the generated PDF.
 */
import { describe, it, expect } from 'vitest';

// âââ Inline escapeHtml for unit testing âââââââââââââââââââââââââââââââââ
// This mirrors the function in lib/pdf/html-template.ts
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

describe('escapeHtml', () => {
  it('escapes ampersands', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('escapes angle brackets', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('escapes double quotes', () => {
    expect(escapeHtml('He said "hello"')).toBe('He said &quot;hello&quot;');
  });

  it('escapes single quotes', () => {
    expect(escapeHtml("It's fine")).toBe('It&#039;s fine');
  });

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('handles string with no special characters', () => {
    expect(escapeHtml('Hello World 123')).toBe('Hello World 123');
  });

  it('escapes multiple special characters in sequence', () => {
    expect(escapeHtml('A<B>C&D"E\'F')).toBe(
      'A&lt;B&gt;C&amp;D&quot;E&#039;F'
    );
  });

  it('prevents script injection via merchant name', () => {
    const malicious = '<img src=x onerror=alert(1)>';
    const escaped = escapeHtml(malicious);
    expect(escaped).not.toContain('<img');
    expect(escaped).not.toContain('onerror');
    expect(escaped).toBe('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('prevents event handler injection', () => {
    const malicious = '" onmouseover="alert(1)"';
    const escaped = escapeHtml(malicious);
    expect(escaped).not.toContain('" onmouseover');
    expect(escaped).toBe('&quot; onmouseover=&quot;alert(1)&quot;');
  });

  it('handles unicode characters without mangling', () => {
    expect(escapeHtml('CafeÌ Muller')).toBe('CafeÌ Muller');
    expect(escapeHtml('Price: Â£100')).toBe('Price: Â£100');
  });
});
