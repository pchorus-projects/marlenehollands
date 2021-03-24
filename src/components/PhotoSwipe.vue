<template>
  <div>
    <div class="gallery" itemscope itemtype="http://schema.org/ImageGallery">
      <figure
        :id="item.id"
        class="gallery-thumbnail"
        v-show="index === 0 || !singleThumbnail"
        itemprop="associatedMedia"
        itemscope
        itemtype="http://schema.org/ImageObject"
        v-for="(item, index) in items"
        :src="item.src"
        v-bind:key="index"
      >
        <a
          class="gallery-thumbnail__link"
          v-show="nbThumbnailsDisplayed === -1 || index < nbThumbnailsDisplayed"
          :href="item.src"
          itemprop="contentUrl"
          :data-size="'' + item.imageWidth + 'x' + item.imageHeight"
          :title="item.title"
        >
          <img class="gallery-thumbnail__image" :src="item.thumbnail" :alt="item.title" itemprop="thumbnail" />
          <div class="gallery-thumbnail__content">
            <p class="gallery-thumbnail__title">{{ item.title }}</p>
            <p class="gallery-thumbnail__text">
              <span> {{ item.width }} x {{ item.height }} </span>
              <a
                class="gallery-thumbnail__request-link"
                v-if="item.available"
                :href="getRequestImageHref(item)"
                @click="onRequestImageClick"
                >Anfragen</a
              >
              <span v-else>nicht verfügbar</span>
            </p>
          </div>
        </a>
      </figure>
    </div>

    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button
            class="pswp__button pswp__button--arrow--left"
            title="Previous (arrow left)"
            @click="resetAngle"
          ></button>
          <button
            class="pswp__button pswp__button--arrow--right"
            title="Next (arrow right)"
            @click="resetAngle"
          ></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    singleThumbnail: {
      type: Boolean,
      default: false,
    },
    nbThumbnailsDisplayed: {
      default: -1,
      type: Number,
    },
  },
  data() {
    return {
      pswp: null,
      angle: 0,
    };
  },
  mounted() {
    let that = this;

    let initPhotoSwipeFromDOM = function (gallerySelector) {
      // parse slide data (url, title, size ...) from DOM elements
      // (children of gallerySelector)
      let parseThumbnailElements = function (el) {
        let thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item;
        for (let i = 0; i < numNodes; i++) {
          figureEl = thumbElements[i]; // <figure> element
          // include only element nodes
          if (figureEl.nodeType !== 1) {
            continue;
          }
          linkEl = figureEl.children[0]; // <a> element
          size = linkEl.getAttribute('data-size').split('x');
          // create slide object
          item = {
            src: linkEl.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10),
            title: linkEl.getAttribute('title'),
          };
          if (figureEl.children.length > 1) {
            // <figcaption> content
            item.title = figureEl.children[1].innerHTML;
          }
          if (linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute('src');
          }
          item.el = figureEl; // save link to element for getThumbBoundsFn
          items.push(item);
        }
        return items;
      };
      // find nearest parent element
      let closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
      };
      // triggers when user clicks on thumbnail
      let onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        let eTarget = e.target || e.srcElement;
        // find root element of slide
        let clickedListItem = closest(eTarget, function (el) {
          return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
        });
        if (!clickedListItem) {
          return;
        }
        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        let clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;
        for (let i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue;
          }
          if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }
        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery);
        }
        return false;
      };
      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      let photoswipeParseHash = function () {
        let hash = window.location.hash.substring(1),
          params = {};
        if (hash.length < 5) {
          return params;
        }
        let vars = hash.split('&');
        for (let i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue;
          }
          let pair = vars[i].split('=');
          if (pair.length < 2) {
            continue;
          }
          params[pair[0]] = pair[1];
        }
        if (params.gid) {
          params.gid = parseInt(params.gid, 10);
        }
        return params;
      };
      let openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        let pswpElement = galleryElement.parentElement.querySelector('.pswp'),
          gallery,
          options,
          items;
        items = parseThumbnailElements(galleryElement);
        // define options (if needed)
        options = {
          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),
          getThumbBoundsFn: function (index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            let thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
              pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
              rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          },
        };
        // PhotoSwipe opened from URL
        if (fromURL) {
          if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (let j = 0; j < items.length; j++) {
              if (items[j].pid == index) {
                options.index = j;
                break;
              }
            }
          } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1;
          }
        } else {
          options.index = parseInt(index, 10);
        }
        // exit if index not found
        if (isNaN(options.index)) {
          return;
        }
        if (disableAnimation) {
          options.showAnimationDuration = 0;
        }

        options.addCaptionHTMLFn = function (item, captionEl /*, isFake*/) {
          const foundItem = that.items.find((curr) => curr.id === item.el.id);
          captionEl.children[0].innerHTML = `${foundItem.title}, ${foundItem.width} x ${
            foundItem.height
          }, ${that.getAvailableText(foundItem.available)}`;
          return true;
        };

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, Object.assign(options, that.options));
        gallery.listen('gettingData', function (index, item) {
          if (item.imageWidth < 1 || item.imageHeight < 1) {
            // unknown size
            let img = new Image();
            img.onload = function () {
              // will get size after load
              item.imageWidth = this.width; // set image width
              item.imageHeight = this.height; // set image height
              gallery.invalidateCurrItems(); // reinit Items
              gallery.updateSize(true); // reinit Items
            };
            img.src = item.src; // let's download image
          }
        });
        gallery.init();
        that.pswp = gallery;
        // trigger open event after swiper is opened
        that.$emit('open');
        // trigger close event after swiper is closed
        gallery.listen('destroy', () => that.$emit('close'));
      };
      // loop through all gallery elements and bind events
      let galleryElements = document.querySelectorAll(gallerySelector);
      for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
      }
      // Parse URL and open gallery if it contains #&pid=3&gid=1
      let hashData = photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
      }
    };

    initPhotoSwipeFromDOM('.gallery');
  },
  methods: {
    resetAngle() {
      this.angle = 0;
      this.$el.querySelectorAll('.pswp__img').forEach((i) => (i.style.transform = `rotate(${this.angle}deg)`));
    },
    getAvailableText(isAvailable) {
      return isAvailable ? 'verfügbar' : 'nicht verfügbar';
    },
    onRequestImageClick(event) {
      event.cancelBubble = true;
    },
    getRequestImageHref(item) {
      const email = 'marlene@4xhollands.de';
      const subject = encodeURIComponent(`Anfrage für "${item.title}"`);
      const body = encodeURIComponent(`Sehr geehrte Frau Hollands,

ich interessiere mich für das Bild "${item.title}", ${item.width} x ${item.height}.
Bitte kontaktieren Sie mich diesbezüglich.

Freundliche Grüße
`);
      return `mailto:${email}?subject=${subject}&body=${body}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.pswp__top-bar {
  text-align: right;
}
.pswp__caption__center {
  text-align: center;
}

.gallery {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
}

.gallery-thumbnail {
  margin: 0;
  position: relative;

  &:hover {
    .gallery-thumbnail__content {
      opacity: 1;
    }
  }

  &__link {
  }

  &__image {
    display: block;
    width: 100%;
    border-radius: $border-radius-small;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 0;
    transition: opacity 100ms;
    color: $font-color-white;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
    padding: $space-m;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: $border-radius-small;
  }

  &__title {
    font-size: $font-size-m;
  }

  &__text {
    font-size: $font-size-s;
    color: $font-color-white-dark;
    display: flex;
    justify-content: space-between;
  }

  &__request-link {
    color: $font-color-default;
    background-color: $accent-color-x-light;
    padding: 0 4px;
    border-radius: 2px;

    &:hover {
      background-color: $accent-color-xx-light;
    }
  }
}

@media (max-width: $max-width-tablet) {
  .gallery {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: $max-width-mobile-landscape) {
  .gallery {
    grid-gap: 16px;
  }

  .image-item {
    &:hover {
      .image-item__content {
        opacity: 0;
      }
    }
  }
}

@media (max-width: $max-width-mobile) {
  .gallery {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
