
    // TODO: Add your ion access token from cesium.com/ion/
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMDhiOGIyMi0zOTg3LTQ3M2YtODFiMy04NzViMWY1NWI4MGUiLCJpZCI6Mjc1MzMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODk3MDQ5NDZ9.EpWVKtgQ7driRc9wQtyIg3ortY5SeVddRN_WELBNK5g';

    //////////////////////////////////////////////////////////////////////////
    // Creating the Viewer
    //////////////////////////////////////////////////////////////////////////

  // An example showing a point cloud tileset classified by a Geometry tileset.
	var viewer = new Cesium.Viewer("cesiumContainer", {
	  terrainProvider: Cesium.createWorldTerrain(),
	});

	//Point Cloud by Prof. Peter Allen, Columbia University Robotics Lab. Scanning by Alejandro Troccoli and Matei Ciocarlie.
	var tileset = new Cesium.Cesium3DTileset({
	  url: Cesium.IonResource.fromAssetId(117032),
	});
	viewer.scene.primitives.add(tileset);

	// Geometry Tiles are experimental and the format is subject to change in the future.
	// For more details, see:
	//    https://github.com/CesiumGS/3d-tiles/tree/3d-tiles-next/TileFormats/Geometry
	

	

	// Information about the currently highlighted feature
	var highlighted = {
	  feature: undefined,
	  originalColor: new Cesium.Color(),
	};

	// Color a feature yellow on hover.
	viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(
	  movement
	) {
	  // If a feature was previously highlighted, undo the highlight
	  if (Cesium.defined(highlighted.feature)) {
		highlighted.feature.color = highlighted.originalColor;
		highlighted.feature = undefined;
	  }

	  // Pick a new feature
	  var pickedFeature = viewer.scene.pick(movement.endPosition);
	  if (!Cesium.defined(pickedFeature)) {
		return;
	  }

	  // Highlight the feature
	  highlighted.feature = pickedFeature;
	  Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
	  pickedFeature.color = Cesium.Color.YELLOW.withAlpha(0.5);
	},
	Cesium.ScreenSpaceEventType.MOUSE_MOVE);
