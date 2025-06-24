<template>
  <div v-html="renderedHtml" class="markdown-body" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// ✅ 正确调用 defineProps（只能调用一次）
const props = defineProps<{
  markdown: string
}>()

// 配置 markdown-it 和代码高亮
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(code, { language: lang }).value}</code></pre>`
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`
  },
})

// 将 markdown 渲染为 HTML
const renderedHtml = computed(() => md.render(props.markdown))
</script>

<style scoped>
.markdown-body {
  /* font-family: 'Arial', sans-serif; */
  line-height: 1.6;
  /* font-size: 0.875rem; */
  color: #333;
  word-wrap: break-word;
}

.markdown-body pre {
  background-color: #f6f8fa;
  padding: 0.5rem;
  border-radius: 0.375rem;
  overflow-x: auto;
}

.markdown-body code {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
}
</style>
