# Instruction: Documentation Style

This document defines the standardized style and structure for all documentation in the `.agent/docs/` directory. The agent must adhere to this style to ensure consistency and readability across the project.

## 1. General Principles
- **Clarity**: Use clear, concise language.
- **Arabic Messages**: Any user-facing API messages mentioned in docs must be in Arabic.
- **Technical Precision**: Accurately reflect the current state of the code (schema fields, method names, route paths).
- **Style Consistency**: Follow the pattern established in `auth.md` and `user.md`.

## 2. Document Structure

### Title
Start with a Level 1 header: `# [Feature Name] Feature` or `# [Module] Details`.

### Introduction
Provide a brief 1-2 sentence overview of what the feature or core module handles.

### Section Numbering
Use numbered Level 2 headers: `## 1. [Section Name]`, `## 2. [Section Name]`, etc.

---

## 3. Component Standards

### Model Documentation
- Use `### Schema Summary:` followed by a bulleted list.
- Format: `- **field_name**: Type (Additional details/constraints).`
- List instance and static methods clearly with descriptions.

### API Endpoint Documentation
Use tables for route definitions to ensure they are scannable:
| Method | Endpoint | Description | Validation/Middleware |
| :--- | :--- | :--- | :--- |
| POST | `/login` | User login | `loginSchema` |

### Service Logic
Summarize the business logic in bullet points or short paragraphs. Focus on "what" the service does rather than "how" every line is written.

### Middlewares
List middlewares used in the feature with a brief explanation of their purpose and who they allow/block.

---

## 4. Visual Elements
- **Code Blocks**: Use `text` or `typescript` as appropriate.
- **Separators**: Use `---` between major sections to improve visual flow.
- **Alerts**: Use GitHub alerts sparingly for critical notes:
  > [!NOTE]
  > High-level context or important reminders.
  > [!IMPORTANT]
  > Critical security or architectural rules.
