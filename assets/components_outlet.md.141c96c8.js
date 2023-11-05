import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.0e8ae64e.js";const d=JSON.parse('{"title":"<Outlet>","description":"","frontmatter":{},"headers":[],"relativePath":"components/outlet.md","filePath":"components/outlet.md","lastUpdated":1699184691000}'),p={name:"components/outlet.md"},o=l(`<h1 id="outlet" tabindex="-1"><code>&lt;Outlet&gt;</code> <a class="header-anchor" href="#outlet" aria-label="Permalink to &quot;\`&lt;Outlet&gt;\`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">OutletProps</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">context</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">unknown</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Outlet</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">OutletProps</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ReactElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">OutletProps</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">context</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">unknown</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Outlet</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">OutletProps</span></span>
<span class="line"><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">ReactElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span></code></pre></div><p>父路由元素中应使用 <code>&lt;Outlet&gt;</code> 来呈现其子路由元素。这样就可以在呈现子路由时显示嵌套用户界面。如果父路由完全匹配，则会呈现子索引路由；如果没有索引路由，则不会呈现任何内容。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dashboard</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;Dashboard&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      {</span><span style="color:#6A737D;">/* This element will render either &lt;DashboardMessages&gt; when the URL is</span></span>
<span class="line"><span style="color:#6A737D;">          &quot;/messages&quot;, &lt;DashboardTasks&gt; at &quot;/tasks&quot;, or null if it is &quot;/&quot;</span></span>
<span class="line"><span style="color:#6A737D;">      */</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Outlet</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Routes</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">Dashboard</span><span style="color:#E1E4E8;"> /&gt;}&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;messages&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">DashboardMessages</span><span style="color:#E1E4E8;"> /&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">        /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;tasks&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">DashboardTasks</span><span style="color:#E1E4E8;"> /&gt;} /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Routes</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dashboard</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;Dashboard&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      {</span><span style="color:#6A737D;">/* This element will render either &lt;DashboardMessages&gt; when the URL is</span></span>
<span class="line"><span style="color:#6A737D;">          &quot;/messages&quot;, &lt;DashboardTasks&gt; at &quot;/tasks&quot;, or null if it is &quot;/&quot;</span></span>
<span class="line"><span style="color:#6A737D;">      */</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Outlet</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Routes</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">Dashboard</span><span style="color:#24292E;"> /&gt;}&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;messages&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">DashboardMessages</span><span style="color:#24292E;"> /&gt;}</span></span>
<span class="line"><span style="color:#24292E;">        /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;tasks&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">DashboardTasks</span><span style="color:#24292E;"> /&gt;} /&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Routes</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,5),t=[o];function e(c,r,E,y,i,u){return n(),a("div",null,t)}const g=s(p,[["render",e]]);export{d as __pageData,g as default};
