import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.0e8ae64e.js";const d=JSON.parse('{"title":"useParams","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/use-params.md","filePath":"hooks/use-params.md","lastUpdated":1699184691000}'),p={name:"hooks/use-params.md"},o=l(`<h1 id="useparams" tabindex="-1"><code>useParams</code> <a class="header-anchor" href="#useparams" aria-label="Permalink to &quot;\`useParams\`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useParams</span><span style="color:#E1E4E8;">&lt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">K</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">&gt;()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Readonly</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Params</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">K</span><span style="color:#E1E4E8;">&gt;&gt;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useParams</span><span style="color:#24292E;">&lt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">K</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">&gt;()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Readonly</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Params</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">K</span><span style="color:#24292E;">&gt;&gt;;</span></span></code></pre></div><p><code>useParams</code> 钩子会返回一个由 <code>&lt;Route path&gt;</code> 匹配的当前 URL 动态参数的键/值对组成的对象。子路由继承父路由的所有参数。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Routes, Route, useParams } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react-router-dom&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ProfilePage</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Get the userId param from the URL.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> { userId } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useParams</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Routes</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;users&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;:userId&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">ProfilePage</span><span style="color:#E1E4E8;"> /&gt;} /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;me&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">} /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Routes</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Routes, Route, useParams } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react-router-dom&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ProfilePage</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Get the userId param from the URL.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> { userId } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useParams</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Routes</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;users&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;:userId&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">ProfilePage</span><span style="color:#24292E;"> /&gt;} /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;me&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">} /&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Routes</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,5),e=[o];function t(c,r,E,y,i,F){return a(),n("div",null,e)}const m=s(p,[["render",t]]);export{d as __pageData,m as default};
