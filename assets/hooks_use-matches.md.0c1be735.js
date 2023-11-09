import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.6f0990a9.js";const u=JSON.parse('{"title":"useMatches","description":"","frontmatter":{},"headers":[],"relativePath":"hooks/use-matches.md","filePath":"hooks/use-matches.md","lastUpdated":1699498063000}'),p={name:"hooks/use-matches.md"},o=l(`<h1 id="usematches" tabindex="-1"><code>useMatches</code> <a class="header-anchor" href="#usematches" aria-label="Permalink to &quot;\`useMatches\`&quot;">​</a></h1><p>返回页面上匹配的当前路由。这对于在父布局中创建抽象布局以访问子路由数据非常有用。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useMatches } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-router-dom&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SomeComponent</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">matches</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMatches</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// [match1, match2, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useMatches } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-router-dom&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SomeComponent</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">matches</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMatches</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// [match1, match2, ...]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>match</code> 的形状如下：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// route id</span></span>
<span class="line"><span style="color:#E1E4E8;">  id,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// the portion of the URL the route matched</span></span>
<span class="line"><span style="color:#E1E4E8;">  pathname,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// the data from the loader</span></span>
<span class="line"><span style="color:#E1E4E8;">  data,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// the parsed params from the URL</span></span>
<span class="line"><span style="color:#E1E4E8;">  params,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// the &lt;Route handle&gt; with any app specific data</span></span>
<span class="line"><span style="color:#E1E4E8;">  handle,</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// route id</span></span>
<span class="line"><span style="color:#24292E;">  id,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// the portion of the URL the route matched</span></span>
<span class="line"><span style="color:#24292E;">  pathname,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// the data from the loader</span></span>
<span class="line"><span style="color:#24292E;">  data,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// the parsed params from the URL</span></span>
<span class="line"><span style="color:#24292E;">  params,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// the &lt;Route handle&gt; with any app specific data</span></span>
<span class="line"><span style="color:#24292E;">  handle,</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>将 <code>&lt;Route handle&gt;</code> 与 <code>useMatches</code> 配对后，功能会变得非常强大，因为您可以将任何想要的东西放在 <code>handle</code> 路由上，并在任何地方访问 <code>useMatches</code> 。</p><p><code>useMatches</code> 只适用于<a href="https://baimingxuan.github.io/react-router6-doc/routers/create-browser-router" target="_blank" rel="noreferrer"><code>createBrowserRouter</code></a>这样的数据路由，因为它们预先知道完整的路由树，可以提供所有当前匹配结果。此外， <code>useMatches</code> 不会向下匹配到任何子路由树，因为路由器不知道子路由。</p><h2 id="面包屑" tabindex="-1">面包屑 <a class="header-anchor" href="#面包屑" aria-label="Permalink to &quot;面包屑&quot;">​</a></h2><p>众所周知，这里的用例是将面包屑添加到使用子路由数据的父布局中。</p><p><code>app.jsx</code></p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">Root</span><span style="color:#E1E4E8;"> /&gt;}&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">Route</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;messages&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">Messages</span><span style="color:#E1E4E8;"> /&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">loader</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{loadMessages}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">handle</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// you can put whatever you want on a route handle</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// here we use &quot;crumb&quot; and return some elements,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// this is what we&#39;ll render in the breadcrumbs</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// for this route</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">crumb</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#79B8FF;">Link</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">to</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/messages&quot;</span><span style="color:#E1E4E8;">&gt;Messages&lt;/</span><span style="color:#79B8FF;">Link</span><span style="color:#E1E4E8;">&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Route</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;conversation/:id&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">Thread</span><span style="color:#E1E4E8;"> /&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">loader</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{loadThread}</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">handle</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// \`crumb\` is your own abstraction, we decided</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// to make this one a function so we can pass</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// the data from the loader to it so that our</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// breadcrumb is made up of dynamic content</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">crumb</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;{data.threadName}&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">      }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">Root</span><span style="color:#24292E;"> /&gt;}&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">Route</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;messages&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">Messages</span><span style="color:#24292E;"> /&gt;}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">loader</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{loadMessages}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">handle</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// you can put whatever you want on a route handle</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// here we use &quot;crumb&quot; and return some elements,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// this is what we&#39;ll render in the breadcrumbs</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// for this route</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">crumb</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> &lt;</span><span style="color:#005CC5;">Link</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">to</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/messages&quot;</span><span style="color:#24292E;">&gt;Messages&lt;/</span><span style="color:#005CC5;">Link</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"><span style="color:#24292E;">    }}</span></span>
<span class="line"><span style="color:#24292E;">  &gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Route</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;conversation/:id&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">Thread</span><span style="color:#24292E;"> /&gt;}</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">loader</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{loadThread}</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">handle</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// \`crumb\` is your own abstraction, we decided</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// to make this one a function so we can pass</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// the data from the loader to it so that our</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// breadcrumb is made up of dynamic content</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">crumb</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">data</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;{data.threadName}&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"><span style="color:#24292E;">      }}</span></span>
<span class="line"><span style="color:#24292E;">    /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>现在，我们可以使用 <code>useMatches</code> 和 <code>handle</code> 来创建一个利用我们自定义 <code>crumb</code> 抽象的 <code>Breadcrumbs</code> 组件。</p><p><code>components/breadcrumbs.jsx</code></p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Breadcrumbs</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> matches </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMatches</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> crumbs </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> matches</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// first get rid of any matches that don&#39;t have handle and crumb</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">match</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(match.handle?.crumb))</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// now map them into an array of elements, passing the loader</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// data to each one</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">match</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> match.handle.</span><span style="color:#B392F0;">crumb</span><span style="color:#E1E4E8;">(match.data));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">ol</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      {crumbs.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">crumb</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">li</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">key</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{index}&gt;{crumb}&lt;/</span><span style="color:#85E89D;">li</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      ))}</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">ol</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Breadcrumbs</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> matches </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMatches</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> crumbs </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> matches</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// first get rid of any matches that don&#39;t have handle and crumb</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">((</span><span style="color:#E36209;">match</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(match.handle?.crumb))</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// now map them into an array of elements, passing the loader</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// data to each one</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">match</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> match.handle.</span><span style="color:#6F42C1;">crumb</span><span style="color:#24292E;">(match.data));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">ol</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      {crumbs.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">crumb</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">li</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">key</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{index}&gt;{crumb}&lt;/</span><span style="color:#22863A;">li</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      ))}</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">ol</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>现在，您可以在任何地方呈现 <code>&lt;Breadcrumbs/&gt;</code> ，可能是在根组件中。</p>`,15),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
