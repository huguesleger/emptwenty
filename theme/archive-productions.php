<?php
/**
 * Template Name: Productions page
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$templates = array( 'archive-productions.twig', 'index.twig' );

$context = Timber::context();

$context['title'] = 'Archive';
if ( is_day() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'D M Y' );
} elseif ( is_month() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'M Y' );
} elseif ( is_year() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'Y' );
} elseif ( is_tag() ) {
	$context['title'] = single_tag_title( '', false );
} elseif ( is_category() ) {
	$context['title'] = single_cat_title( '', false );
	array_unshift( $templates, 'archive-' . get_query_var( 'cat' ) . '.twig' );
} elseif ( is_post_type_archive() ) {
	$context['title'] = post_type_archive_title( '', false );
	array_unshift( $templates, 'archive-' . get_post_type() . '.twig' );
}

global $paged;
if (!isset($paged) || !$paged){
	$paged = 1;
}

$podargs = array(
    // Get post type project
	'post_type' => 'sound',
	// 'posts_per_page'  => 3,
	'lang' => 'fr',
	'order'		=> 'DESC',
	'paged' => $paged
);

$context['posts'] = new Timber\PostQuery($podargs);
$timber_post     = new Timber\Post();
$context['post'] = $timber_post;
$context['posts_header'] = new Timber\Post();
$timber_post_header     = Timber::query_post('header');
$context['post_header'] = $timber_post_header;
$context['posts_productions'] = new Timber\Post();
$timber_post_productions     = Timber::query_post('productions');
$context['post_productions'] = $timber_post_productions;

Timber::render( $templates, $context, $timber_post_header, $timber_post_productions);

