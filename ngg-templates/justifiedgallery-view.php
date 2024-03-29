<?php
$this->start_element('nextgen_gallery.gallery_container', 'container', $displayed_gallery);
if ($displayed_gallery->source === 'galleries' && !empty($displayed_gallery->container_ids)) {
	$gallery = C_Gallery_Mapper::get_instance()->find($displayed_gallery->container_ids[0]);}
$is_gallery = (isset($gallery)) ? 1 : 0;
?>
<!-- default-view.php -->
<div
	class="justified-galleryoverview default-view <?php if (!intval($ajax_pagination)) echo ' ngg-ajax-pagination-none'; ?>"
	id="ngg-gallery-<?php echo esc_attr($displayed_gallery_id)?>-<?php echo esc_attr($current_page)?>">
	<?php if ($is_gallery): ?>
    <div class="ppv-gallery-title"><?php echo esc_attr($gallery->title)?> Gallery</div>
	<?php
	endif;
	$this->start_element('nextgen_gallery.image_list_container', 'container', $images);

	?>
    <div id="ppv-justified">
	<!-- Thumbnails -->
	<?php for ($i=0; $i<count($images); $i++):
       $image = $images[$i];
       $thumb_size = $storage->get_image_dimensions($image, $thumbnail_size_name);
       $style = isset($image->style) ? $image->style : null;
       $column_class = 'ngg-' . $number_of_columns . '-columns'; 

       if (isset($image->hidden) && $image->hidden) {
          $style = 'style="display: none;"';
       }
       else {
       		$style = null;
       }

			 $this->start_element('nextgen_gallery.image_panel', 'item', $image);

			?>
			<div id="<?php echo esc_attr('ngg-image-' . $i) ?>" class="justified-thumbnail-box <?php if ($number_of_columns > 0 && empty($show_all_in_lightbox)) { echo $column_class; } ?>" <?php if ($style) echo $style; ?>>
				<?php

				$this->start_element('nextgen_gallery.image', 'item', $image);

				?>

            <a href="<?php echo esc_attr($storage->get_image_url($image, 'full', TRUE))?>"
               title="<?php echo esc_attr($image->description)?>"
               data-src="<?php echo esc_attr($storage->get_image_url($image)); ?>"
               data-thumbnail="<?php echo esc_attr($storage->get_image_url($image, 'thumb')); ?>"
               data-image-id="<?php echo esc_attr($image->{$image->id_field}); ?>"
               data-title="<?php echo esc_attr($image->alttext); ?>"
               data-description="<?php echo esc_attr(stripslashes($image->description)); ?>"
               data-image-slug="<?php echo esc_attr($image->image_slug); ?>"
               <?php echo $effect_code ?>>
                <img
                    title="<?php echo esc_attr($image->alttext)?>"
                    alt="<?php echo esc_attr($image->alttext)?>"
                    src="<?php echo esc_attr($storage->get_image_url($image, $thumbnail_size_name))?>"
                />
            </a>

				<?php

				$this->end_element();

				?>
			</div> 
			<?php

			$this->end_element();

			?>

	<?php endfor ?>
</div>
	<br style="clear: both" />

	<?php

	$this->end_element();

	if (!empty($slideshow_link)): ?>
	<div class="slideshowlink">
        <a href='<?php echo esc_attr($slideshow_link) ?>'><?php echo esc_html($slideshow_link_text) ?></a>
		
	</div>
	<?php endif ?>

	<?php if ($pagination): ?>
	<!-- Pagination -->
	<?php echo $pagination ?>
	<?php else: ?>
	<div class="ngg-clear"></div>
	<?php endif ?>
	<?php if ($is_gallery): ?>
    <div class="ppv-justified-return"><a href="<?php the_permalink(); ?>" title="Return to the list of Picture Galleries"> &laquo; Return to the list of Picture Galleries</a></div>
	<?php endif ?>
</div>
<?php $this->end_element(); ?>
