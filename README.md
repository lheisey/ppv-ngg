# PPV NextGEN Addons #

A WordPress plugin that adds templates and a lightbox for the NextGEN Gallery plugin.

## Description ##

Adds two compact album templates, a justified gallery template, and a modified version of simplelightbox. The added functionality is only used for the NextGEN Gallery plugin so it needs to be installed and activated.

##  Included Functions ##

* compact album width template where number of albums displayed in row is determined by container width
* compact album query template where number of albums displayed in row is determined by media queries
* justified gallery template which displays gallery images in a justified layout 
* simplelightbox modified to have dark background for lightbox image

## Plugin Installation ##

1. Upload ppv-ngg.zip to plugins via WordPress admin panel or upload unzipped folder to the `/wp-content/plugins/` folder.
2. Activate the plugin through the 'Plugins' menu in WordPress.

## Template Installation ##

The templates in ngg-templates either need to be moved or uploaded to specific directories. If the directories are not present they need to be created.

The 2 album templates need to be placed as:

`wp-content/ngg/modules/photocrati-nextgen_basic_compact_album/templates/compactalbumwidth-view.php`

`wp-content/ngg/modules/photocrati-nextgen_basic_compact_album/templates/compactalbumquery-view.php`

The gallery template needs to be placed as:

`wp-content/ngg/modules/photocrati-nextgen_basic_thumbnails/templates/justifiedgallery-view.php`

## Template Setup ##

In the WordPress admin

For the album templates:

`NextGEN Gallery > Gallery Settings > Basic Compact Album > Select View`

In the dropdown select either `custom/compactalbumwidth-view.php` or `compactalbumquery-view.php`

For the gallery template:

`NextGEN Gallery > Gallery Settings > Basic Thumbnails > Select View`

In the dropdown select `custom/justifiedgallery-view.php`

## Lightbox Setup ##

In the WordPress admin

`NextGEN Gallery > Other Options > Lightbox Effects > What lightbox would you like to use?`

In the dropdown select `Custom`

Also copy and paste `class="simplelightbox" rel="%GALLERY_NAME%"` into the Code box.

## Frequently Asked Questions ##

### What is a justified layout? ###

For an image gallery the justified layout fits differently sized images in rows of the same height by resizing rather than cropping. It is particularly useful for galleries that have images of different sizes as well as both portrait and landscape oriented images.

### Which readme file do I make changes in? ###

Make changes to the README.txt file. The README.md file is generated by gulp so should never be edited.

### Where is the plugin version updated? ###

In the ppv-ngg.php file after the comment block that starts with `Currently plugin version` and also in the header comments.

## Credits ##

* WordPress Plugin Boilerplate https://github.com/DevinVinson/WordPress-Plugin-Boilerplate was used as the starting point for this plugin.
* WPGulp https://github.com/ahmadawais/WPGulp was used as the starting point for the gulp workflow.
* JustifiedGallery https://github.com/miromannino/Justified-Gallery
* SimpleLightbox https://github.com/andreknieriem/simplelightbox

## Changelog ##

### 1.0 ###
* Initial release.

### 1.0.1 ###
* Add readme.txt to markdown conversion
