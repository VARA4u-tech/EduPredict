import fs from "fs";
import path from "path";

const filesToUpdate = [
  "src/pages/StudentPerformance.tsx",
  "src/pages/StudentDashboard.tsx",
  "src/pages/ReportsPage.tsx",
  "src/pages/RegisterPage.tsx",
  "src/pages/PredictionPage.tsx",
  "src/pages/LoginPage.tsx",
  "src/pages/LandingPage.tsx",
  "src/pages/FacultyDashboard.tsx",
  "src/pages/AdminDashboard.tsx",
  "src/components/Navbar.tsx",
  "src/components/Footer.tsx",
  "src/components/ComicStrip.tsx",
];

const basePath = "c:/Users/DV.PRASAD/student-success-comic/frontend";

filesToUpdate.forEach((relativePath) => {
  const fullPath = path.join(basePath, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${fullPath} - does not exist.`);
    return;
  }

  let content = fs.readFileSync(fullPath, "utf-8");

  // 1. Remove Brain from lucide-react import
  // Could be `import { Brain } from "lucide-react";` or `import { Brain, Other } from ...`
  content = content.replace(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]lucide-react['"];/g, (match, p1) => {
    const icons = p1.split(',').map(s => s.trim()).filter(s => s !== 'Brain');
    if (icons.length === 0) {
      return '';
    }
    return `import { ${icons.join(', ')} } from "lucide-react";`;
  });

  // 2. Add Logo import if Brain was removed and replaced (meaning it was used)
  // Actually, let's just add it near the top if we need to replace Brain
  if (content.includes("Brain") && !content.includes("import Logo from")) {
    const lines = content.split('\n');
    const lastImportIndex = lines.reduce((acc, line, i) => line.startsWith('import ') ? i : acc, -1);
    if (lastImportIndex !== -1) {
      lines.splice(lastImportIndex + 1, 0, `import Logo from "@/components/Logo";`);
      content = lines.join('\n');
    } else {
      content = `import Logo from "@/components/Logo";\n` + content;
    }
  }

  // 3. Replace <Brain ... /> with <Logo ... />
  content = content.replace(/<Brain/g, "<Logo");
  
  // 4. Replace `icon: Brain` with `icon: Logo`
  content = content.replace(/icon:\s*Brain/g, "icon: Logo");

  fs.writeFileSync(fullPath, content, "utf-8");
  console.log(`Updated ${relativePath}`);
});
