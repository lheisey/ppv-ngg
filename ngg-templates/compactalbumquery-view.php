<?php $this->start_element('nextgen_gallery.gallery_container', 'container', $displayed_gallery); ?>
<div class="ngg-albumoverview ppv-default-view">
<div class="ppv-album-name"><?php echo esc_attr($album->name); ?> Galleries</div>
    <ul class="ppv-col-cards">
    <?php
    foreach ($galleries as $gallery) {
        if ($open_gallery_in_lightbox && $gallery->entity_type == 'gallery') {
            $anchor = $gallery->displayed_gallery->effect_code . "
                      href='" . nextgen_esc_url($gallery->pagelink) . "'
                      data-src='" . esc_attr($gallery->previewpic_fullsized_url) . "'
                      data-fullsize='" . esc_attr($gallery->previewpic_fullsized_url) . "'
                      data-thumbnail='" . esc_attr($gallery->previewurl) . "'
                      data-title='" . esc_attr($gallery->previewpic_image->alttext) . "'
                      data-description='" . esc_attr(stripslashes($gallery->previewpic_image->description)) . "'
                      data-image-id='" . esc_attr($gallery->previewpic) . "'";
        } else {
            $anchor = "title='" . esc_attr($gallery->title) . "'
                       href='" . nextgen_esc_url($gallery->pagelink) . "'";
        }
        ?>

        <li class="ppv-col-cards_item">
            <div class="ppv-col-card">
                <div class="ppv-col-card_image">
                    <?php $this->start_element('nextgen_gallery.album_gallery', 'item', $gallery); ?>
                    <a <?php echo $anchor; ?>>
                        <img alt="<?php echo esc_attr($gallery->title); ?>"
                             src="<?php echo nextgen_esc_url($gallery->previewurl); ?>"/>
                    </a>
                    <?php $this->end_element(); ?>
                </div>

            <?php if (!empty($image_gen_params)) {
                $max_width = 'style="max-width: ' . ($image_gen_params['width']) . 'px"';
            } else {
                $max_width = '';
            } ?>
                <div class="ppv-col-card_content">
                    <div class="ppv-col-card_title">
                        <a <?php echo $anchor; ?>><?php print wp_kses($gallery->title, M_I18N::get_kses_allowed_html()); ?></a>
                    </div>
                    <div class="ppv-col-card_text">
                        <?php if (isset($gallery->counter) && $gallery->counter > 0) { ?>
                            <strong><?php echo $gallery->counter; ?></strong>&nbsp;<?php _e('Photos', 'nggallery'); ?>
                        <?php } else { ?>
                            &nbsp;
                        <?php } ?>
                    </div>
                </div>
            </div>
        </li>
    <?php } ?>
    </ul>
    <br class="ngg-clear"/>
    <?php echo $pagination ?>
</div>
<?php $this->end_element(); ?>
