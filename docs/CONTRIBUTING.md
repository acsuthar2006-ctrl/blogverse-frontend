# 🤝 Contributing Guidelines & Git Workflow for Interns

Welcome to the team! As part of our engineering culture at BlogVerse, we prioritize high code quality, clear communication, consistent Git hygiene, and thorough code reviews.

This guide outlines our **branching strategy**, **commit conventions**, and **Pull Request (PR) workflow**.

---

## 🌿 1. Branching Strategy

We follow a feature-branch workflow. **No developer commits directly to `main`**. All work happens on isolated feature branches.

### Branch Naming Conventions
- `feature/<feature-name>` — For new features or UI components (e.g. `feature/auth-and-navigation`, `feature/posts-and-comments`).
- `bugfix/<issue-description>` — For fixing bugs (e.g. `bugfix/comment-edit-token-modal`).
- `refactor/<module-name>` — For restructuring existing code without adding new features.
- `docs/<doc-name>` — For documentation updates.

### Creating a Feature Branch

Always branch off the latest `main`:

```bash
# Checkout main and pull latest changes
git checkout main
git pull origin main

# Create and checkout your feature branch
git checkout -b feature/auth-and-navigation
```

---

## 💬 2. Commit Message Guidelines

We use **Conventional Commits** to keep our Git history clear and readable.

### Format:
```text
<type>: <short summary in imperative present tense>
```

### Examples:
- `feat: add AuthContext and JWT token storage`
- `feat: implement PostCard grid view with category badges`
- `fix: resolve issue where anonymous editToken was omitted in state`
- `docs: update BACKEND_REFERENCE.md with comments endpoint schemas`
- `style: apply glassmorphism cards and dark theme variables`

---

## 📬 3. Pull Request (PR) Workflow

When your feature is complete and tested locally, open a Pull Request to merge your branch into `main`.

### Step-by-Step PR Instructions:

1. **Push your branch to GitHub**:
   ```bash
   git push -u origin feature/auth-and-navigation
   ```

2. **Open a Pull Request on GitHub**:
   - Navigate to [https://github.com/acsuthar2006-ctrl/blogverse-frontend/pulls](https://github.com/acsuthar2006-ctrl/blogverse-frontend/pulls).
   - Click **New Pull Request**.
   - Base branch: `main` ⬅️ Compare branch: `feature/auth-and-navigation`.

3. **Fill out the Pull Request Description**:
   Use the following PR template:

```markdown
## 📌 Description
Brief summary of what this PR introduces or fixes.

## 🛠️ Changes Made
- Added `AuthContext` for token management.
- Implemented `Header` and `AuthModal` with login/register tabs.
- Integrated `POST /api/v1/auth/login` endpoint.

## 🧪 How Has This Been Tested?
- Tested login flow locally with backend server.
- Verified light and dark mode toggling across screen sizes.

## 📸 Screenshots / Demos (If applicable)
[Attach screenshots or GIFs here]

## 📋 Checklist
- [ ] Code follows project style guidelines.
- [ ] Self-reviewed code before requesting review.
- [ ] No console errors or warnings in developer tools.
- [ ] Branch is up to date with `main`.
```

4. **Assign Reviewer**:
   Assign your Senior Developer / Mentor to review your PR.

---

## 🔍 4. Code Review Process

1. **Review Feedback**:
   The Senior Developer will review your PR, test functionality, and leave inline comments or request changes.

2. **Making Updates**:
   If changes are requested, address them directly on your feature branch, commit, and push. The PR will automatically update!

   ```bash
   # Make required fixes
   git add .
   git commit -m "refactor: update auth error handling per review comments"
   git push
   ```

3. **Merging**:
   Once approved by your mentor, your PR will be squash-merged into `main`! 🎉

---

## 💡 Best Engineering Practices

1. **Component Reusability**: Keep components small, modular, and single-purpose.
2. **Prop Validation**: Ensure clean interface contracts for all components.
3. **State Management**: Use React Context for global state (Auth, Theme), and keep component state local when appropriate.
4. **Error Handling**: Always handle API loading states and error responses gracefully.
5. **No Hardcoded API URLs**: Always use the environment configuration / central API client module.
