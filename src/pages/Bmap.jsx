import React, { Component } from 'react';
import { Input, Button } from 'antd';


export default class extends Component {
  constructor(props) {
    super(props);

    this.setMapRef = ref => {
      this.mapContainer = ref;
    };
  }

  componentDidMount() {
    this.createMapScript().then(this.initMap);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.inited) return;
  //   if (!this.mapLoaded) return;
  //   // console.log(nextProps.value, this.props.value)
  //   const { value } = nextProps;
  //   const { point: position = { lng: undefined, lat: undefined } } = value;
  //   const { point: prePosition = { lng: undefined, lat: undefined } } = this.props.value;

  //   if (position.lng && position.lat && !prePosition.lng && !prePosition.lat) {
  //     // console.log(position)
  //     const point = new global.BMap.Point(position.lng, position.lat);
  //     this.map.panTo(point);
  //     if (this.marker) {
  //       this.marker.setPosition(point);
  //     } else {
  //       this.marker = new global.BMap.Marker(point);
  //       this.map.addOverlay(this.marker);
  //     }
  //     this.inited = true;
  //   }
  // }

  shouldComponentUpdate() {
    return !this.inited;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.removeEventListener('click', this.onMapClick);
      this.map = null;
    }
  }

  onMapClick = event => {
    const { onChange } = this.props;
    const { point } = event;
    // this.setState({ mapCenter: { lng: point.lng, lat: point.lat } });

    this.map.panTo(new global.BMap.Point(point.lng, point.lat));
    if (this.marker) {
      this.marker.setPosition(point);
    } else {
      this.marker = new global.BMap.Marker(point);
      this.map.addOverlay(this.marker);
    }

    const myGeo = new global.BMap.Geocoder();
    myGeo.getLocation(point, result => {
      if (onChange) onChange(result);
    });
  };


  setCity = (city, zoom) => {
    this.map.setCenter(city);
    if (zoom) this.map.setZoom(zoom);
  };

  initMap = BMap => {
    // this.defaultCenter = getPoint(116.404, 39.915);
    // this.mapContainer = this.mapContainer || this.mapContainerRef.current;
    const { value } = this.props;
    const { point: position } = value || {};

    // console.log(this.props)

    const map = new BMap.Map(this.mapContainer, { enableMapClick: false });
    if (Object.keys(map).length === 0) return;
    var point = new BMap.Point(120.591406,31.304209);
	map.centerAndZoom(point,12);

	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			console.log('您的位置：'+r.point.lng+','+r.point.lat);
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true});
    this.map = map;
    this.mapLoaded = true;
  };

  createMapScript = () => {
    const ak = 'isGhFPcqgyttpveZvlKTGWIqd9Zfvlic';

    window.BMap = window.BMap || {};
    if (Object.keys(window.BMap).length === 0) {
      window.BMap.b_preload = new Promise(resolve => {
        const $script = document.createElement('script');
        document.body.appendChild($script);
        window.b_initBMap = () => {
          resolve(window.BMap);
          document.body.removeChild($script);
          window.BMap.b_preload = null;
          window.b_initBMap = null;
        };

        $script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=b_initBMap`;
      });
      return window.BMap.b_preload;
    }

    if (!window.BMap.b_preload) {
      return Promise.resolve(window.BMap);
    }
    return window.BMap.b_preload;
  };

  render() {
    const { width = '100%', height = '100%', style } = this.props;

    return (
    
        <div ref={this.setMapRef} style={{ width, height, ...style }} />
      
    );
  }
}
