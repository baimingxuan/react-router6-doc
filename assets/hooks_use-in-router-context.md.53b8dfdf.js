import{_ as e,o,c as s,Q as t}from"./chunks/framework.0e8ae64e.js";const E=JSON.parse('{"title":"useInRouterContext","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/use-in-router-context.md","filePath":"hooks/use-in-router-context.md","lastUpdated":1699184691000}'),n={name:"hooks/use-in-router-context.md"},a=t('<h1 id="useinroutercontext" tabindex="-1"><code>useInRouterContext</code> <a class="header-anchor" href="#useinroutercontext" aria-label="Permalink to &quot;`useInRouterContext`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useInRouterContext</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useInRouterContext</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">;</span></span></code></pre></div><p>如果组件是在 <code>&lt;Router&gt;</code> 的上下文中呈现，则 <code>useInRouterContext</code> 钩子返回 <code>true</code> ，否则返回 <code>false</code> 。这对某些需要知道自己是否在 React Router 应用程序上下文中呈现的第三方扩展很有用。</p>',4),c=[a];function l(p,r,d,u,i,_){return o(),s("div",null,c)}const h=e(n,[["render",l]]);export{E as __pageData,h as default};
