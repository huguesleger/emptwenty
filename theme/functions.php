<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = dirname( __DIR__ ) . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return dirname( get_stylesheet_directory() ) . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( '../views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_sidebar' ) );
		parent::__construct();
	}


	 public function register_sidebar() {
		function footer_logo() {
			$args =  array(
				'name' => __( 'Footer logo', 'emptwenty' ),
				'id' => 'footer_logo',
				'description' => __( 'cette zone sera affichée dans la premiere colonne à gauche (ajouter le widget "Image")', 'emptwenty' ),
				'before_widget' => '<div class="footer-logo">',
				'after_widget' => '</div>',
			);
			register_sidebar( $args);
		}
		footer_logo();

		function footer_center() {
			$args =  array(
				'name' => __( 'Footer studio', 'emptwenty' ),
				'id' => 'footer_studio',
				'description' => __( 'cette zone sera affichée dans la seconde colonne (ajouter le widget "Texte")', 'emptwenty' ),
				'before_widget' => '<div class="footer-studio">',
				'after_widget' => '</div>',
				'before_title' => '<h4 class="title-footer">',
				'after_title' => '</h4>',
			);
			register_sidebar( $args);
		}
		footer_center();

		function footer_nav() {
			$args =  array(
				'name' => __( 'Footer menu', 'emptwenty' ),
				'id' => 'footer_menu',
				'description' => __( 'cette zone sera affichée dans la troisième colonne (ajouter le widget "Texte")', 'emptwenty' ),
				'before_widget' => '<div class="footer-nav">',
				'after_widget' => '</div>',
				'before_title' => '<h4 class="title-footer">',
				'after_title' => '</h4>',
			);
			register_sidebar( $args);
		}
		footer_nav();

		function footer_contact() {
			$args =  array(
				'name' => __( 'Footer contact', 'emptwenty' ),
				'id' => 'footer_contact',
				'description' => __( 'cette zone sera affichée dans la dernière colonne (ajouter le widget "Texte")', 'emptwenty' ),
				'before_widget' => '<div class="footer-contact">',
				'after_widget' => '</div>',
				'before_title' => '<h4 class="title-footer">',
				'after_title' => '</h4>',
			);
			register_sidebar( $args);
		}
		footer_contact();	
	 }

	/** This is where you can register custom post types. */
	public function register_post_types() {
		function hero_slider() {
			$labels = array(
				'name'               => 'Slider',
				'singular_name'      => 'Slide',
				'menu_name'          => 'Slider',
				'name_admin_bar'     => 'Slider',
				'add_new'            => 'Ajouter un nouveau slide',
				'add_new_item'       => 'Ajouter un slide',
				'new_item'           => 'Nouveau slide',
				'edit_item'          => 'Editer un slide',
				'view_item'          => 'Voir un slide',
				'all_items'          => 'Tous les slides',
				'search_items'       => 'Rechercher un slide',
				'parent_item_colon'  => 'Parent Item',
				'not_found'          => 'Aucun slide',
				'not_found_in_trash' => 'Aucun slide dans la corbeille'
			);
	  
			$args = array(
				'labels'             => $labels,
				'description'        => __( 'Description.', 'your-plugin-textdomain' ),
			  'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'show_in_rest'       => true,
				'query_var'          => true,
			  	'rewrite'            => array( 'slug' => 'hero-slider' ),
				'capability_type'    => 'post',
				'menu_icon'          => 'dashicons-images-alt2',
				'has_archive'        => false,
				'hierarchical'       => true,
				'menu_position'      => 4,
				'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'thumbnail','revisions','page-attributes'),
			);
	  
			register_post_type( 'hero-slider', $args );
		}
		hero_slider();
		
		/**  services */
		function services() {
			$labels = array(
				'name'               => 'Services',
				'singular_name'      => 'Service',
				'menu_name'          => 'Services',
				'name_admin_bar'     => 'Services',
				'add_new'            => 'Ajouter un nouveau service',
				'add_new_item'       => 'Ajouter un service',
				'new_item'           => 'Nouveau service',
				'edit_item'          => 'Editer un service',
				'view_item'          => 'Voir un service',
				'all_items'          => 'Tous les services',
				'search_items'       => 'Rechercher un service',
				'parent_item_colon'  => 'Parent Item',
				'not_found'          => 'Aucun service',
				'not_found_in_trash' => 'Aucun service dans la corbeille'
			);
	  
			$args = array(
				'labels'             => $labels,
				'description'        => __( 'Description.', 'your-plugin-textdomain' ),
			  'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'show_in_rest'       => true,
				'query_var'          => true,
			  	'rewrite'            => array( 'slug' => 'services' ),
				'capability_type'    => 'post',
				'menu_icon'          => 'dashicons-welcome-write-blog',
				'has_archive'        => false,
				'hierarchical'       => true,
				'menu_position'      => 4,
				'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'thumbnail','revisions','page-attributes'),
			);
	  
			register_post_type( 'services', $args );
		}
		services();

		/** counter */
		function counter() {
			$labels = array(
				'name'               => 'Nombres',
				'singular_name'      => 'Nombre',
				'menu_name'          => 'Counter',
				'name_admin_bar'     => 'Nombres',
				'add_new'            => 'Ajouter un nouveau nombre',
				'add_new_item'       => 'Ajouter un nombre',
				'new_item'           => 'Nouveau nombre',
				'edit_item'          => 'Editer un nombre',
				'view_item'          => 'Voir un nombre',
				'all_items'          => 'Tous les nombres',
				'search_items'       => 'Rechercher un nombre',
				'parent_item_colon'  => 'Parent Item',
				'not_found'          => 'Aucun nombre',
				'not_found_in_trash' => 'Aucun nombre dans la corbeille'
			);
		
			$args = array(
				'labels'             => $labels,
				'description'        => __( 'Description.', 'your-plugin-textdomain' ),
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'show_in_rest'       => true,
				'query_var'          => true,
					'rewrite'            => array( 'slug' => 'counter' ),
				'capability_type'    => 'post',
				'menu_icon'          => 'dashicons-clock',
				'has_archive'        => false,
				'hierarchical'       => true,
				'menu_position'      => 4,
				'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'thumbnail','revisions','page-attributes'),
			);
		
			register_post_type( 'counter', $args );
		}
		counter();		

		/** sound */
		function sound() {
			$labels = array(
				'name'               => 'Morceaux',
				'singular_name'      => 'Morceau',
				'menu_name'          => 'Morceaux',
				'name_admin_bar'     => 'Morceaux',
				'add_new'            => 'Ajouter un nouveau morceau',
				'add_new_item'       => 'Ajouter un morceau',
				'new_item'           => 'Nouveau morceau',
				'edit_item'          => 'Editer un morceau',
				'view_item'          => 'Voir un morceau',
				'all_items'          => 'Tous les morceaux',
				'search_items'       => 'Rechercher un morceau',
				'parent_item_colon'  => 'Parent Item',
				'not_found'          => 'Aucun morceau',
				'not_found_in_trash' => 'Aucun morceau dans la corbeille'
			);
	  
			$args = array(
				'labels'             => $labels,
				'description'        => __( 'Description.', 'your-plugin-textdomain' ),
			  'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'show_in_rest'       => true,
				'query_var'          => true,
			  	'rewrite'            => array( 'slug' => 'sound' ),
				'capability_type'    => 'post',
				'menu_icon'          => 'dashicons-album',
				'has_archive'        => false,
				'hierarchical'       => true,
				'menu_position'      => 4,
				'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'thumbnail','revisions','page-attributes'),
			);
	  
			register_post_type( 'sound', $args );
		}
		sound();

		/** genres */
		function genres() {
			$labels = array(
				'name'               => 'Genres',
				'singular_name'      => 'Genre',
				'menu_name'          => 'Top Genres',
				'name_admin_bar'     => 'Genres',
				'add_new'            => 'Ajouter un nouveau genre',
				'add_new_item'       => 'Ajouter un genre',
				'new_item'           => 'Nouveau genre',
				'edit_item'          => 'Editer un genre',
				'view_item'          => 'Voir un genre',
				'all_items'          => 'Tous les genres',
				'search_items'       => 'Rechercher un genre',
				'parent_item_colon'  => 'Parent Item',
				'not_found'          => 'Aucun genre',
				'not_found_in_trash' => 'Aucun genre dans la corbeille'
			);
		
			$args = array(
				'labels'             => $labels,
				'description'        => __( 'Description.', 'your-plugin-textdomain' ),
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'show_in_rest'       => true,
				'query_var'          => true,
					'rewrite'            => array( 'slug' => 'genres' ),
				'capability_type'    => 'post',
				'menu_icon'          => 'dashicons-format-audio',
				'has_archive'        => false,
				'hierarchical'       => true,
				'menu_position'      => 4,
				'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'thumbnail','revisions','page-attributes'),
			);
		
			register_post_type( 'genres', $args );
		}
		genres();		

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {
	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = new Timber\Menu('primary');
		$context['menu_footer']  = new Timber\Menu('footer');
		$context['site']  = $this;
		$custom_logo_url = wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' );
		$context['custom_logo_url'] = $custom_logo_url;
		$context['footer_logo'] = Timber::get_widgets('footer_logo');
		$context['footer_studio'] = Timber::get_widgets('footer_studio');
		$context['footer_menu'] = Timber::get_widgets('footer_menu');
		$context['footer_contact'] = Timber::get_widgets('footer_contact');
		// $context['icon_dashboard'] = Timber::render( 'icon-dashboard.twig');
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
		register_nav_menus( array(
			'primary' => 'Menu Principal',
			'footer' => 'Bas de page',
		) );


		/*
		* logo custum
		*/
		add_theme_support('custom-logo',array(
			'flex-height' => true,
		));
	}


	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}
	

}

