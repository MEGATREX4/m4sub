import matter from 'gray-matter';
import { newsManifest } from './newsManifest';

export const parseFrontmatter = async (filepath) => {
  try {
    const response = await fetch(filepath);
    const text = await response.text();
    const { data, content } = matter(text);
    
    return {
      frontmatter: data,
      content
    };
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return null;
  }
};

export const getAllNews = async () => {
  try {
    // Use the manifest to fetch all articles
    const articles = await Promise.all(
      newsManifest.map(async (filename) => {
        const result = await parseFrontmatter(`/news/${filename}`);
        if (result && result.frontmatter) {
          return {
            ...result.frontmatter,
            'page-link': result.frontmatter['page-link'] || filename.replace('.md', '')
          };
        }
        return null;
      })
    );

    // Filter out any null results and sort by date
    return articles
      .filter(article => article !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
