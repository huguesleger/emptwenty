<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$templates = array( 'search.twig', 'archive.twig', 'index.twig' );

$context          = Timber::context();
$context['title'] = 'Search results for ' . get_search_query();
$context['posts'] = new Timber\PostQuery();

// $args = array(
//     'post_type'        => array('post', 'product'),
//     'posts_per_page'   => 8,
//     's'                => $text_search,
//     'orderby'          => 'date',
//     'order'            => 'DESC',
//     'post_status'      => 'publish',
//     'paged'            => $paged
// );

$context['pagination'] = Timber::get_pagination();
$context['posts'] = new Timber\PostQuery($args);
$context['count'] = new WP_Query($args);

Timber::render( $templates, $context );
