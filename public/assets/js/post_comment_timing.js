class PostCommentTime{constructor(o){this.getTimeAgo(o)}getTimeAgo(o){const t=new Date,e=new Date(o),a=t-e,r=Math.floor(a/1e3),n=Math.floor(r/60),s=Math.floor(n/60),g=Math.floor(s/24);return g>1?e.toDateString():1===g?"Yesterday":s>=1?1===s?"1 hour ago":`${s} hours ago`:n>=1?1===n?"1 minute ago":`${n} minutes ago`:"Just now"}}
//# sourceMappingURL=post_comment_timing.js.map
