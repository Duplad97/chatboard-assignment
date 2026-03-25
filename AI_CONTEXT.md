# AI Context – Chat Board Application

## 1. Project Overview
This project is a simple chat board application where users can:
- Create messages
- View messages in a list
- Delete messages

Messages are persisted in a database and reflected in the UI in real time (or near real time).

---

## 2. Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Backend/Database: Supabase
- Hosting: Vercel

---

## 3. Core Features
- Input field for creating a message
- Save button to persist the message
- Display list of messages
- Delete button for each message

---

## 4. Data Model
Message:
- id: string (UUID)
- content: string
- created_at: timestamp

---

## 5. Architecture & Conventions
- Use server/client separation appropriately (Next.js App Router)
- Prefer server actions or API routes for database operations
- Keep components small and focused
- Separate UI from data-fetching logic when possible

---

## 6. Supabase Usage
- Use Supabase client for CRUD operations
- Handle errors explicitly
- Avoid unnecessary duplicate queries
- Keep queries simple and readable

---

## 7. UI/UX Guidelines
- Keep UI minimal and clean
- Show messages in chronological order
- Provide immediate feedback after actions (optimistic update or refresh)
- Design Style:
    - Minimal but polished (similar to modern SaaS tools)
    - Soft shadows, subtle borders
    - Rounded corners
    - Neutral colors with one accent color
    - Comfortable spacing (not cramped)

---

## 8. Coding Standards
- Use TypeScript with strict typing
- Avoid `any`
- Use async/await
- Handle edge cases (empty input, failed requests)

---

## 9. Constraints
- Do not introduce unnecessary libraries
- Keep the solution simple and maintainable
- Avoid overengineering (no complex state management needed)

---

## 10. What AI Should Do
- Suggest clean and minimal solutions
- Follow Next.js best practices
- Respect the existing structure
- Explain important decisions briefly

---

## 11. What AI Should NOT Do
- Do not overcomplicate the solution
- Do not introduce heavy abstractions
- Do not ignore error handling