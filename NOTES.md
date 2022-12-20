# Notes for PPV NextGEN Addons #

## Reason simplelightbox version was fixed to 2.10.4 ##

Version 2.11.0 of simplelightbox introduced a breaking change because of the HTML/CSS used in the PPV NextGEN Addons plugin. The error manifests as the simplelightbox arrows and close buttons not responding to clicks. An example of the error message is:

````
simple-lightbox.jquery.min.js?ver=1.12.3:1 Uncaught DOMException: Failed to execute 'querySelector' on 'Document': 'HTML > BODY.page-template-default.page.page-id-95.logged-in.admin-bar.col-2cl.boxed.header-desktop-sticky.header-mobile-sticky.hueman-3-7-23-with-child-theme.chrome.customize-support.hidden-scroll:nth-child(2) > DIV#wrapper:nth-child(11) > DIV#page.container:nth-child(3) > DIV.container-inner:nth-child(1) > DIV.main:nth-child(1) > DIV.main-inner.group:nth-child(1) > MAIN#content.content:nth-child(1) > DIV.hu-pad.group:nth-child(2) > ARTICLE.group.post-95.page.type-page.status-publish.hentry:nth-child(1) > DIV.entry.themeform:nth-child(1) > DIV#ngg-gallery-5d5eb761235f34d4175207fb8022912f-1.justified-galleryoverview.default-view..ngg-ajax-pagination-none:nth-child(1) > DIV#ppv-justified.justified-gallery:nth-child(2) > DIV#ngg-image-1.justified-thumbnail-box.jg-entry.jg-entry-visible:nth-child(2) > A.simplelightbox:nth-child(1) img' is not a valid selector.
    at Image.<anonymous> (http://wpsite/wp-content/plugins/ppv-ngg/assets/js/simple-lightbox.jquery.min.js?ver=1.12.3:1:16228)
````

The HTML/CSS format is defined by the NextGEN Galley plugin. While it might be possible to fix it in my justified gallery template the NextGEN gallery templates would have the problem.

For now I am fixing simplelightbox to the last working version though I might revisit this in the future.
