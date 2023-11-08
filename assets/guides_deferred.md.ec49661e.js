import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.6f0990a9.js";const u=JSON.parse('{"title":"延迟数据指南","description":"","frontmatter":{},"headers":[],"relativePath":"guides/deferred.md","filePath":"guides/deferred.md","lastUpdated":1699451704000}'),p={name:"guides/deferred.md"},o=l(`<h1 id="延迟数据指南" tabindex="-1">延迟数据指南 <a class="header-anchor" href="#延迟数据指南" aria-label="Permalink to &quot;延迟数据指南&quot;">​</a></h1><h2 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h2><p>想象一下这样一种场景：您的某个路径<code>loader</code>需要检索一些数据，而由于某种原因，检索速度相当慢。例如，您要向用户显示一个包裹的位置，该包裹正被送往用户家中：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { json, useLoaderData } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-router-dom&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { getPackageLocation } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./api/packages&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">({ </span><span style="color:#FFAB70;">params</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">packageLocation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getPackageLocation</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    params.packageId</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">json</span><span style="color:#E1E4E8;">({ packageLocation });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PackageRoute</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useLoaderData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">packageLocation</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> data;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;Let&#39;s locate your package&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Your package is at {packageLocation.latitude} lat</span></span>
<span class="line"><span style="color:#E1E4E8;">        and {packageLocation.longitude} long.</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { json, useLoaderData } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-router-dom&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { getPackageLocation } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./api/packages&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">params</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">packageLocation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getPackageLocation</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    params.packageId</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">json</span><span style="color:#24292E;">({ packageLocation });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PackageRoute</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useLoaderData</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">packageLocation</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> data;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;Let&#39;s locate your package&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        Your package is at {packageLocation.latitude} lat</span></span>
<span class="line"><span style="color:#24292E;">        and {packageLocation.longitude} long.</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们假设 <code>getPackageLocation</code> 速度较慢。这将导致初始页面加载时间和路径转换时间与最慢的数据一样长。有几种方法可以优化这种情况并改善用户体验：</p><ul><li>让缓慢的事情加速（😅）。</li><li>使用 <code>Promise.all</code> 实现数据加载的并行化（在我们的示例中没有什么需要并行化的，但在其他情况下可能会有点帮助）。</li><li>添加全局过渡旋转器（对用户体验有一定帮助）。</li><li>添加本地化的骨架用户界面（对用户体验有一定帮助）。</li></ul><p>如果这些方法效果不佳，那么您可能不得不将慢速数据从 <code>loader</code> 移到组件获取中（并在加载时显示骨架回退 UI）。在这种情况下，您需要在挂载时渲染后备 UI，然后启动数据获取。从 DX 的角度来看，这其实并不可怕，这要归功于<a href="https://baimingxuan.github.io/react-router6-doc/hooks/use-fetcher" target="_blank" rel="noreferrer"><code>useFetcher</code></a>。从用户体验的角度来看，这改善了客户端转换和初始页面加载的加载体验。因此，这似乎确实解决了问题。</p><p>但由于以下两个原因，在大多数情况下（尤其是在对路由组件进行代码拆分的情况下），它仍然不是最佳选择：</p><ol><li>客户端获取将数据请求置于瀑布式流程中：文档 -&gt; JavaScript -&gt; 懒加载路由 -&gt; 数据获取</li><li>您的代码无法在组件获取和路由获取之间轻松切换（稍后将详细介绍）。</li></ol><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><p>React Router 使用 <a href="https://baimingxuan.github.io/react-router6-doc/utils/defer" target="_blank" rel="noreferrer"><code>defer</code>响应</a> 实用程序和 <a href="https://baimingxuan.github.io/react-router6-doc/components/await" target="_blank" rel="noreferrer"><code>&lt;Await /&gt;</code></a> 组件/<a href="https://baimingxuan.github.io/react-router6-doc/hooks/use-async-value" target="_blank" rel="noreferrer"><code>useAsyncValue</code></a> 钩子，并利用 React 18 的 Suspense 来获取数据。通过使用这些 API，您可以解决这两个问题：</p><ol><li>您的数据不再是瀑布式的：文档 -&gt; JavaScript -&gt; 懒加载路径和数据（并行）。</li><li>您的代码可以在渲染回退和等待数据之间轻松切换</li></ol><p>让我们深入了解一下如何做到这一点。</p><h3 id="使用defer" tabindex="-1">使用<code>defer</code> <a class="header-anchor" href="#使用defer" aria-label="Permalink to &quot;使用\`defer\`&quot;">​</a></h3><p>首先，为您的慢速数据请求添加 <code>&lt;Await /&gt;</code> ，在这种情况下，您更希望呈现一个回调 UI。让我们在上面的示例中这样做：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  Await,</span></span>
<span class="line"><span style="color:#E1E4E8;">  defer,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useLoaderData,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-router-dom&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { getPackageLocation } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./api/packages&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">({ </span><span style="color:#FFAB70;">params</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">packageLocationPromise</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getPackageLocation</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    params.packageId</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defer</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    packageLocation: packageLocationPromise,</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PackageRoute</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useLoaderData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;Let&#39;s locate your package&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">React.Suspense</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">fallback</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;Loading package location...&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">      &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Await</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">resolve</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{data.packageLocation}</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">errorElement</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;Error loading package location!&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          {(</span><span style="color:#FFAB70;">packageLocation</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">              Your package is at {packageLocation.latitude}{</span><span style="color:#9ECBFF;">&quot; &quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">              lat and {packageLocation.longitude} long.</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          )}</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Await</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">React.Suspense</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  Await,</span></span>
<span class="line"><span style="color:#24292E;">  defer,</span></span>
<span class="line"><span style="color:#24292E;">  useLoaderData,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-router-dom&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { getPackageLocation } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./api/packages&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">params</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">packageLocationPromise</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getPackageLocation</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    params.packageId</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defer</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    packageLocation: packageLocationPromise,</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PackageRoute</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useLoaderData</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;Let&#39;s locate your package&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">React.Suspense</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">fallback</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;Loading package location...&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;}</span></span>
<span class="line"><span style="color:#24292E;">      &gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Await</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">resolve</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{data.packageLocation}</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">errorElement</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;Error loading package location!&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        &gt;</span></span>
<span class="line"><span style="color:#24292E;">          {(</span><span style="color:#E36209;">packageLocation</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">              Your package is at {packageLocation.latitude}{</span><span style="color:#032F62;">&quot; &quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">              lat and {packageLocation.longitude} long.</span></span>
<span class="line"><span style="color:#24292E;">            &lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          )}</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Await</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">React.Suspense</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>或者，也可以使用 <code>useAsyncValue</code> 钩子：</p><p>如果你不喜欢使用 render 属性，你可以使用一个 Hook，但你必须把代码拆分成另一个组件：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PackageRoute</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useLoaderData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;Let&#39;s locate your package&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">React.Suspense</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">fallback</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;Loading package location...&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">      &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Await</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">resolve</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{data.packageLocation}</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">errorElement</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;Error loading package location!&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#79B8FF;">PackageLocation</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#79B8FF;">Await</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">React.Suspense</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">main</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PackageLocation</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">packageLocation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useAsyncValue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      Your package is at {packageLocation.latitude} lat and{</span><span style="color:#9ECBFF;">&quot; &quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">      {packageLocation.longitude} long.</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PackageRoute</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useLoaderData</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;Let&#39;s locate your package&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">React.Suspense</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">fallback</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;Loading package location...&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;}</span></span>
<span class="line"><span style="color:#24292E;">      &gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Await</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">resolve</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{data.packageLocation}</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">errorElement</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;Error loading package location!&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        &gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#005CC5;">PackageLocation</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#005CC5;">Await</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">React.Suspense</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">main</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PackageLocation</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">packageLocation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useAsyncValue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      Your package is at {packageLocation.latitude} lat and{</span><span style="color:#032F62;">&quot; &quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">      {packageLocation.longitude} long.</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="评估解决方案" tabindex="-1">评估解决方案 <a class="header-anchor" href="#评估解决方案" aria-label="Permalink to &quot;评估解决方案&quot;">​</a></h2><p>因此，我们不会在触发获取请求前等待组件，而是在用户开始转换到新路由时，立即启动对慢速数据的请求。这可以大大加快较慢网络的用户体验。</p><p>此外，React Router 为此提供的 API 非常人性化。您可以根据是否包含 <code>await</code> 关键字，在是否延迟之间进行切换：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defer</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// not deferred:</span></span>
<span class="line"><span style="color:#E1E4E8;">  packageLocation: </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> packageLocationPromise,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// deferred:</span></span>
<span class="line"><span style="color:#E1E4E8;">  packageLocation: packageLocationPromise,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defer</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// not deferred:</span></span>
<span class="line"><span style="color:#24292E;">  packageLocation: </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> packageLocationPromise,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// deferred:</span></span>
<span class="line"><span style="color:#24292E;">  packageLocation: packageLocationPromise,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>因此，您可以进行 A/B 延迟测试，甚至可以根据用户或请求的数据来决定是否延迟：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">({ </span><span style="color:#FFAB70;">request</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">params</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">packageLocationPromise</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getPackageLocation</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    params.packageId</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">shouldDefer</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">shouldDeferPackageLocation</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    request,</span></span>
<span class="line"><span style="color:#E1E4E8;">    params.packageId</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defer</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    packageLocation: shouldDefer</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> packageLocationPromise</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> packageLocationPromise,</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">request</span><span style="color:#24292E;">, </span><span style="color:#E36209;">params</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">packageLocationPromise</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getPackageLocation</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    params.packageId</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">shouldDefer</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">shouldDeferPackageLocation</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    request,</span></span>
<span class="line"><span style="color:#24292E;">    params.packageId</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defer</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    packageLocation: shouldDefer</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> packageLocationPromise</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> packageLocationPromise,</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>shouldDeferPackageLocation</code> 可以用来检查提出请求的用户、软件包位置数据是否在缓存中、A/B 测试的状态或其他任何你想要的信息。这真是太贴心了 🍭</p><h2 id="常问问题" tabindex="-1">常问问题 <a class="header-anchor" href="#常问问题" aria-label="Permalink to &quot;常问问题&quot;">​</a></h2><h3 id="为什么不默认推迟一切" tabindex="-1">为什么不默认推迟一切？ <a class="header-anchor" href="#为什么不默认推迟一切" aria-label="Permalink to &quot;为什么不默认推迟一切？&quot;">​</a></h3><p>eact Router defer API 是 React Router 提供的另一个工具，它为您提供了一种在权衡之间做出选择的好方法。你想让页面渲染得更快吗？那就延迟吧。你想要更低的 CLS（内容布局偏移）？不要延迟。你想要更快的渲染速度，但也想要更低的 CLS？那就只延迟那些慢且不重要的内容。</p><p>这都是权衡的结果，而 API 设计的精妙之处在于，它非常适合你进行简单的实验，看看哪种权衡方式能为你的真实世界关键指标带来更好的结果。</p><h3 id="suspense-回退何时渲染" tabindex="-1"><code>&lt;Suspense/&gt;</code>回退何时渲染？ <a class="header-anchor" href="#suspense-回退何时渲染" aria-label="Permalink to &quot;\`&lt;Suspense/&gt;\`回退何时渲染？&quot;">​</a></h3><p><code>&lt;Await /&gt;</code> 组件只会在初始呈现 <code>&lt;Await /&gt;</code> 组件时，在 <code>&lt;Suspense&gt;</code> 边界上抛出<code>promise</code>，且<code>promise</code>未确定。如果属性发生变化，它不会重新渲染回调。实际上，这意味着当用户提交表单并重新验证<code>loader</code>数据时，不会呈现回调。当用户使用不同的参数导航到相同的路径时（在上述示例中，如果用户从左侧的套餐列表中选择在右侧找到自己的位置），就会呈现回调。</p><p>一开始，我们可能会觉得这与直觉相悖，但请别急，我们已经仔细考虑过这个问题，而且这种工作方式非常重要。让我们想象一下没有延迟 API 的世界。在这种情况下，您可能需要为表单提交/重新验证实现优化用户界面。</p><p>当您决定尝试 <code>defer</code> 的权衡时，我们不希望您必须更改或移除这些优化，因为我们希望您能在推迟和不推迟某些数据之间轻松切换。因此，我们确保您现有的乐观状态以同样的方式运行。如果我们不这样做，您可能会体验到我们所说的 &quot;Popcorn UI&quot;，即提交数据会触发回调加载状态，而不是您辛苦开发的优化的用户界面。</p><p>因此，请记住这一点：<strong>延迟 100% 只涉及路由及其参数的初始加载</strong>。</p><h3 id="为什么加载器返回的响应对象不再起作用了" tabindex="-1">为什么加载器返回的响应对象不再起作用了？ <a class="header-anchor" href="#为什么加载器返回的响应对象不再起作用了" aria-label="Permalink to &quot;为什么加载器返回的响应对象不再起作用了？&quot;">​</a></h3><p>当您使用 <code>defer</code> 时，您是在告诉 React Router 立即加载页面，而不使用延迟数据。在返回 <code>Response</code> 对象之前，页面已经加载完毕，因此响应的自动处理方式与使用 <code>return fetch(url)</code> 时不同。</p><p>因此，您需要处理自己的 <code>Response</code> 进程，并使用数据而不是 <code>Response</code> 实例来解决您的延迟 Promise 问题。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">({ </span><span style="color:#FFAB70;">request</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">params</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defer</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Broken! Resolves with a Response</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// broken: fetch(url),</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Fixed! Resolves with the response data</span></span>
<span class="line"><span style="color:#E1E4E8;">    data: </span><span style="color:#B392F0;">fetch</span><span style="color:#E1E4E8;">(url).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> res.</span><span style="color:#B392F0;">json</span><span style="color:#E1E4E8;">()),</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">request</span><span style="color:#24292E;">, </span><span style="color:#E36209;">params</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defer</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Broken! Resolves with a Response</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// broken: fetch(url),</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Fixed! Resolves with the response data</span></span>
<span class="line"><span style="color:#24292E;">    data: </span><span style="color:#6F42C1;">fetch</span><span style="color:#24292E;">(url).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> res.</span><span style="color:#6F42C1;">json</span><span style="color:#24292E;">()),</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>或者考虑一下我们的延迟数据会返回重定向 <code>Response</code> 的情况。您可以检测重定向并将状态代码和位置作为数据发送回来，然后您可以通过 <code>useEffect</code> 和 <code>useNavigate</code> 在组件中执行客户端重定向。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loader</span><span style="color:#E1E4E8;">({ </span><span style="color:#FFAB70;">request</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">params</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fetch</span><span style="color:#E1E4E8;">(url).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (res.status </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">301</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        isRedirect: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        status: res.status,</span></span>
<span class="line"><span style="color:#E1E4E8;">        location: res.headers.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Location&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">      };</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res.</span><span style="color:#B392F0;">json</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defer</span><span style="color:#E1E4E8;">({ data });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loader</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">request</span><span style="color:#24292E;">, </span><span style="color:#E36209;">params</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fetch</span><span style="color:#24292E;">(url).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (res.status </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">301</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        isRedirect: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        status: res.status,</span></span>
<span class="line"><span style="color:#24292E;">        location: res.headers.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Location&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">      };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res.</span><span style="color:#6F42C1;">json</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defer</span><span style="color:#24292E;">({ data });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,41),e=[o];function c(t,r,E,y,i,d){return a(),n("div",null,e)}const F=s(p,[["render",c]]);export{u as __pageData,F as default};
