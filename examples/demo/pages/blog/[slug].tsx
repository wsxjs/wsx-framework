import { WebComponent, autoRegister } from '@wsx-framework/core';

interface BlogPostProps {
  slug: string;
  title: string;
  content: string;
  date: string;
}

@autoRegister()
export class BlogPostPage extends WebComponent<BlogPostProps> {
  render() {
    const { slug, title, content, date } = this.props;
    
    return (
      <article class="blog-post">
        <header>
          <h1>{title}</h1>
          <time>{date}</time>
        </header>
        <div class="content">
          <p>{content}</p>
        </div>
        <nav>
          <a href="/blog">← All Posts</a>
          <a href="/">Home</a>
        </nav>
      </article>
    );
  }

  static async getServerSideProps({ params }: { params: { slug: string } }) {
    // Mock blog data - in real app this would come from CMS/database
    const posts: Record<string, Omit<BlogPostProps, 'slug'>> = {
      'hello-world': {
        title: 'Hello World',
        content: 'This is our first blog post using WSX Framework!',
        date: '2024-01-01'
      },
      'wsx-features': {
        title: 'WSX Framework Features',
        content: 'Exploring SSR, routing, and zero-runtime benefits.',
        date: '2024-01-02'
      }
    };

    const post = posts[params.slug];
    
    if (!post) {
      return {
        notFound: true
      };
    }

    return {
      slug: params.slug,
      ...post
    };
  }

  static getStyles() {
    return `
      .blog-post {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
        font-family: system-ui, sans-serif;
      }
      
      header {
        margin-bottom: 2rem;
        border-bottom: 1px solid #eee;
        padding-bottom: 1rem;
      }
      
      h1 {
        color: #333;
        margin-bottom: 0.5rem;
      }
      
      time {
        color: #666;
        font-size: 0.9rem;
      }
      
      .content {
        margin: 2rem 0;
        line-height: 1.6;
      }
      
      nav {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
      }
      
      nav a {
        color: #007acc;
        text-decoration: none;
      }
      
      nav a:hover {
        text-decoration: underline;
      }
    `;
  }
}

export default BlogPostPage;