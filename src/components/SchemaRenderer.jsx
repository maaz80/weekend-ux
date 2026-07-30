import React from 'react';

export default function SchemaRenderer({ schema }) {
  // 1. Check if schema exists
  if (!schema || !schema.trim()) return null;

  let jsonContent = schema.trim();

  // 2. If Admin pasted full <script>...</script> tags, extract inner JSON content
  if (jsonContent.toLowerCase().includes('<script')) {
    const match = jsonContent.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    if (match && match[1]) {
      jsonContent = match[1].trim();
    }
  }

  // 3. Render clean application/ld+json script tag
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonContent }}
    />
  );
}
