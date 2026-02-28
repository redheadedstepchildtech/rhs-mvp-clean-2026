import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const { title, description, color } = req.body;

    // Load template
    const templatePath = path.join(process.cwd(), 'templates', 'minisite.html');
    let template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders
    template = template
      .replace('{{title}}', title)
      .replace('{{description}}', description)
      .replace('{{color}}', color);

    // Ensure public/storage exists
    const outputDir = path.join(process.cwd(), 'public', 'storage');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate unique filename
    const id = Date.now().toString();
    const outputPath = path.join(outputDir, `${id}.html`);

    // Write the minisite file
    fs.writeFileSync(outputPath, template);

    // Return the URL the browser can access
    const url = `/storage/${id}.html`;

    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate minisite' });
  }
}