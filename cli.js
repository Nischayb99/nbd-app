#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_CHOICES = [
  { name: "React + Email + Google", value: "react_email_google" },
  { name: "React + Email Only", value: "react_email_only" },
];

(async () => {
  const answers = await inquirer.prompt([
    { name: "projectName", message: "Project Name?" },
    {
      name: "template",
      message: "Select a template combination:",
      type: "list",
      choices: TEMPLATE_CHOICES
    }
  ]);

  const source = path.join(__dirname, "templates", answers.template);
  const target = path.join(process.cwd(), answers.projectName);

  try {
    await fs.copy(source, target);
    console.log(`\u2705 Project \"${answers.projectName}\" created using \"${answers.template}\" template.`);
  } catch (err) {
    console.error("\u274C Failed to copy template:", err);
  }
})();