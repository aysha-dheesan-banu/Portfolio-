import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export const loadMarkdownFile = async (filePath) => {
  const response = await fetch(filePath);
  const markdown = await response.text();
  const { data, content } = matter(markdown);

  if (data.image && !data.image.startsWith('http')) {
    data.image = `${process.env.PUBLIC_URL}${data.image}`;
  }

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { frontmatter: data, content: contentHtml };
};

export const loadMarkdownCollection = async (folderPath) => {
    const response = await fetch(`${folderPath}/index.json`);
    const files = await response.json();
    
    const collection = await Promise.all(
        files.map(async (file) => {
            const { frontmatter, content } = await loadMarkdownFile(`${folderPath}/${file}`);
            return { ...frontmatter, content, slug: file.replace('.md', '') };
        })
    );
    return collection;
};
