import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.6f0990a9.js";const d=JSON.parse('{"title":"shouldRevalidate","description":"","frontmatter":{},"headers":[],"relativePath":"route/should-revalidate.md","filePath":"route/should-revalidate.md","lastUpdated":1704271911000}'),o={name:"route/should-revalidate.md"},p=l(`<h1 id="shouldrevalidate" tabindex="-1"><code>shouldRevalidate</code> <a class="header-anchor" href="#shouldrevalidate" aria-label="Permalink to &quot;\`shouldRevalidate\`&quot;">​</a></h1><p>类型声明</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ShouldRevalidateFunction</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#FFAB70;">args</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ShouldRevalidateFunctionArgs</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ShouldRevalidateFunctionArgs</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">currentUrl</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">URL</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">currentParams</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AgnosticDataRouteMatch</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;params&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">nextUrl</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">URL</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">nextParams</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AgnosticDataRouteMatch</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;params&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">formMethod</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Submission</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;formMethod&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">formAction</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Submission</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;formAction&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">formEncType</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Submission</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;formEncType&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">text</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Submission</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">formData</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Submission</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;formData&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">json</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Submission</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&quot;json&quot;</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">actionResult</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">defaultShouldRevalidate</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ShouldRevalidateFunction</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#E36209;">args</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ShouldRevalidateFunctionArgs</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ShouldRevalidateFunctionArgs</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">currentUrl</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">URL</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">currentParams</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AgnosticDataRouteMatch</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;params&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">nextUrl</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">URL</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">nextParams</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AgnosticDataRouteMatch</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;params&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">formMethod</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Submission</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;formMethod&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">formAction</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Submission</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;formAction&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">formEncType</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Submission</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;formEncType&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">text</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Submission</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">formData</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Submission</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;formData&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">json</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Submission</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&quot;json&quot;</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">actionResult</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">defaultShouldRevalidate</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>通过此功能，您可以选择不对路由的<a href="./../route/loader"><code>loader</code></a>进行重新验证，以优化其性能。</p><blockquote><p>IMPORTANT</p><p>此功能只有在使用数据路由器时才有效，请参阅<a href="./../routers/picking-a-router">&quot;选择路由&quot;</a>。</p></blockquote><p>有几种情况下，数据会被重新验证，从而使用户界面与数据自动保持同步：</p><ul><li>从<a href="./../components/form"><code>Form</code></a>调用<a href="./../route/action"><code>action</code></a>后</li><li>从<a href="./../hooks/use-fetcher"><code>&lt;fetcher.Form&gt;</code></a>调用<a href="./../route/action"><code>action</code></a>后</li><li>从<a href="./../hooks/use-submit"><code>useSubmit</code></a>调用<a href="./../route/action"><code>action</code></a>后</li><li>从<a href="./../hooks/use-fetcher"><code>fetcher.submit</code></a>调用<a href="./../route/action"><code>action</code></a>后</li><li>当通过 <code>useRevalidator</code>触发显式重新验证时</li><li>当已渲染路由的<a href="./../route/route#dynamic-segments">URL 参数</a>更改时</li><li>当 URL 搜索参数更改时</li><li>当导航到与当前 URL 相同的 URL 时</li></ul><p>如果在路由上定义了 <code>shouldRevalidate</code> ，那么在调用路由<code>loader</code>获取新数据前，会首先检查该函数。如果函数返回 <code>false</code> ，则<em>不会</em>调用<code>loader</code>，页面上将保留该<code>loader</code>的现有数据。</p><blockquote><p>NOTE</p><p>Fetcher 加载也会重新验证，但由于它们加载的是特定 URL，因此不必担心上述 URL 驱动的重新验证情况。Fetcher 载入默认只在提交操作和明确的重新验证请求后重新验证。</p></blockquote><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">Route</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;meals-plans&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">MealPlans</span><span style="color:#E1E4E8;"> /&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">loader</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{loadMealPlans}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">shouldRevalidate</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{({ </span><span style="color:#FFAB70;">currentUrl</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// only revalidate if the submission originates from</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// the \`/meal-plans/new\` route.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> currentUrl.pathname </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/meal-plans/new&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }}</span></span>
<span class="line"><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">Route</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;new&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">NewMealPlanForm</span><span style="color:#E1E4E8;"> /&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// \`loadMealPlans\` will be revalidated after</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// this action...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">action</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{createMealPlan}</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">Route</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;:planId/meal&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">element</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{&lt;</span><span style="color:#79B8FF;">Meal</span><span style="color:#E1E4E8;"> /&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...but not this one because origin the URL</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// is not &quot;/meal-plans/new&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">action</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{updateMeal}</span></span>
<span class="line"><span style="color:#E1E4E8;">  /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#79B8FF;">Route</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">Route</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;meals-plans&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">MealPlans</span><span style="color:#24292E;"> /&gt;}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">loader</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{loadMealPlans}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">shouldRevalidate</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{({ </span><span style="color:#E36209;">currentUrl</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// only revalidate if the submission originates from</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// the \`/meal-plans/new\` route.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> currentUrl.pathname </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/meal-plans/new&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }}</span></span>
<span class="line"><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">Route</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;new&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">NewMealPlanForm</span><span style="color:#24292E;"> /&gt;}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// \`loadMealPlans\` will be revalidated after</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// this action...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">action</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{createMealPlan}</span></span>
<span class="line"><span style="color:#24292E;">  /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">Route</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;:planId/meal&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">element</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{&lt;</span><span style="color:#005CC5;">Meal</span><span style="color:#24292E;"> /&gt;}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...but not this one because origin the URL</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// is not &quot;/meal-plans/new&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">action</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{updateMeal}</span></span>
<span class="line"><span style="color:#24292E;">  /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#005CC5;">Route</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>请注意，这仅适用于已加载、当前已呈现并将继续在新 URL 上呈现的数据。新 URL 上的新路由和获取器的数据将始终在初始时获取。</p><blockquote><p>IMPORTANT</p><p>使用此 API 有可能导致用户界面与数据不同步，请谨慎使用！</p></blockquote><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2>`,13),e=[p];function t(c,r,E,y,i,u){return a(),n("div",null,e)}const h=s(o,[["render",t]]);export{d as __pageData,h as default};