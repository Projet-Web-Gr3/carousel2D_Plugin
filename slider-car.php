<?php

/**
 * Plugin Name: Slider Carousel
 * Author: Xavier Arbour
 * Description: Affiche le carrousel 2D associé à la galerie wordpress
 * Version: 1.0
 * Plugin URI: 
 * Author URI: httsp://referenced.ca.
 * 
 */

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

    // Fetch les ACFS fields des Profs
    $args = array(
        'category_name' => 'Profs',
        'post_type' => 'post',
        'posts_per_page' => -1
    );
    $query = new WP_Query($args);
    $acf_fields = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $fields = get_fields(get_the_ID());
            if ($fields) {
                $acf_fields[] = array(
                    'photo' => $fields['photo'],
                    'profs' => $fields['profs'],
                    'type' => $fields['type'],
                    'description' => $fields['description']
                );
            }
        }
        wp_reset_postdata();
    }

    // Passation des données à JavaScript
    wp_localize_script('xa_plugin_slider_js', 'carouselData', array(
        'acfFields' => $acf_fields
    ));
}

// Ajout des styles et scripts
add_action('wp_enqueue_scripts', 'xa_enqueue_slider_style_script');

// Definition du shortcode
function slider_car_shortcode() {
    // Renvoie les tags et classes pour contenir les carousels
        return '<div class="cible-carousel-1"></div>' . '<div class="cible-carousel-2"></div>';

}

// Enregistre le shortcode
add_shortcode('slider_car', 'slider_car_shortcode');
?>