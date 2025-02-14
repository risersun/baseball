import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 修复 Leaflet 默认图标问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const StadiumMap = ({ stadium }) => {
    const mapRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // 标记组件已挂载
        setIsMounted(true);

        // 组件卸载时清理地图
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
            setIsMounted(false);
        };
    }, []);

    useEffect(() => {
        if (isMounted && mapRef.current) {
            // 确保地图尺寸正确
            mapRef.current.invalidateSize();
        }
    }, [isMounted, stadium]);

    if (!stadium || !isMounted) return null;

    const mapStyle = {
        height: '300px',
        width: '300px',
        position: 'relative',
        zIndex: 500,
    };

    const containerStyle = {
        height: '100%',
        width: '100%',
    };

    return (
        <div style={mapStyle}>
            <MapContainer
                key={`${stadium.coordinates[0]}-${stadium.coordinates[1]}-${Date.now()}`} // 确保唯一性
                center={stadium.coordinates}
                zoom={13}
                style={containerStyle}
                whenCreated={(map) => {
                    mapRef.current = map;
                    // 延迟执行 invalidateSize 以确保容器尺寸正确
                    setTimeout(() => {
                        map.invalidateSize();
                    }, 100);
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={stadium.coordinates}>
                    <Popup>{stadium.name}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default StadiumMap;