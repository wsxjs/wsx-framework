export interface PageComponent {
  render(): void;
  getServerSideProps?(): Promise<any> | any;
  getStaticProps?(): Promise<any> | any;
}

export interface RouteParams {
  [key: string]: string;
}

export interface WSXRequest {
  url: URL;
  method: string;
  headers: Headers;
  params: RouteParams;
  query: URLSearchParams;
}

export interface WSXResponse {
  status: number;
  headers: Headers;
  body: string;
}

export interface WSXRoute {
  path: string;
  component: PageComponent;
  params?: RouteParams;
  filePath?: string;
}

export interface WSXAppConfig {
  pages: string;
  output: string;
  dev: boolean;
  port: number;
}