/**
 * add page icon admin.
 */
function emp_twenty_register_settings( ) {
	register_setting( 'emp_twenty', 'icon' );
}
add_action( 'admin_init', 'emp_twenty_register_settings' );


function emp_twenty_admin_menu( ) {
	add_menu_page(
		'Liste des icons', 
		'Icon',           
		'administrator',      
		'emp-icon-page',    
		'emp_twenty_setting_page' 
	);
}
add_action( 'admin_menu', 'emp_twenty_admin_menu' );

function emp_twenty_setting_page( )
{
	$context['icon_dashboard'] = Timber::render( 'icon-dashboard.twig');
}


/**
 * Removes some menus by page.
 */
function wpdocs_remove_menus() {
	remove_menu_page( 'edit.php' );                  
	remove_menu_page( 'edit-comments.php' );       
  }
  add_action( 'admin_menu', 'wpdocs_remove_menus' ); 


/** 
 *  Remove class body
*/
add_filter( 'body_class', 'adjust_body_class' );
function adjust_body_class( $classes ) {
	foreach ( $classes as $key => $value ) {
		if ( $value == 'page-template-default') unset( $classes[ $key ] );
		if ( $value == 'page') unset( $classes[ $key ] );
		if ( $value == 'wp-custom-logo') unset( $classes[ $key ] );
		if( 0 === strpos( $value, 'page-id-' )) unset($classes[$key]);
		if( 0 === strpos( $value, 'page-template-' )) unset($classes[$key]);
		if ( $value == 'page-template') unset( $classes[ $key ] );
		if( 0 === strpos( $value, 'postid-' )) unset($classes[$key]);
		if ( $value == 'single') unset( $classes[ $key ] );
	}
	return $classes;
}

