<?php

/**
 * Plugin Name: Slider Carousel
 * Author: Xavier Arbour
 * Description: Affiche le carrousel associé à la galerie wordpress
 * Version: 1.0
 * Plugin URI: 
 * Author URI: httsp://referenced.ca.
 * 
 */

 // Ajoute les styles et scripts
function xa_enqueue_slider_style_script() {
    // Enqueue CSS
    wp_enqueue_style(
        'xa_plugin_slider_css',
        plugin_dir_url(__FILE__) . "css/slider-style.css",
        array(),
        '1.0.0'
    );

    // Enqueue JS
    wp_enqueue_script(
        'xa_plugin_slider_js',
        plugin_dir_url(__FILE__) . "js/slider-car.js",
        array('jquery'),
        '1.0.0',
        true
    );

    // On va chercher les images de la galerie
    $images = get_posts(array(
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => -1,
    ));

    $selected_image_filenames = array('images.jpg', 'images-1.jpg', 'Capture-decran-2022-06-09-160753.png');

    // Get image URLs
    $image_urls = array();
    foreach ($images as $image) {
        $image_url = wp_get_attachment_url($image->ID);
        $image_filename = basename($image_url);
        if (in_array($image_filename, $selected_image_filenames)) {
            $image_urls[] = $image_url;
        }
    }

    // Envoie les images au script JS
    wp_localize_script('xa_plugin_slider_js', 'carouselImages', array('images' => $image_urls));
}

// Ajoute les styles et scripts
add_action('wp_enqueue_scripts', 'xa_enqueue_slider_style_script');

// Definir le shortcode
function slider_car_shortcode() {
    // retourne un espace vide quand le shortcode est appelé
    return '<div class="cible-carousel"></div>';
}

// Enregistre le shortcode
add_shortcode('slider_car', 'slider_car_shortcode');
?>