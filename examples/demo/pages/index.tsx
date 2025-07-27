import { WebComponent, autoRegister } from '@wsxjs/wsx-core';

@autoRegister()
export class HomePage extends WebComponent {
  render() {
    return (
      <div class="home-page">
        <h1>Welcome to WSX Framework</h1>
        <p>A Next.js alternative built on WSX principles</p>
        <nav>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </nav>
      </div>
    );
  }

  static getStyles() {
    return `
      .home-page {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
        font-family: system-ui, sans-serif;
      }
      
      h1 {
        color: #333;
        margin-bottom: 1rem;
      }
      
      nav {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
      }
      
      nav a {
        padding: 0.5rem 1rem;
        background: #007acc;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      }
      
      nav a:hover {
        background: #005a9e;
      }
    `;
  }
}

export default HomePage;