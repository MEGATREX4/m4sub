// src/components/MinecraftModelViewer.js

import React from 'react';
import OwnMinecraftLoader from './OwnMinecraftLoader';

export default function MinecraftModelViewer(props) {
  console.log('MinecraftModelViewer props:', props); // Debug log
  
  // Don't add extra wrappers - let OwnMinecraftLoader handle the block behavior
  return <OwnMinecraftLoader {...props} />;
}