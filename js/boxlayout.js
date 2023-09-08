var Boxlayout = (function() {
	var $el = $( '#main' ),
		$sections = $el.children( 'section' ),
		// works section
		$sectionWork = $( '#portfolio' ),
		// post section
		$sectionPost = $( '#blog' ),
		// work items
		$workItems = $( '#portfolio_items > li' ),
		// post items
		$postItems = $( '.post' ),
		// work panels
		$workPanelsContainer = $( '#bl-panel-work-items' ),
		$workPanels = $workPanelsContainer.children( 'div' ),
		totalWorkPanels = $workPanels.length,
		// post panels
		$postPanelsContainer = $( '#bl-panel-post-items' ),
		$postPanels = $postPanelsContainer.children( 'div' ),
		totalPostPanels = $postPanels.length,
		// navigating the work panels
		$nextWorkItem = $workPanelsContainer.find( 'nav > span.bl-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeWorkItem = $workPanelsContainer.find( 'nav > span.close' ),		
		// navigating the post panels
		$nextPostItem = $postPanelsContainer.find( 'nav > span.bl-next-post' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closePostItem = $postPanelsContainer.find( 'nav > span.close' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {
		$sections.each( function() {
			var $section = $( this );
			// expand the clicked section and scale down the others
			$section.on( 'click', function() {
				if( !$section.data( 'open' ) ) {
					$section.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
					$el.addClass( 'bl-expand-item' );	
				}

			} ).find( 'span.close' ).on( 'click', function() {
				// close the expanded section and scale up the others
				$section.data( 'open', false ).removeClass( 'bl-expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'bl-expand-top' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'bl-expand-top' );
				}
				$el.removeClass( 'bl-expand-item' );
				return false;
			} );
		} );

		// clicking on a work item: the current section scales down and the respective work panel slides up
		$workItems.on( 'click', function( event ) {
			// scale down main section
			$sectionWork.addClass( 'bl-scale-down' );
			// show panel for this work item
			$workPanelsContainer.addClass( 'bl-panel-items-show' );
			var $panel = $workPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentWorkPanel = $panel.index();
			$panel.addClass( 'bl-show-work' );
			return false;
		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextWorkItem.on( 'click', function( event ) {
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;
			var $currentPanel = $workPanels.eq( currentWorkPanel );
			currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
			var $nextPanel = $workPanels.eq( currentWorkPanel );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			$nextPanel.addClass( 'bl-show-work' );
			return false;
		} );

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closeWorkItem.on( 'click', function( event ) {
			// scale up main section
			$sectionWork.removeClass( 'bl-scale-down' );
			$workPanelsContainer.removeClass( 'bl-panel-items-show' );
			$workPanels.eq( currentWorkPanel ).removeClass( 'bl-show-work' );
			return false;
		} );

		// clicking on a post item: the current section scales down and the respective post panel slides up
		$postItems.on( 'click', function( event ) {
			// scale down main section
			$sectionPost.addClass( 'bl-scale-down' );
			// show panel for this work item
			$postPanelsContainer.addClass( 'bl-panel-items-show' );
			var $panel = $postPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentPostPanel = $panel.index();
			$panel.addClass( 'bl-show-work' );
			return false;
		} );

		// navigating the post items: current post panel scales down and the next work panel slides up
		$nextPostItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;
			var $currentPanel = $postPanels.eq( currentPostPanel );
			currentPostPanel = currentPostPanel < totalPostPanels - 1 ? currentPostPanel + 1 : 0;
			var $nextPanel = $postPanels.eq( currentPostPanel );
			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			$nextPanel.addClass( 'bl-show-work' );
			return false;
		} );

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closePostItem.on( 'click', function( event ) {
			// scale up main section
			$sectionPost.removeClass( 'bl-scale-down' );
			$postPanelsContainer.removeClass( 'bl-panel-items-show' );
			$postPanels.eq( currentPostPanel ).removeClass( 'bl-show-work' );
			return false;
		} );
	}
	return { init : init };

})();