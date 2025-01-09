# Example-landing

This is a Next.js project configured with TypeScript, MDX support, ESLint, Prettier, and Git hooks.

## Technologies Used

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/)
- **MDX**: Support for writing content in Markdown with JSX components.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v22
- [pnpm](https://pnpm.io/) v9
- [Git](https://git-scm.com/) v2.40 or higher

### Installation

1.  Clone the repository:

    ```bash
    git clone git@github.com:Valyay/example-landing.git
    cd example-landing
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Install Git hooks globally:

    - Install `simple-git-hooks` globally to manage Git hooks:

      ```bash
      pnpm add -g simple-git-hooks
      ```

    - Install `lint-staged` globally:
      ```bash
      pnpm add -g lint-staged
      ```

4.  Set up Git hooks:

    - Configure `simple-git-hooks`:

      ```bash

      git config core.hooksPath .git/hooks/
      rm -rf .git/hooks

      npx simple-git-hooks
      ```

- Ensure the hooks defined in the `package.json` file are active.

### Scripts

Format code with Prettier:

- ```bash
  pnpm run prettier
  ```

Validate article folders, metadata, and images:

- ```bash
  pnpm run check-articles
  ```

## MDX Support

This project supports MDX for writing Markdown with React components. Use `.mdx` files to include JSX inside Markdown.

## Git Hooks

Git hooks are set up using `simple-git-hooks` to ensure code quality before commits. The `pre-commit` hook runs `lint-staged` to check staged files.

### Setting Up Git Hooks

After installing dependencies, `simple-git-hooks` automatically configures the hooks defined in `package.json`.

## Development Dependencies

- `@types/node` and `@types/react`: TypeScript type definitions.
- `eslint` and `eslint-config-next`: ESLint configurations for Next.js.
- `eslint-config-prettier`: Ensures ESLint and Prettier work together.
- `lint-staged`: Runs linters on staged files.
- `simple-git-hooks`: Lightweight Git hooks.

## Dependencies

- `next`, `react`, and `react-dom`: Core libraries for building the application.
- `@mdx-js/loader` and `@mdx-js/react`: Tools for MDX support.

## Adding a New Article

Follow these detailed instructions to add a new article to the website. No coding knowledge is required.

### Step 1: Pull the Latest Version from Main

1. **Open Terminal**: Open your terminal or command prompt.
2. **Navigate to Project Folder**: Use the `cd` command to navigate to the project folder. For example:

   ```bash
   cd example-landing
   ```

3. **Pull Latest Changes**: Ensure you are on the main branch and pull the latest changes:

   ```bash
   git checkout main
   git pull origin main
   ```

### Step 2: Create a New Branch

1. **Create a New Branch**: Create a new branch for your changes:

   ```bash
   git checkout -b add-new-article
   ```

### Step 3: Create a New Folder

1. **Open the Project Folder**: Navigate to the project folder on your computer.
2. **Locate the Content Directory**: Open the `src/content/news` directory.
3. **Create a New Folder**: Create a new folder named using the article's title in lowercase and replace spaces with hyphens. For example, `my-new-article`.

### Step 4: Add Front Matter

1. **Create a New Markdown File**: Inside the new folder, create a file named `article.md`.
2. **Add Front Matter**: At the top of your new Markdown file, add the following front matter. This helps the system understand the metadata of your article.

```markdown
---
title: "Your Article Title"
date: "YYYY-MM-DD"
description: "A brief description of your article."
---
```

**Where to Get Front Matter Information**:

- **Title**: The title of your article.
- **Date**: The publication date in the format `YYYY-MM-DD`.
- **Description**: A brief summary of your article.

### Step 5: Write Your Content

1. **Add Content**: Below the front matter, write the main content of your article using Markdown. You can include headings, paragraphs, lists, images, and more.

#### Headings

Use `#` for headings. The number of `#` symbols indicates the level of the heading.

```markdown
# Heading 1

## Heading 2

### Heading 3
```

#### Bold and Italic

Use `**` or `__` for bold text and `_` or `*` for italic text.

```markdown
**Bold Text**
**Bold Text**

_Italic Text_
_Italic Text_
```

#### Lists

Use `-` or `*` for unordered lists and numbers for ordered lists.

```markdown
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

1. First item
2. Second item
   1. Subitem 1
   2. Subitem 2
```

#### Links

Use `[Link Text](URL)` to create a hyperlink.

```markdown
[Example Link](https://example.com)
```

#### Images

Use `![Alt Text](URL)` to add images.

```markdown
![Sample Image](./assets/sample-image.jpg)
```

#### Blockquotes

Use `>` to create blockquotes.

```markdown
> This is a blockquote.
```

#### Code

Use backticks `` ` `` for inline code and triple backticks ` ``` ` for code blocks.

```markdown
Inline `code`
```

Code block

```

```

#### Horizontal Rule

Use `---` or `***` to create a horizontal rule.

```markdown
---
```

You can read more about markdown syntax at the ![link](https://www.markdownguide.org/basic-syntax/)

### Step 6: Add Images (Optional)

1. **Create an Assets Folder**: Inside your article's folder, create a subfolder named `assets`.
2. **Add Images**: Place any images you want to include in your article inside the `assets` folder. You can reference these images in your Markdown content using the following syntax:

```markdown
![Alt text](./assets/your-image.jpg)
```

**Title Image**:

- If you want to specify a title image for your article, name the image file `title` followed by the appropriate extension (e.g., `title.jpg`, `title.png`) and place it inside the `assets` folder. This image will be used as the main image for your article.

**Other Images**:

- Any other images you want to include in your article should also be placed in the assets folder. You can reference these images in your Markdown content using the syntax mentioned above.

### Step 7: Supported Image Extensions

The supported image extensions for this project are:

- .jpg
- .jpeg
- .png
- .gif
- .webp
- .avif

### Step 8: Image Ratio Recommendations

For the best visual appearance, it is recommended to use images with the following aspect ratios:

- **Title Image**: 16:9 or 4:3
- **Other Images**: 16:9 or 4:3 or 1:1

### Step 9: Save and Commit

1. **Save Your Changes**: Make sure all your changes are saved.
2. **Check Git Status**: Check the status of your changes using:

   ```bash
   git status
   ```

3. **Add Changes**: Add your new folder and its contents to the staging area:

   ```bash
   git add src/content/news/my-new-article
   ```

4. **Commit Changes**: Commit your changes with a descriptive message:

   ```bash
   git commit -m "Add new article: My New Article"
   ```

### Step 10: Push to Repository

1. **Push Changes**: Push your committed changes to the remote repository:

   ```bash
   git push origin add-new-article
   ```

### Step 11: Create a Pull Request

1. **Open GitHub**: Go to your repository on GitHub.
2. **Create Pull Request**: Click on the "Compare & pull request" button to create a new pull request for your branch.
3. **Submit Pull Request**: Fill in the details and submit the pull request for review.

### Step 12: Verify on Website

1. **Check the Website**: Once your changes are merged and deployed, visit the website to verify that your new article appears correctly.

**Where the Title Image Will Be Shown**:

- The title image will be displayed prominently at the top of the article page.
- It will also appear as a thumbnail in the list of articles on the main news page.
- Additionally, the title image will be used in the metadata for SEO purposes, which helps search engines understand the content of your article.

### Common Errors and How to Fix Them

When you commit changes, you may see error messages in the terminal. This means that you are not adding a new article correctly.

#### 1. Missing `article.md`

**Error Message**:

```

[ERROR] Missing "article.md" in folder: my-new-article

```

**What It Means**:
Every article folder needs a file named `article.md`. This file holds all the text and metadata (like title and date) for your article.

**How to Fix**:

1. Create a new file named `article.md` in your article folder.
2. Add the following content:

   ```markdown
   ---
   title: "My New Article"
   date: "2025-01-09"
   description: "A brief description of the article."
   ---

   # My New Article

   This is where your article text goes.
   ```

3. Add the corrected files to your commit:

   ```bash
   git add .
   ```

4. Try committing again:

   ```bash
   git commit -m "Your commit message"
   ```

#### 2. Missing Front Matter Fields

**Error Messages**:

```
[ERROR] Missing "title" in front matter: src/content/news/my-new-article/article.md
[ERROR] Invalid or missing "date" in front matter: src/content/news/my-new-article/article.md
[ERROR] Missing "description" in front matter: src/content/news/my-new-article/article.md
```

**What It Means**:
The `article.md` file needs a section at the top called **front matter** with `title`, `date`, and `description`.

**How to Fix**:

1. Add the following front matter to your `article.md` file:

   ```markdown
   ---
   title: "Your Article Title"
   date: "2025-01-09"
   description: "Brief summary of your article."
   ---
   ```

2. Add the corrected files to your commit:

   ```bash
   git add .
   ```

3. Try committing again:

   ```bash
   git commit -m "Your commit message"
   ```

#### 3. Images Outside the `assets` Folder

**Error Message**:

```
[ERROR] Image file "example.jpg" is outside the "assets" folder. Move it into assets/.
```

**What It Means**:
All images must be stored inside the `assets` folder within your article directory.

**How to Fix**:

1. Create an `assets` folder if it doesn’t exist.
2. Move all images into this folder.
3. Update image references in `article.md`, e.g.,:

   ```markdown
   ![Example](./assets/example.jpg)
   ```

4. Add the corrected files to your commit:

   ```bash
   git add .
   ```

5. Try committing again:

   ```bash
   git commit -m "Your commit message"
   ```

#### 4. Missing or Multiple Title Images

**Error Messages**:

```
[ERROR] Missing title image (title.jpg, title.png, etc.) in src/content/news/my-new-article/assets
[ERROR] Multiple title images found in src/content/news/my-new-article/assets. Only one "title.<ext>" allowed.
```

**What It Means**:
Each article must have **one** main image named `title` (e.g., `title.jpg`).

**How to Fix**:

1. Ensure you have exactly one file named `title` in the `assets` folder.
2. Delete or rename extra files.
3. Add the corrected files to your commit:

   ```bash
   git add .
   ```

4. Try committing again:

   ```bash
   git commit -m "Your commit message"
   ```

#### 5. Unsupported Image File Type

**Error Message**:

```
[ERROR] Unsupported image extension ".svg" in file: src/content/news/my-new-article/assets/logo.svg
```

**What It Means**:
We only allow these image formats: `.jpg, .jpeg, .png, .gif, .webp, .avif`.

**How to Fix**:

1. Convert the image to a supported format.
2. Replace the original file with the converted image.
3. Add the corrected files to your commit:

   ```bash
   git add .
   ```

4. Try committing again:

   ```bash
   git commit -m "Your commit message"
   ```

#### 6. Invalid Folder Name

**Error Message**:

```
[ERROR] Folder name "My-Article" is invalid. Use only lowercase letters, digits, and hyphens.
```

**What It Means**:
Folder names must use lowercase letters, numbers, and hyphens (e.g., `my-article`).

**How to Fix**:

1. Rename the folder to use only allowed characters.
2. Add the corrected files to your commit:

   ```bash
   git add .
   ```

3. Try committing again:

   ```bash
   git commit -m "Your commit message"
   ```

---

### Need Help?

If you encounter an error you don’t understand or need help, please contact the team lead or a project maintainer for assistance.
