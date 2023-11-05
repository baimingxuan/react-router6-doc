import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.0e8ae64e.js";const d=JSON.parse('{"title":"unstable_useViewTransitionState","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/use-view-transition-state.md","filePath":"hooks/use-view-transition-state.md","lastUpdated":1699184691000}'),p={name:"hooks/use-view-transition-state.md"},o=l(`<h1 id="unstable-useviewtransitionstate" tabindex="-1"><code>unstable_useViewTransitionState</code> <a class="header-anchor" href="#unstable-useviewtransitionstate" aria-label="Permalink to &quot;\`unstable_useViewTransitionState\`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">unstable_useViewTransitionState</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">to</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">To</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">opts</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> { </span><span style="color:#FFAB70;">relative</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;route&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;path&quot;</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">To</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Partial</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Path</span><span style="color:#E1E4E8;">&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Path</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">pathname</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">search</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">hash</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">unstable_useViewTransitionState</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">to</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">To</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">opts</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> { </span><span style="color:#E36209;">relative</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;route&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;path&quot;</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">To</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Partial</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Path</span><span style="color:#24292E;">&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Path</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">pathname</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">search</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">hash</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>当指定位置有活动<a href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API" target="_blank" rel="noreferrer">视图转换</a>时，此钩子会返回 <code>true</code> 。这可用于对元素应用更精细的样式，以进一步自定义视图转换。这要求通过 <code>Link</code> （或 <code>Form</code> , <code>navigate</code> 或 <code>submit</code> 调用）上的<a href="https://baimingxuan.github.io/react-router6-doc/components/link#unstable_viewtransition" target="_blank" rel="noreferrer"> unstable_viewTransition prop </a>启用指定导航的视图转换。</p><p>考虑点击列表中的图片，将其扩展为目标页面上的主图片：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NavImage</span><span style="color:#E1E4E8;">({ </span><span style="color:#FFAB70;">src</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">alt</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> to </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`/images/\${</span><span style="color:#E1E4E8;">idx</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> vt </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">unstable_useViewTransitionState</span><span style="color:#E1E4E8;">(href);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Link</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">to</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{to} </span><span style="color:#B392F0;">unstable_viewTransition</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">img</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">src</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{src}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">alt</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{alt}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">style</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{{</span></span>
<span class="line"><span style="color:#E1E4E8;">          viewTransitionName: vt </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;image-expand&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }}</span></span>
<span class="line"><span style="color:#E1E4E8;">      /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">Link</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NavImage</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">src</span><span style="color:#24292E;">, </span><span style="color:#E36209;">alt</span><span style="color:#24292E;">, </span><span style="color:#E36209;">id</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> to </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`/images/\${</span><span style="color:#24292E;">idx</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> vt </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">unstable_useViewTransitionState</span><span style="color:#24292E;">(href);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Link</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">to</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{to} </span><span style="color:#6F42C1;">unstable_viewTransition</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">img</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">src</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{src}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">alt</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{alt}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">style</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{{</span></span>
<span class="line"><span style="color:#24292E;">          viewTransitionName: vt </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;image-expand&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }}</span></span>
<span class="line"><span style="color:#24292E;">      /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">Link</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,6),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{d as __pageData,h as default};
