import{_ as s,o as a,c as n,Q as o}from"./chunks/framework.6f0990a9.js";const v=JSON.parse('{"title":"<NativeRouter>","description":"","frontmatter":{},"headers":[],"relativePath":"router-components/native-router.md","filePath":"router-components/native-router.md","lastUpdated":1699184954000}'),p={name:"router-components/native-router.md"},l=o(`<h1 id="nativerouter" tabindex="-1"><code>&lt;NativeRouter&gt;</code> <a class="header-anchor" href="#nativerouter" aria-label="Permalink to &quot;\`&lt;NativeRouter&gt;\`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NativeRouter</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NativeRouterProps</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ReactElement</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NativeRouterProps</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MemoryRouterProps</span><span style="color:#E1E4E8;"> {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NativeRouter</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NativeRouterProps</span></span>
<span class="line"><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">ReactElement</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NativeRouterProps</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MemoryRouterProps</span><span style="color:#24292E;"> {}</span></span></code></pre></div><p><code>&lt;NativeRouter&gt;</code>是在 <a href="https://reactnative.dev/" target="_blank" rel="noreferrer">React Native</a> 应用程序中运行 React Router 的推荐接口。</p><ul><li><code>&lt;NativeRouter initialEntries&gt;</code>默认为<code>[&quot;/&quot;]</code>（在根<code>/</code>URL 中的单个条目）</li><li><code>&lt;NativeRouter initialIndex&gt;</code>默认为<code>initialEntries</code>最后一个索引</li></ul><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { NativeRouter } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-router-native&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">NativeRouter</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span><span style="color:#6A737D;">/* The rest of your app goes here */</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">NativeRouter</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { NativeRouter } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-router-native&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">NativeRouter</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      {</span><span style="color:#6A737D;">/* The rest of your app goes here */</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">NativeRouter</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,6),e=[l];function t(r,c,E,y,i,u){return a(),n("div",null,e)}const F=s(p,[["render",t]]);export{v as __pageData,F as default};