#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration for languages and frameworks
const LANGUAGE_CHOICES = [
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript (coming soon)", value: "typescript", disabled: true },
];

const FRAMEWORK_CHOICES = [
  { name: "React JS", value: "react" },
  { name: "Next JS (coming soon)", value: "nextjs", disabled: true },
];

/**
 * Validates if a project name is valid
 * @param {string} projectName - The project name to validate
 * @returns {boolean|string} - True if valid, error message if invalid
 */
function validateProjectName(projectName) {
  if (!projectName || projectName.trim() === '') {
    return 'Project name cannot be empty';
  }
  
  // Check for invalid characters
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(projectName)) {
    return 'Project name contains invalid characters';
  }
  
  // Check if directory already exists
  const targetPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(targetPath)) {
    return 'A directory with this name already exists';
  }
  
  return true;
}

/**
 * Validates if a package name is valid
 * @param {string} packageName - The package name to validate
 * @returns {boolean|string} - True if valid, error message if invalid
 */
function validatePackageName(packageName) {
  if (!packageName || packageName.trim() === '') {
    return 'Package name cannot be empty';
  }
  
  // NPM package name validation
  const validPackageName = /^[a-z0-9@._-]+$/;
  if (!validPackageName.test(packageName)) {
    return 'Package name must contain only lowercase letters, numbers, hyphens, underscores, dots, and @ symbols';
  }
  
  return true;
}

/**
 * Gets available templates for a given stack
 * @param {string} stackKey - The stack key (e.g., 'react_javascript')
 * @returns {Array} - Array of available template choices
 */
async function getAvailableTemplates(stackKey) {
  const templatesPath = path.join(__dirname, 'templates');
  
  try {
    // Check if the templates directory exists
    if (!await fs.pathExists(templatesPath)) {
      return [];
    }
    
    // Read all directories in the templates folder
    const items = await fs.readdir(templatesPath);
    const templates = [];
    
    // Filter templates based on the stack key pattern
    const [framework, language] = stackKey.split('_');
    const stackPrefix = `${framework}_`;
    
    for (const item of items) {
      const itemPath = path.join(templatesPath, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory() && item.startsWith(stackPrefix)) {
        // Convert directory name to a user-friendly display name
        const displayName = item
          .replace('react_', '')
          .replace(/_/g, ' + ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
          .replace(' + ', ' + ');
        
        templates.push({
          name: displayName,
          value: item
        });
      }
    }
    
    return templates;
  } catch (error) {
    console.error(chalk.red('Error reading templates directory:'), error.message);
    return [];
  }
}

/**
 * Copies template files to the target directory
 * @param {string} stackKey - The stack key
 * @param {string} template - The template name
 * @param {string} projectName - The project name
 * @param {string} packageName - The package name
 * @returns {Promise<boolean>} - Success status
 */
async function copyTemplate(stackKey, template, projectName, packageName) {
  const sourcePath = path.join(__dirname, 'templates', template);
  const targetPath = path.join(process.cwd(), projectName);
  
  try {
    // Ensure source exists
    if (!await fs.pathExists(sourcePath)) {
      throw new Error(`Template source not found: ${sourcePath}`);
    }
    
    // Copy template files
    await fs.copy(sourcePath, targetPath);
    
    // Update package.json if it exists
    const packageJsonPath = path.join(targetPath, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = packageName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }
    
    return true;
  } catch (error) {
    console.error(chalk.red('Error copying template:'), error.message);
    return false;
  }
}

/**
 * Displays success message and next steps
 * @param {string} projectName - The project name
 * @param {string} template - The template name
 */
function showSuccessMessage(projectName, template) {
  console.log(chalk.green(`\n✅ Project "${projectName}" created successfully using template "${template}"!`));
  console.log(chalk.cyan('\n📋 Next Steps:'));
  console.log(chalk.white(`  1. cd ${projectName}`));
  console.log(chalk.white('  2. npm install'));
  console.log(chalk.white('  3. Configure your .env file'));
  console.log(chalk.white('  4. npm run dev'));
  console.log(chalk.yellow('\n🎉 Happy coding!'));
}

/**
 * Main CLI function
 */
async function main() {
  try {
    // Welcome message
    console.log(chalk.bold.blue('\n🚀 Welcome to nbd-app project generator!\n'));
    
    // Step 1 & 2: Get project and package names
    const { projectName, packageName } = await inquirer.prompt([
      {
        name: 'projectName',
        message: 'Project Name:',
        type: 'input',
        validate: validateProjectName
      },
      {
        name: 'packageName',
        message: 'Package Name:',
        type: 'input',
        validate: validatePackageName
      }
    ]);
    
    // Step 3: Choose language
    const { language } = await inquirer.prompt([
      {
        name: 'language',
        message: 'Choose a language:',
        type: 'list',
        choices: LANGUAGE_CHOICES
      }
    ]);
    
    // Step 4: Choose framework
    const { framework } = await inquirer.prompt([
      {
        name: 'framework',
        message: 'Choose a framework:',
        type: 'list',
        choices: FRAMEWORK_CHOICES
      }
    ]);
    
    // Step 5: Form stack key
    const stackKey = `${framework}_${language}`;
    console.log(chalk.gray(`\n🔍 Looking for templates in: ${stackKey}...`));
    
    // Step 6: Get available templates
    const availableTemplates = await getAvailableTemplates(stackKey);
    
    // Step 7: Check if templates exist
    if (availableTemplates.length === 0) {
      console.log(chalk.red('\n❌ No templates found for selected stack.'));
      console.log(chalk.yellow('Please check back later or contribute templates to the project!'));
      process.exit(1);
    }
    
    // Step 8: Choose template
    const { template } = await inquirer.prompt([
      {
        name: 'template',
        message: 'Choose a template:',
        type: 'list',
        choices: availableTemplates,
        pageSize: 10
      }
    ]);
    
    // Step 9: Copy template
    console.log(chalk.gray('\n📁 Creating project...'));
    const success = await copyTemplate(stackKey, template, projectName, packageName);
    
    if (success) {
      showSuccessMessage(projectName, template);
    } else {
      console.log(chalk.red('\n❌ Failed to create project. Please try again.'));
      process.exit(1);
    }
    
  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('❌ Prompt couldn\'t be rendered in the current environment'));
    } else {
      console.error(chalk.red('❌ An unexpected error occurred:'), error.message);
    }
    process.exit(1);
  }
}

// Run the CLI
main();