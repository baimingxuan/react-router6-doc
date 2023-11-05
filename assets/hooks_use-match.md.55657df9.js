import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.0e8ae64e.js";const F=JSON.parse('{"title":"useMatch","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/use-match.md","filePath":"hooks/use-match.md","lastUpdated":1699184691000}'),p={name:"hooks/use-match.md"},o=l(`<h1 id="usematch" tabindex="-1"><code>useMatch</code> <a class="header-anchor" href="#usematch" aria-label="Permalink to &quot;\`useMatch\`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMatch</span><span style="color:#E1E4E8;">&lt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">ParamKey</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ParamParseKey</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Path</span><span style="color:#E1E4E8;">&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">&gt;(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PathPattern</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Path</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Path</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PathMatch</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">ParamKey</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMatch</span><span style="color:#24292E;">&lt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">ParamKey</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ParamParseKey</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Path</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">&gt;(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">pattern</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PathPattern</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Path</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Path</span></span>
<span class="line"><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PathMatch</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">ParamKey</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span></code></pre></div><p>返回给定路径上的路由相对于当前位置的匹配数据。</p><p>更多信息，请参阅<a href="https://baimingxuan.github.io/react-router6-doc/utils/match-path" target="_blank" rel="noreferrer"><code>matchPath</code></a>。</p>`,5),t=[o];function e(c,r,y,E,h,i){return a(),n("div",null,t)}const u=s(p,[["render",e]]);export{F as __pageData,u as default};
