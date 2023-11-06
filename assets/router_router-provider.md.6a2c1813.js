import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.6f0990a9.js";const F=JSON.parse('{"title":"<RouterProvider>","description":"","frontmatter":{},"headers":[],"relativePath":"router/router-provider.md","filePath":"router/router-provider.md","lastUpdated":1699266951000}'),p={name:"router/router-provider.md"},o=l(`<h1 id="routerprovider" tabindex="-1"><code>&lt;RouterProvider&gt;</code> <a class="header-anchor" href="#routerprovider" aria-label="Permalink to &quot;\`&lt;RouterProvider&gt;\`&quot;">​</a></h1><p>所有<a href="https://baimingxuan.github.io/react-router6-doc/routers/picking-a-router" target="_blank" rel="noreferrer">数据路由</a>对象都将传递给该组件，以渲染应用程序并启用其他数据 API。</p><blockquote><p>由于在数据 API 的设计中解耦了获取和呈现，因此您应该在 React 树之外创建路由，并使用静态定义的路由集。有关此设计的更多信息，请参阅 <a href="https://remix.run/blog/remixing-react-router" target="_blank" rel="noreferrer">Remixing React Router</a> 博文和 <a href="https://www.youtube.com/watch?v=95B8mnhzoCM" target="_blank" rel="noreferrer">When to Fetch</a> 会议演讲。</p></blockquote><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  createBrowserRouter,</span></span>
<span class="line"><span style="color:#E1E4E8;">  RouterProvider,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-router-dom&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBrowserRouter</span><span style="color:#E1E4E8;">([</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    element: &lt;</span><span style="color:#79B8FF;">Root</span><span style="color:#E1E4E8;"> /&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    children: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        path: </span><span style="color:#9ECBFF;">&quot;dashboard&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        element: &lt;</span><span style="color:#79B8FF;">Dashboard</span><span style="color:#E1E4E8;"> /&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        path: </span><span style="color:#9ECBFF;">&quot;about&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        element: &lt;</span><span style="color:#79B8FF;">About</span><span style="color:#E1E4E8;"> /&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ReactDOM.</span><span style="color:#B392F0;">createRoot</span><span style="color:#E1E4E8;">(document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">RouterProvider</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">router</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{router}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">fallbackElement</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">BigSpinner</span><span style="color:#E1E4E8;"> /&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  createBrowserRouter,</span></span>
<span class="line"><span style="color:#24292E;">  RouterProvider,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-router-dom&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBrowserRouter</span><span style="color:#24292E;">([</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    element: &lt;</span><span style="color:#005CC5;">Root</span><span style="color:#24292E;"> /&gt;,</span></span>
<span class="line"><span style="color:#24292E;">    children: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        path: </span><span style="color:#032F62;">&quot;dashboard&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        element: &lt;</span><span style="color:#005CC5;">Dashboard</span><span style="color:#24292E;"> /&gt;,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        path: </span><span style="color:#032F62;">&quot;about&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        element: &lt;</span><span style="color:#005CC5;">About</span><span style="color:#24292E;"> /&gt;,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ReactDOM.</span><span style="color:#6F42C1;">createRoot</span><span style="color:#24292E;">(document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">RouterProvider</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">router</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{router}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fallbackElement</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">BigSpinner</span><span style="color:#24292E;"> /&gt;}</span></span>
<span class="line"><span style="color:#24292E;">  /&gt;</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><h2 id="fallbackelement" tabindex="-1"><code>fallbackElement</code> <a class="header-anchor" href="#fallbackelement" aria-label="Permalink to &quot;\`fallbackElement\`&quot;">​</a></h2><p>如果您没有在服务器上渲染应用程序， <code>createBrowserRouter</code> 将在挂载时启动所有匹配的路由加载器。在此期间，您可以提供 <code>fallbackElement</code> ，向用户表明应用程序正在运行。将静态托管 TTFB 计算在内！</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">RouterProvider</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">router</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{router}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">fallbackElement</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">SpinnerOfDoom</span><span style="color:#E1E4E8;"> /&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">/&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">RouterProvider</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">router</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{router}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">fallbackElement</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">SpinnerOfDoom</span><span style="color:#24292E;"> /&gt;}</span></span>
<span class="line"><span style="color:#24292E;">/&gt;</span></span></code></pre></div><h2 id="future" tabindex="-1"><code>future</code> <a class="header-anchor" href="#future" aria-label="Permalink to &quot;\`future\`&quot;">​</a></h2><p>一组可选的 <a href="https://baimingxuan.github.io/react-router6-doc/guides/api-development-strategy" target="_blank" rel="noreferrer">Future Flags</a>。我们建议您尽早选择使用新发布的 future flags，以方便您最终迁移到 v7版本。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">RouterProvider</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">router</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{router}</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">future</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{{ v7_startTransition: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">RouterProvider</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">router</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{router}</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">future</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{{ v7_startTransition: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,10),e=[o];function t(r,c,E,y,i,u){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{F as __pageData,h as default};
