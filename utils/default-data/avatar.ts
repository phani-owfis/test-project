export const defaultAvatarData = () => {
  // Default tones
  const default_skin_tones: any = [
    "#e19e83",
    "#d9967b",
    "#d18e73",
    "#c9866b",
    "#c17e63",
    "#b16e53",
    "#8f5943",
    "#7f4e3b",
    "#6e4433",
    "#5d3a2b",
    "#4d2f24",
  ];

  // Default full size character
  const full_character = {
    path: "/images/avatar/3d-glb/",
    name: "male.gltf",
    clear_background: true,
    is_home_page: false,
    background_color: {
      sky: "#0F1725",
      ground: "#083B41",
    },
    scaling: { x: 1, y: 1, z: -1 },
    light_position: { x: 0.5, y: -1, z: -0.6 },
    avatar_position: { x: 0, y: 0, z: 0 },
  };

  // Default Character to show on home screen
  const default_character = {
    path: "/images/avatar/3d-glb/",
    name: "male.gltf",
    is_home_page: true,
    clear_background: true,
    scaling: { x: 4, y: 4, z: -4 },
    light_position: { x: 0.8, y: -1, z: -2.5 },
    avatar_position: { x: 0, y: -5.2, z: 0 },
  };

  // Textures like clothes glasses eyes etc
  const default_textures = [
    {
      name: "clothes",
      type: "clothes",
      count: 57,
    },
    {
      name: "cap",
      type: "head",
      count: 19,
    },
    {
      name: "hair",
      type: "head",
      count: 48,
    },
    {
      name: "sunglasses",
      type: "head",
      count: 33,
    },
    {
      name: "beard",
      type: "head",
      count: 15,
    },
    {
      name: "eyes",
      type: "head",
      count: 18,
    },
    {
      name: "eyebrows",
      type: "head",
      count: 5,
    },
  ];

  return {
    default_skin_tones,
    default_character,
    default_textures,
    full_character,
  };
};
