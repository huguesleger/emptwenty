<?php

/**
 * Template Name: Home page
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();
// $context['post'] = new Timber\Post();

$podargs = array(
    // Get post type project
	'post_type' => 'hero-slider',
	'posts_per_page' => -1,
	'order'		=> 'ASC'
);

$serviceargs = array(
    // Get post type project
	'post_type' => 'services',
	'posts_per_page' => -1,
	'order'		=> 'ASC'
);

// $soundargs = array(
//     // Get post type project
// 	'post_type' => 'sound',
// 	'numberposts' => 1,
// 	'order'		=> 'DESC'
// );

$counterargs = array(
    // Get post type project
	'post_type' => 'counter',
	'posts_per_page' => -1,
	'order'		=> 'DESC'
);

$genresargs = array(
    // Get post type project
	'post_type' => 'genres',
	'posts_per_page' => -1,
	'order'		=> 'DESC'
);

$context['posts'] = new Timber\PostQuery($podargs);
$context['posts_services'] = new Timber\PostQuery($serviceargs);
$context['posts_services_style'] = new Timber\Post();
$context['posts_services_list'] = new Timber\Post();
// $context['posts_sound'] = new Timber\PostQuery($soundargs);
$context['posts_about'] = new Timber\Post();
$context['posts_counter'] = new Timber\PostQuery($counterargs);
$context['posts_genres'] = new Timber\PostQuery($genresargs);

$timber_post     = Timber::query_post();
$timber_post_services     = Timber::query_post('services');
$timber_post_services_style     = Timber::query_post('style-services');
$timber_post_services_list     = Timber::query_post('liste-services');
// $timber_post_sound     = Timber::query_post('sound');
$timber_post_about     = Timber::query_post('section-about');
$timber_post_counter     = Timber::query_post('counter');
$timber_post_genres     = Timber::query_post('genres');

$context['post_services'] = $timber_post_services;
$context['post_services_style'] = $timber_post_services_style;
$context['post_services_list'] = $timber_post_services_list;
// $context['post_sound'] = $timber_post_sound;
$context['post_about'] = $timber_post_about;
$context['post'] = $timber_post;
$context['post_counter'] = $timber_post_counter;
$context['post_genres'] = $timber_post_genres;

$sound_posts = get_field('last_sound_morceau_en_avant');
$context['sound_posts'] = $sound_posts;


Timber::render( 'front-page.twig', 
$context, $timber_post, $timber_post_services, $timber_post_services_style, 
$timber_post_services_list, $timber_post_about, $timber_post_counter, $timber_post_genres, $sound_posts );
