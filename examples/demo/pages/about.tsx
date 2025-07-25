import { WebComponent, autoRegister } from '@wsx-framework/core';

@autoRegister()
export class AboutPage extends WebComponent {
  render() {
    return (
      <div class="about-page">
        <h1>About WSX Framework</h1>
        <p>
          WSX Framework is a lightweight, zero-runtime alternative to Next.js
          built on top of WSX (Web Components + JSX).
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Server-Side Rendering (SSR)</li>
          <li>File-based routing</li>
          <li>Zero-runtime overhead</li>
          <li>Native Web Components</li>
          <li>TypeScript first</li>
        </ul>
        <a href="/">← Back to Home</a>
      </div>
    );
  }

  static getStyles() {
    return `
      .about-page {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
        font-family: system-ui, sans-serif;
      }
      
      h1, h2 {
        color: #333;
      }
      
      ul {
        margin: 1rem 0;
        padding-left: 2rem;
      }
      
      li {
        margin: 0.5rem 0;
      }
      
      a {
        color: #007acc;
        text-decoration: none;
      }
      
      a:hover {
        text-decoration: underline;
      }
    `;
  }
}

export default AboutPage;