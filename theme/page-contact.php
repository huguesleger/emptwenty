<?php
/**
 * Template Name: Contact page
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;
$context['posts_header'] = new Timber\Post();
$timber_post_header     = Timber::query_post('header');
$context['post_header'] = $timber_post_header;

Timber::render( array( 'page-' . $timber_post->post_name . '.twig', 'page.twig' ), $context, $timber_post_header );