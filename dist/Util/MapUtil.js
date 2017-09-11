'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapUtil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = require('ol/map');

var _map2 = _interopRequireDefault(_map);

var _proj = require('ol/proj');

var _proj2 = _interopRequireDefault(_proj);

var _group = require('ol/layer/group');

var _group2 = _interopRequireDefault(_group);

var _FeatureUtil = require('./FeatureUtil');

var _FeatureUtil2 = _interopRequireDefault(_FeatureUtil);

var _Logger = require('./Logger.js');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Helper Class for the ol3 map.
 *
 * @class
 */
var MapUtil = exports.MapUtil = function () {
  function MapUtil() {
    _classCallCheck(this, MapUtil);
  }

  _createClass(MapUtil, null, [{
    key: 'getInteractionsByName',


    /**
     * Returns all interactions by the given name of a map.
     *
     * @param {ol.Map} map The map to use for lookup.
     * @param {String} name The name of the interaction to look for.
     * @return {ol.interaction[]} The list of result interactions.
     */
    value: function getInteractionsByName(map, name) {
      var interactionCandidates = [];

      if (!(map instanceof _map2.default)) {
        _Logger2.default.debug('Input parameter map must be from type `ol.Map`.');
        return interactionCandidates;
      }

      var interactions = map.getInteractions();

      interactions.forEach(function (interaction) {
        if (interaction.get('name') === name) {
          interactionCandidates.push(interaction);
        }
      });

      return interactionCandidates;
    }

    /**
     * Returns all interactions by the given name of a map.
     *
     * @param {ol.Map} map The map to use for lookup.
     * @param {ol.interaction} clazz The class of the interaction to look for.
     * @return {ol.interaction[]} The list of result interactions.
     */

  }, {
    key: 'getInteractionsByClass',
    value: function getInteractionsByClass(map, clazz) {
      var interactionCandidates = [];

      if (!(map instanceof _map2.default)) {
        _Logger2.default.debug('Input parameter map must be from type `ol.Map`.');
        return interactionCandidates;
      }

      var interactions = map.getInteractions();

      interactions.forEach(function (interaction) {
        if (interaction instanceof clazz) {
          interactionCandidates.push(interaction);
        }
      });

      return interactionCandidates;
    }

    /**
     * Calculates the appropriate map resolution for a given scale in the given
     * units.
     *
     * See: https://gis.stackexchange.com/questions/158435/
     * how-to-get-current-scale-in-openlayers-3
     *
     * @method
     * @param {Number} scale The input scale to calculate the appropriate
     *                       resolution for.
     * @param {String} units The units to use for calculation (m or degrees).
     * @return {Number} The calculated resolution.
     */

  }, {
    key: 'getResolutionForScale',
    value: function getResolutionForScale(scale, units) {
      var dpi = 25.4 / 0.28;
      var mpu = _proj2.default.METERS_PER_UNIT[units];
      var inchesPerMeter = 39.37;

      return parseFloat(scale) / (mpu * inchesPerMeter * dpi);
    }

    /**
     * Returns the appropriate scale for the given resolution and units.
     *
     * @method
     * @param {Number} resolution The resolutions to calculate the scale for.
     * @param {String} units The units the resolution is based on, typically
     *                       either 'm' or 'degrees'.
     * @return {Number} The appropriate scale.
     */

  }, {
    key: 'getScaleForResolution',
    value: function getScaleForResolution(resolution, units) {
      var dpi = 25.4 / 0.28;
      var mpu = _proj2.default.METERS_PER_UNIT[units];
      var inchesPerMeter = 39.37;

      return parseFloat(resolution) * mpu * inchesPerMeter * dpi;
    }

    /**
     * Returns all layers of a collection. Even the hidden ones.
     *
     * @param {ol.Map|ol.layer.Group} collection The collection to get the layers
     *                                           from. This can be an ol.layer.Group
     *                                           or and ol.Map.
     * @return {Array} An array of all Layers.
     */

  }, {
    key: 'getAllLayers',
    value: function getAllLayers(collection) {
      if (!(collection instanceof _map2.default) && !(collection instanceof _group2.default)) {
        _Logger2.default.error('Input parameter collection must be from type `ol.Map`' + 'or `ol.layer.Group`.');
      }

      var layers = collection.getLayers().getArray();
      var allLayers = [];

      layers.forEach(function (layer) {
        if (layer instanceof _group2.default) {
          MapUtil.getAllLayers(layer).forEach(function (layeri) {
            allLayers.push(layeri);
          });
        }
        allLayers.push(layer);
      });
      return allLayers;
    }

    /**
     * Get a layer by its key (ol_uid).
     *
     * @param {ol.Map} map The map to use for lookup.
     * @param {String} ol_uid The ol_uid of a layer.
     * @return {ol.layer.Layer} The layer.
     */

  }, {
    key: 'getLayerByName',


    /**
     * Returns the layer from the provided map by the given name
     * (parameter LAYERS).
     *
     * @param {ol.Map} map The map to use for lookup.
     * @param {String} name The name to get the layer by.
     * @return {ol.Layer} The result layer or undefined if the layer could not
     *                    be found.
     */
    value: function getLayerByName(map, name) {
      var layers = MapUtil.getMapLayers(map);
      var layerCandidate = void 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var layer = _step.value;

          if (layer.getSource && layer.getSource().getParams && layer.getSource().getParams()['LAYERS'] === name) {
            layerCandidate = layer;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return layerCandidate;
    }

    /**
     * Returns the layer from the provided map by the given feature.
     *
     * @param {ol.Map} map The map to use for lookup.
     * @param {ol.Feature} feature The feature to get the layer by.
     * @param {Array} namespaces list of supported GeoServer namespaces.
     * @return {ol.Layer} The result layer or undefined if the layer could not
     *                    be found.
     */

  }, {
    key: 'getLayerByFeature',
    value: function getLayerByFeature(map, feature, namespaces) {
      var featureTypeName = _FeatureUtil2.default.getFeatureTypeName(feature);
      var layerCandidate = void 0;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = namespaces[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var namespace = _step2.value;

          var qualifiedFeatureTypeName = namespace + ':' + featureTypeName;
          var layer = MapUtil.getLayerByName(map, qualifiedFeatureTypeName);
          if (layer) {
            layerCandidate = layer;
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return layerCandidate;
    }

    /**
     * Returns all layers of the specified layer group recursively.
     *
     * @param {ol.Map} map The map to use for lookup.
     * @param {ol.Layer.Group} layerGroup The group to flatten.
     * @return {Array} The (flattened) layers from the group
     */

  }, {
    key: 'getLayersByGroup',
    value: function getLayersByGroup(map, layerGroup) {
      var layerCandidates = [];

      layerGroup.getLayers().forEach(function (layer) {
        if (layer instanceof _group2.default) {
          layerCandidates.push.apply(layerCandidates, _toConsumableArray(MapUtil.getLayersByGroup(map, layer)));
        } else {
          layerCandidates.push(layer);
        }
      });

      return layerCandidates;
    }

    /**
     * Returns all layers of the provided map.
     *
     * @param {ol.Map} map The map to use for lookup.
     * @return {Array} An array of all map layers.
     */

  }, {
    key: 'getMapLayers',
    value: function getMapLayers(map) {
      return MapUtil.getLayersByGroup(map, map.getLayerGroup());
    }
  }]);

  return MapUtil;
}();

MapUtil.getLayerByOlUid = function (map, ol_uid) {
  var layers = MapUtil.getAllLayers(map);
  var layer = layers.find(function (l) {
    return ol_uid === l.ol_uid.toString();
  });
  return layer;
};

exports.default = MapUtil;