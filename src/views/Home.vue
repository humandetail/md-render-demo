<template>
<section class="article-wrapper">
  <div class="content hd__content" v-md="sourceText + '\n\n[TOC]'" ref="content"></div>
  <div class="outline hd__outline">
    <div class="outline-container" ref="outline"></div>
  </div>
</section>
</template>

<script>
import axios from 'axios';
import 'highlight.js/styles/github.css';

import {
  getElementDocPosition,
  getScrollOffset,
  getScrollSize,
  getViewportSize,
  removeClass,
  addClass
} from '@/utils/tools';

export default {
  data () {
    return {
      sourceText: '',
      pageHeight: 0, // 文档的高度
      viewportHeight: 0, // 可视窗口的高度
      outlineNavHeight: 0, // 目录列表的高度
      TOC_Anchors: [], // 目录的a标签组成的数组
      headersPosition: [], // Array<[id, top, anchor]>
    }
  },
  methods: {
    async getContent () {
      let sourceText = '';

      try {
        sourceText = localStorage.getItem('mdSourceText');
      } catch {}

      if (sourceText) {
        this.sourceText = sourceText;
        return;
      }
      // https://api.humandetail.com/blog/getArticleDetail?unique_key=3281201cd395e156300e07e7e6e0cd5e
      const res = await axios.get('https://api.humandetail.com/blog/getArticleDetail?unique_key=3281201cd395e156300e07e7e6e0cd5e');

      const {
        err_code,
        data
      } = res.data;

      if (err_code === 0) {
        sourceText = data.articleInfo.content;
        localStorage.setItem('mdSourceText', sourceText);
        this.sourceText = sourceText;
        // console.log(marked(this.sourceText))
      } else {
        this.sourceText = '';
      }

    },

    createTOC () {
      const oContent = this.$refs.content,
            oTOC = oContent.getElementsByClassName('table-of-contents')[0],
            oOutline = this.$refs.outline;
            
      oOutline.appendChild(oTOC)

      this.TOC_Anchors = Array.prototype.slice.call(oOutline.querySelectorAll('a'));
    },

    // 获取所有标题的位置
    getHeaderPosition () {
      const oContent = this.$refs.content,
            oHeaders = Array.prototype.slice.call(oContent.querySelectorAll('h1, h2, h3, h4, h5, h6')),
            headersLength = oHeaders.length;
      
      // const oOutline = this.$refs.outline,
      //       oAnchors = Array.prototype.slice.call(oOutline.querySelectorAll('a'));
      const oAnchors = this.TOC_Anchors;

      let header,
          anchor,
          id,
          top;

      for (let i = 0; i < headersLength; i ++) {
        header = oHeaders[i];
        anchor = oAnchors[i];
        id = header.id;

        try {
          ({ top } = getElementDocPosition(header));
          this.headersPosition.push([id, top, anchor]);
        } catch {}

        // pos = getElementDocPosition(header);

        // console.log(anchor, id, pos);

      }
    },

    handleScroll () {
      const { top } = getScrollOffset();

      let pageHeight = this.pageHeight,
          viewportHeight = this.viewportHeight;

      if (pageHeight <= 0) {
        ({ height: pageHeight } = getScrollSize());
        this.pageHeight = pageHeight;
      }

      if (viewportHeight <= 0) {
        ({ height: viewportHeight } = getViewportSize());
        this.viewportHeight = viewportHeight;
      }

      const oOutlineNav = this.$refs.outline.querySelector('nav'), // eslint-disable-line no-unused-vars
            oAnchors = this.TOC_Anchors,
            headersPosition = this.headersPosition,
            len = headersPosition.length;

      let anchor,
          headerTop;
          
      // 获取outlineNav的高度
      let outlineNavHeight = this.outlineNavHeight;

      if (outlineNavHeight <= 0) {
        outlineNavHeight = parseInt(window.getComputedStyle(oOutlineNav)['height'])
        this.outlineNavHeight = outlineNavHeight;
      }

      console.log(oOutlineNav.scrollTop, outlineNavHeight, viewportHeight)

      for (let i = 0; i < len; i ++) {
        ([, headerTop, anchor] = headersPosition[i]);
        if (top > headerTop - 100 || pageHeight === top + viewportHeight) {
          removeClass(oAnchors, 'active');
          addClass(anchor, 'active');

          // ({ top: activeAnchorTop } = getElementDocPosition(anchor))

          // 当目录列表的高度大于屏幕的高度时
          // 设置目录的滚动条跟随屏幕滚动条滚动
          if (outlineNavHeight > viewportHeight) {
            oOutlineNav.parentNode.scrollTop = top / (pageHeight / outlineNavHeight)
          }
        }
      }
    }
  },
  async mounted () {
    await this.getContent();
    await this.$nextTick();
    await this.createTOC()
    await this.$nextTick();
    await this.getHeaderPosition(); // 获取所有标题的位置

    this.$_handleScroll = this.handleScroll.bind(this);

    document.addEventListener('scroll', this.$_handleScroll, false);
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.$_handleScroll, false);
  }
}
</script>

<style lang="scss">
@import '~@/assets/hd__content.scss';
@import '~@/assets/hd__outline.scss';

.article-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  padding: 30px 0;
  margin: 0 auto;

  .content {
    width: 900px;
    padding: 0 20px;

    @media screen and (max-width: 1200px) {
      width: calc(100% - 300px);
    }

    @media screen and (max-width: 640px) {
      width: 100%;
    }
  }
}
</style>