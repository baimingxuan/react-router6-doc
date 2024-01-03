import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.6f0990a9.js";const u=JSON.parse('{"title":"useLinkClickHandler","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/use-link-click-handler.md","filePath":"hooks/use-link-click-handler.md","lastUpdated":1704271911000}'),p={name:"hooks/use-link-click-handler.md"},o=l(`<h1 id="uselinkclickhandler" tabindex="-1"><code>useLinkClickHandler</code> <a class="header-anchor" href="#uselinkclickhandler" aria-label="Permalink to &quot;\`useLinkClickHandler\`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useLinkClickHandler</span><span style="color:#E1E4E8;">&lt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">E</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Element</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLAnchorElement</span></span>
<span class="line"><span style="color:#E1E4E8;">&gt;(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">to</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">To</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">target</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">HTMLAttributeAnchorTarget</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">replace</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">state</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> { </span><span style="color:#FFAB70;">relative</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RelativeRoutingType</span><span style="color:#E1E4E8;"> };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">MouseEvent</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">E</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">MouseEvent</span><span style="color:#E1E4E8;">&gt;) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useLinkClickHandler</span><span style="color:#24292E;">&lt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">E</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Element</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLAnchorElement</span></span>
<span class="line"><span style="color:#24292E;">&gt;(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">to</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">To</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">options</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">target</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">HTMLAttributeAnchorTarget</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">replace</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">state</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">options</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> { </span><span style="color:#E36209;">relative</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RelativeRoutingType</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">MouseEvent</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">E</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">MouseEvent</span><span style="color:#24292E;">&gt;) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">;</span></span></code></pre></div><p>在 <code>react-router-dom</code> 中创建自定义 <code>&lt;Link&gt;</code> 时， <code>useLinkClickHandler</code> 钩子会返回一个用于导航的点击事件处理程序。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  useHref,</span></span>
<span class="line"><span style="color:#E1E4E8;">  useLinkClickHandler,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-router-dom&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StyledLink</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">styled</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;">, { color: </span><span style="color:#9ECBFF;">&quot;fuchsia&quot;</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Link</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> React.</span><span style="color:#B392F0;">forwardRef</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      onClick,</span></span>
<span class="line"><span style="color:#E1E4E8;">      replace </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      state,</span></span>
<span class="line"><span style="color:#E1E4E8;">      target,</span></span>
<span class="line"><span style="color:#E1E4E8;">      to,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">rest</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    ref</span></span>
<span class="line"><span style="color:#E1E4E8;">  ) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> href </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useHref</span><span style="color:#E1E4E8;">(to);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> handleClick </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useLinkClickHandler</span><span style="color:#E1E4E8;">(to, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      replace,</span></span>
<span class="line"><span style="color:#E1E4E8;">      state,</span></span>
<span class="line"><span style="color:#E1E4E8;">      target,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#79B8FF;">StyledLink</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">rest}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">href</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{href}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{(</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">onClick</span><span style="color:#E1E4E8;">?.(event);</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">event.defaultPrevented) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">handleClick</span><span style="color:#E1E4E8;">(event);</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{ref}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">target</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{target}</span></span>
<span class="line"><span style="color:#E1E4E8;">      /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  useHref,</span></span>
<span class="line"><span style="color:#24292E;">  useLinkClickHandler,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-router-dom&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StyledLink</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">styled</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;">, { color: </span><span style="color:#032F62;">&quot;fuchsia&quot;</span><span style="color:#24292E;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Link</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> React.</span><span style="color:#6F42C1;">forwardRef</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  (</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      onClick,</span></span>
<span class="line"><span style="color:#24292E;">      replace </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      state,</span></span>
<span class="line"><span style="color:#24292E;">      target,</span></span>
<span class="line"><span style="color:#24292E;">      to,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">rest</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    ref</span></span>
<span class="line"><span style="color:#24292E;">  ) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> href </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useHref</span><span style="color:#24292E;">(to);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> handleClick </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useLinkClickHandler</span><span style="color:#24292E;">(to, {</span></span>
<span class="line"><span style="color:#24292E;">      replace,</span></span>
<span class="line"><span style="color:#24292E;">      state,</span></span>
<span class="line"><span style="color:#24292E;">      target,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#005CC5;">StyledLink</span></span>
<span class="line"><span style="color:#24292E;">        {</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">rest}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">href</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{href}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{(</span><span style="color:#E36209;">event</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">onClick</span><span style="color:#24292E;">?.(event);</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">event.defaultPrevented) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">handleClick</span><span style="color:#24292E;">(event);</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{ref}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">target</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{target}</span></span>
<span class="line"><span style="color:#24292E;">      /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div>`,5),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const C=s(p,[["render",c]]);export{u as __pageData,C as default};
