export const BACKGROUND_PRESETS = [
  { id: 'mountains', src: '/backgrounds/mountains.jpg', label: 'Mountains' },
  { id: 'forest', src: '/backgrounds/forest.jpg', label: 'Forest' },
  { id: 'ocean', src: '/backgrounds/ocean.jpg', label: 'Ocean' },
  { id: 'night', src: '/backgrounds/night.jpg', label: 'Night sky' },
  { id: 'desert', src: '/backgrounds/desert.jpg', label: 'Desert' },
]

export const DEFAULT_BACKGROUND = {
  type: 'preset',
  value: BACKGROUND_PRESETS[0].src,
}
