import{_ as s,o,c as e,Q as a}from"./chunks/framework.6f0990a9.js";const h=JSON.parse('{"title":"useHref","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/use-href.md","filePath":"hooks/use-href.md","lastUpdated":1704271911000}'),n={name:"hooks/use-href.md"},p=a(`<h1 id="usehref" tabindex="-1"><code>useHref</code> <a class="header-anchor" href="#usehref" aria-label="Permalink to &quot;\`useHref\`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useHref</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">to</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">To</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> { </span><span style="color:#FFAB70;">relative</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RelativeRoutingType</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useHref</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">to</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">To</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">options</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> { </span><span style="color:#E36209;">relative</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RelativeRoutingType</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span></code></pre></div><p><code>useHref</code> 钩子会返回一个 URL，可用于链接到给定的 <code>to</code> 位置，即使在 React Router 之外也是如此。</p><blockquote><p><strong>NOTE</strong></p><p>您可能有兴趣看看 <code>react-router-dom</code> 中 <code>&lt;Link&gt;</code> 组件的源代码，看看它是如何在内部使用 <code>useHref</code> 来确定自己的 <code>href</code> 值的。</p></blockquote><blockquote><p><strong>NOTE</strong></p><p>请参阅 <code>useResolvedPath</code> 文档中的 <a href="./../hooks/use-resolved-path#splat-paths">Splat Paths</a> 部分，了解 <code>future.v7_relativeSplatPath</code> future 标志在 <code>splat</code> 路由中相对 <code>useHref()</code> 的行为。</p></blockquote>`,6),l=[p];function t(c,r,E,d,y,i){return o(),e("div",null,l)}const f=s(n,[["render",t]]);export{h as __pageData,f as default};