import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.6f0990a9.js";const F=JSON.parse('{"title":"useLoaderData","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/use-loader-data.md","filePath":"hooks/use-loader-data.md","lastUpdated":1699632770000}'),p={name:"hooks/use-loader-data.md"},o=l(`<h1 id="useloaderdata" tabindex="-1"><code>useLoaderData</code> <a class="header-anchor" href="#useloaderdata" aria-label="Permalink to &quot;\`useLoaderData\`&quot;">​</a></h1><p>此钩子提供路由<code>loader</code>返回的值。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  createBrowserRouter,</span></span>
<span class="line"><span style="color:#E1E4E8;">  RouterProvider,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useLoaderData,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-router-dom&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fetchFakeAlbums</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Albums</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">albums</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useLoaderData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBrowserRouter</span><span style="color:#E1E4E8;">([</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    loader: loader,</span></span>
<span class="line"><span style="color:#E1E4E8;">    element: &lt;</span><span style="color:#79B8FF;">Albums</span><span style="color:#E1E4E8;"> /&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ReactDOM.</span><span style="color:#B392F0;">createRoot</span><span style="color:#E1E4E8;">(el).</span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">RouterProvider</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">router</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{router} /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  createBrowserRouter,</span></span>
<span class="line"><span style="color:#24292E;">  RouterProvider,</span></span>
<span class="line"><span style="color:#24292E;">  useLoaderData,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-router-dom&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fetchFakeAlbums</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Albums</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">albums</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useLoaderData</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBrowserRouter</span><span style="color:#24292E;">([</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    path: </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    loader: loader,</span></span>
<span class="line"><span style="color:#24292E;">    element: &lt;</span><span style="color:#005CC5;">Albums</span><span style="color:#24292E;"> /&gt;,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ReactDOM.</span><span style="color:#6F42C1;">createRoot</span><span style="color:#24292E;">(el).</span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">RouterProvider</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">router</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{router} /&gt;</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><p>调用路由<a href="./../components/route#action">操作</a>后，数据将自动重新验证，并返回加载器的最新结果。</p><p>请注意， <code>useLoaderData</code> <em>不会触发获取操作</em>。它只是读取 React Router 在内部管理的获取结果，因此您不必担心它在路由之外的重新渲染时重新获取。</p><p>这也意味着返回的数据在两次渲染之间是稳定的，因此您可以安全地将其传递给 React 钩子中的依赖关系数组，如 <code>useEffect</code> 。只有在操作或某些导航后再次调用<code>loader</code>时，数据才会发生变化。在这种情况下，标识会发生变化（即使值不会发生变化）。</p><p>您可以在任何组件或任何自定义钩子中使用此钩子，而不仅仅是 Route 元素。它会根据上下文从最近的路由返回数据。</p><p>要从页面上的任何活动路由获取数据，请参阅<a href="./../hooks/use-route-loader-data"><code>useRouteLoaderData</code></a>。</p>`,8),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const m=s(p,[["render",t]]);export{F as __pageData,m as default};
