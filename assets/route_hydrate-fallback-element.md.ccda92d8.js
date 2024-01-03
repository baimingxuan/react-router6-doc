import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.6f0990a9.js";const h=JSON.parse('{"title":"hydrateFallbackElement","description":"","frontmatter":{},"headers":[],"relativePath":"route/hydrate-fallback-element.md","filePath":"route/hydrate-fallback-element.md","lastUpdated":1704271911000}'),p={name:"route/hydrate-fallback-element.md"},o=l(`<h1 id="hydratefallbackelement" tabindex="-1"><code>hydrateFallbackElement</code> <a class="header-anchor" href="#hydratefallbackelement" aria-label="Permalink to &quot;\`hydrateFallbackElement\`&quot;">​</a></h1><p>如果您使用<a href="./../guides/ssr">服务器端渲染</a>并利用<a href="./../routers/create-browser-router#partial-hydration-data">部分水合</a>，那么您可以指定一个元素/组件，以便在应用程序初始水合期间为未水合路由进行渲染。</p><blockquote><p>NOTE</p><p>如果您不想指定 React 元素（即 <code>hydrateFallbackElement={&lt;MyFallback /&gt;}</code> ），您可以指定一个 <code>HydrateFallback</code> 组件（即 <code>HydrateFallback={MyFallback}</code> ），React 路由器将在内部为您调用 <code>createElement</code> 。</p></blockquote><blockquote><p>IMPORTANT</p><p>此功能只有在使用数据路由时才有效，请参阅 <a href="./../routers/picking-a-router">选择路由</a>。</p></blockquote><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> router </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBrowserRouter</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      id: </span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      path: </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      loader: rootLoader,</span></span>
<span class="line"><span style="color:#E1E4E8;">      Component: Root,</span></span>
<span class="line"><span style="color:#E1E4E8;">      children: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          id: </span><span style="color:#9ECBFF;">&quot;invoice&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          path: </span><span style="color:#9ECBFF;">&quot;invoices/:id&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          loader: loadInvoice,</span></span>
<span class="line"><span style="color:#E1E4E8;">          Component: Invoice,</span></span>
<span class="line"><span style="color:#E1E4E8;">          HydrateFallback: InvoiceSkeleton,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    future: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      v7_partialHydration: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    hydrationData: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      root: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/*...*/</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// No hydration data provided for the \`invoice\` route</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> router </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBrowserRouter</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      id: </span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      path: </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      loader: rootLoader,</span></span>
<span class="line"><span style="color:#24292E;">      Component: Root,</span></span>
<span class="line"><span style="color:#24292E;">      children: [</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          id: </span><span style="color:#032F62;">&quot;invoice&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          path: </span><span style="color:#032F62;">&quot;invoices/:id&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          loader: loadInvoice,</span></span>
<span class="line"><span style="color:#24292E;">          Component: Invoice,</span></span>
<span class="line"><span style="color:#24292E;">          HydrateFallback: InvoiceSkeleton,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    future: {</span></span>
<span class="line"><span style="color:#24292E;">      v7_partialHydration: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    hydrationData: {</span></span>
<span class="line"><span style="color:#24292E;">      root: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/*...*/</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// No hydration data provided for the \`invoice\` route</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><p>没有默认的<code>fallback</code>，它只会在该路由级别呈现 <code>null</code> ，因此建议您始终提供自己的 <code>fallback</code> 元素。</p>`,6),e=[o];function t(c,r,E,i,y,d){return a(),n("div",null,e)}const k=s(p,[["render",t]]);export{h as __pageData,k as default};
