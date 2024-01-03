import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.6f0990a9.js";const F=JSON.parse('{"title":"createStaticRouter","description":"","frontmatter":{},"headers":[],"relativePath":"routers/create-static-router.md","filePath":"routers/create-static-router.md","lastUpdated":1704271911000}'),p={name:"routers/create-static-router.md"},o=l(`<h1 id="createstaticrouter" tabindex="-1"><code>createStaticRouter</code> <a class="header-anchor" href="#createstaticrouter" aria-label="Permalink to &quot;\`createStaticRouter\`&quot;">​</a></h1><p><code>createStaticRouter</code> 用于在服务器（即 <a href="https://nodejs.org/" target="_blank" rel="noreferrer">Node</a> 或其他 Javascript 运行时）上利用<a href="./../routers/picking-a-router">数据路由</a>进行渲染。有关更全面的概述，请参阅<a href="./../guides/ssr">服务器端渲染</a>指南。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  createStaticHandler,</span></span>
<span class="line"><span style="color:#E1E4E8;">  createStaticRouter,</span></span>
<span class="line"><span style="color:#E1E4E8;">  StaticRouterProvider,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-router-dom/server&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Root, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  loader </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> rootLoader,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ErrorBoundary </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> RootBoundary,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./root&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">routes</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    loader: rootLoader,</span></span>
<span class="line"><span style="color:#E1E4E8;">    Component: Root,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ErrorBoundary: RootBoundary,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">renderHtml</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">req</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> { query, dataRoutes } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createStaticHandler</span><span style="color:#E1E4E8;">(routes);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fetchRequest </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createFetchRequest</span><span style="color:#E1E4E8;">(req);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(fetchRequest);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// If we got a redirect response, short circuit and let our Express server</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// handle that directly</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (context </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Response</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> context;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> router </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createStaticRouter</span><span style="color:#E1E4E8;">(dataRoutes, context);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ReactDOMServer.</span><span style="color:#B392F0;">renderToString</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">React.StrictMode</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">StaticRouterProvider</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">router</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{router}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">context</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{context}</span></span>
<span class="line"><span style="color:#E1E4E8;">      /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">React.StrictMode</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  createStaticHandler,</span></span>
<span class="line"><span style="color:#24292E;">  createStaticRouter,</span></span>
<span class="line"><span style="color:#24292E;">  StaticRouterProvider,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-router-dom/server&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Root, {</span></span>
<span class="line"><span style="color:#24292E;">  loader </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> rootLoader,</span></span>
<span class="line"><span style="color:#24292E;">  ErrorBoundary </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> RootBoundary,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./root&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">routes</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    loader: rootLoader,</span></span>
<span class="line"><span style="color:#24292E;">    Component: Root,</span></span>
<span class="line"><span style="color:#24292E;">    ErrorBoundary: RootBoundary,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">renderHtml</span><span style="color:#24292E;">(</span><span style="color:#E36209;">req</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> { query, dataRoutes } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createStaticHandler</span><span style="color:#24292E;">(routes);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fetchRequest </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createFetchRequest</span><span style="color:#24292E;">(req);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(fetchRequest);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// If we got a redirect response, short circuit and let our Express server</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// handle that directly</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (context </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Response</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> context;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> router </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createStaticRouter</span><span style="color:#24292E;">(dataRoutes, context);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ReactDOMServer.</span><span style="color:#6F42C1;">renderToString</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">React.StrictMode</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">StaticRouterProvider</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">router</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{router}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">context</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{context}</span></span>
<span class="line"><span style="color:#24292E;">      /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">React.StrictMode</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="类型声明" tabindex="-1">类型声明 <a class="header-anchor" href="#类型声明" aria-label="Permalink to &quot;类型声明&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createStaticRouter</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">routes</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RouteObject</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">context</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StaticHandlerContext</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">opts</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">future</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FFAB70;">v7_partialHydration</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createStaticRouter</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">routes</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RouteObject</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">context</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StaticHandlerContext</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">opts</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">future</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#E36209;">v7_partialHydration</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Router</span><span style="color:#24292E;">;</span></span></code></pre></div><h2 id="opts-future" tabindex="-1"><code>opts.future</code> <a class="header-anchor" href="#opts-future" aria-label="Permalink to &quot;\`opts.future\`&quot;">​</a></h2><p>为该静态路由器启用的一组可选<a href="./../guides/api-development-strategy">未来标志</a>。我们建议您尽早选择使用新发布的未来标志，以方便最终迁移到 v7。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBrowserRouter</span><span style="color:#E1E4E8;">(routes, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  future: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Opt-into partial hydration</span></span>
<span class="line"><span style="color:#E1E4E8;">    v7_partialHydration: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBrowserRouter</span><span style="color:#24292E;">(routes, {</span></span>
<span class="line"><span style="color:#24292E;">  future: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Opt-into partial hydration</span></span>
<span class="line"><span style="color:#24292E;">    v7_partialHydration: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>目前可用的未来标志如下:</p><table><thead><tr><th>Flag</th><th>说明</th></tr></thead><tbody><tr><td><a href="./../routers/create-browser-router#partial-hydration-data"><code>v7_partialHydration</code></a></td><td>支持服务器渲染应用程序的部分水合功能</td></tr></tbody></table><p><strong>另请参见:</strong></p><ul><li><a href="./../routers/create-static-handler"><code>createStaticHandler</code></a></li><li><a href="./../routers/static-router-provider"><code>&lt;StaticRouterProvider&gt;</code></a></li></ul>`,12),e=[o];function t(r,c,E,y,i,d){return a(),n("div",null,e)}const h=s(p,[["render",t]]);export{F as __pageData,h as default};
