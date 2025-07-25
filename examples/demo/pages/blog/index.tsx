import { WebComponent, autoRegister } from '@wsx-framework/core';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

interface BlogIndexProps {
  posts: BlogPost[];
}

@autoRegister()
export class BlogIndexPage extends WebComponent<BlogIndexProps> {
  render() {
    const { posts } = this.props;
    
    return (
      <div class="blog-index">
        <h1>Blog</h1>
        <div class="posts">
          {posts.map(post => (
            <article class="post-card" key={post.slug}>
              <h2>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h2>
              <time>{post.date}</time>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
        <a href="/" class="home-link">← Back to Home</a>
      </div>
    );
  }

  static async getServerSideProps() {
    // Mock blog posts - in real app this would come from CMS/database
    const posts: BlogPost[] = [
      {
        slug: 'hello-world',
        title: 'Hello World',
        excerpt: 'Welcome to our blog built with WSX Framework!',
        date: '2024-01-01'
      },
      {
        slug: 'wsx-features',
        title: 'WSX Framework Features',
        excerpt: 'Exploring server-side rendering and file-based routing.',
        date: '2024-01-02'
      }
    ];

    return { posts };
  }

  static getStyles() {
    return `
      .blog-index {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
        font-family: system-ui, sans-serif;
      }
      
      h1 {
        color: #333;
        margin-bottom: 2rem;
      }
      
      .posts {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .post-card {
        padding: 1.5rem;
        border: 1px solid #eee;
        border-radius: 8px;
      }
      
      .post-card h2 {
        margin: 0 0 0.5rem 0;
      }
      
      .post-card h2 a {
        color: #333;
        text-decoration: none;
      }
      
      .post-card h2 a:hover {
        color: #007acc;
      }
      
      .post-card time {
        color: #666;
        font-size: 0.9rem;
      }
      
      .post-card p {
        margin: 1rem 0 0 0;
        color: #555;
        line-height: 1.5;
      }
      
      .home-link {
        color: #007acc;
        text-decoration: none;
      }
      
      .home-link:hover {
        text-decoration: underline;
      }
    `;
  }
}

export default BlogIndexPage;