/** remove version style css/js */
function emp_twenty_remove_wp_version_strings($src) {

	global $wp_version;
	parse_str(parse_url($src, PHP_URL_QUERY), $query);
	  if(!empty($query['ver']) && $query['ver'] === $wp_version) {
		$src = remove_query_arg('ver',$src);
	  }
	  return $src;
   }
  add_filter('script_loader_src','emp_twenty_remove_wp_version_strings');
  add_filter('style_loader_src','emp_twenty_remove_wp_version_strings');


/** remove link head */	
	remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
	remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
	remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
	remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
	remove_action( 'wp_head', 'index_rel_link' ); // index link
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // prev link
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 ); // start link
	remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 ); // Display relational links for the posts adjacent to the current post./ Display the links to the extra feeds such as category feeds
	remove_action( 'wp_head', 'rest_output_link_wp_head', 10 ); //display link API
	remove_action( 'wp_head', 'wp_generator' ); // Display the XHTML generator that is generated on the wp_head hook, WP version

/** remove emoji */
function disable_emoji_feature() {

	// Prevent Emoji from loading on the front-end
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );

	// Remove from admin area also
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );

	// Remove from RSS feeds also
	remove_filter( 'the_content_feed', 'wp_staticize_emoji');
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji');

	// Remove from Embeds
	remove_filter( 'embed_head', 'print_emoji_detection_script' );

	// Remove from emails
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

	// Disable from TinyMCE editor. Currently disabled in block editor by default
	add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );

	add_filter( 'option_use_smilies', '__return_false' );

}	

  /** install last jquery version */
function jquery() {
	if (!is_admin()) {
		wp_deregister_script('jquery');
		wp_register_script('jquery', ("https://code.jquery.com/jquery-3.5.1.min.js"), false);
		wp_enqueue_script('jquery');
	}
}
add_action('wp_enqueue_scripts', 'jquery');

/**
* Enqueue Font awesome
*/
function emp_twenty_enqueue_fontawesome() {
	   wp_enqueue_style('fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css', array(), true);
	}
	add_action( 'wp_enqueue_scripts', 'emp_twenty_enqueue_fontawesome', 10 );
	
	/* Enqueue Styles and Scripts */
	function header_scripts()  { 
	  wp_enqueue_style('styles', get_stylesheet_directory_uri() . '/public/css/custom.css');
	}
	add_action( 'wp_enqueue_scripts', 'header_scripts' );
	
	function footer_scripts()  {
	wp_enqueue_script( 'emptwentyplugins', get_template_directory_uri() . '/public/js/vendors.js');
	wp_enqueue_script( 'emptwentyScrollMagic', get_template_directory_uri() . '/public/js/scrollMagic.js');
	wp_enqueue_script( 'emptwentyscript', get_template_directory_uri() . '/public/js/script.js', array('jquery'), '', true );
	}
	add_action( 'wp_footer', 'footer_scripts' );

	function load_admin_style() {
		wp_enqueue_style( 'admin_css', get_template_directory_uri() . '/admin/admin-style.css', false, '1.0.0' );
		wp_enqueue_script( 'admin_js', get_template_directory_uri() . '/admin/admin-script.js', array('jquery'), '1.0.0', true  );
	}
	add_action( 'admin_enqueue_scripts', 'load_admin_style' );

new StarterSite();
